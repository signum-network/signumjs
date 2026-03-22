#!/bin/bash

# Usage: ./publish.sh <patch|minor|major>
# Or:    npm run new-version -- patch
#
# This script prepares a release locally (version bump, changelogs, build, test)
# and pushes a tag. GitHub Actions handles the actual npm publish.

set -e

BUMP=$1

if [ -z "$BUMP" ]; then
    echo "Usage: $0 <patch|minor|major>"
    exit 1
fi

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
    echo "Error: argument must be 'patch', 'minor', or 'major'"
    exit 1
fi

# Ensure we're on main and clean
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    read -r -p "Warning: you're on '$BRANCH', not 'main'. Continue? [y/N] " CONT
    if [[ "$CONT" != "y" && "$CONT" != "Y" ]]; then exit 0; fi
fi

if [ -n "$(git status --porcelain)" ]; then
    echo "Error: working directory is not clean. Commit or stash changes first."
    exit 1
fi

# Read current version from root package
CURRENT=$(node -p "require('./packages/core/package.json').version")
echo "Current version: $CURRENT"

# Calculate next version
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT"
case $BUMP in
    patch) PATCH=$((PATCH + 1)) ;;
    minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
    major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
esac
NEXT="$MAJOR.$MINOR.$PATCH"

# Find last tag for changelog generation
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

echo "Next version: $NEXT (from tag: ${LAST_TAG:-<none>})"
echo ""


# --- Build and test first
echo "Building and testing..."
npm run test
npm run compile


# --- Generate changelogs ---

BUMP_LABEL="Patch Changes"
if [ "$BUMP" = "minor" ]; then BUMP_LABEL="Minor Changes"; fi
if [ "$BUMP" = "major" ]; then BUMP_LABEL="Major Changes"; fi

for PKG_DIR in packages/*/; do
    PKG_NAME=$(node -p "require('./${PKG_DIR}package.json').name")

    # Get commits touching this package since last tag
    if [ -n "$LAST_TAG" ]; then
        COMMITS=$(git log "$LAST_TAG"..HEAD --pretty=format:"- %s" -- "$PKG_DIR" 2>/dev/null | grep -v "^- chore: version bump" | grep -v "^- chore: Updated root changelog" || true)
    else
        COMMITS=""
    fi

    # Get dependency list for this package
    DEPS=$(node -e "
const pkg = require('./${PKG_DIR}package.json');
const all = {...(pkg.dependencies||{}), ...(pkg.peerDependencies||{})};
Object.keys(all)
    .filter(n => n.startsWith('@signumjs/'))
    .forEach(n => console.log('  - ' + n + '@$NEXT'));
" 2>/dev/null || true)

    # Build the new changelog entry
    ENTRY="## $NEXT\n\n### $BUMP_LABEL\n"

    if [ -n "$COMMITS" ]; then
        ENTRY="$ENTRY\n$COMMITS"
    else
        ENTRY="$ENTRY\n- Updated dependencies"
    fi

    if [ -n "$DEPS" ]; then
        ENTRY="$ENTRY\n- Updated dependencies\n$DEPS"
    fi

    # Prepend to existing CHANGELOG.md
    CHANGELOG="${PKG_DIR}CHANGELOG.md"
    if [ -f "$CHANGELOG" ]; then
        node -e "
const fs = require('fs');
const existing = fs.readFileSync('$CHANGELOG', 'utf8');
const entry = \`$ENTRY\`;
const header = '# Change Log';
if (existing.startsWith(header)) {
    const rest = existing.slice(header.length);
    fs.writeFileSync('$CHANGELOG', header + '\n\n' + entry.trim() + '\n\n' + rest.trimStart());
} else {
    fs.writeFileSync('$CHANGELOG', header + '\n\n' + entry.trim() + '\n\n' + existing);
}
"
    else
        printf "# Change Log\n\n%b\n" "$ENTRY" > "$CHANGELOG"
    fi

    echo "  Updated $CHANGELOG"
done

# Copy core changelog to root
cp "./packages/core/CHANGELOG.md" "./CHANGELOG.md"
echo ""

# Show changelog preview
echo "=== Changelog preview ==="
echo ""
for PKG_DIR in packages/*/; do
    PKG_NAME=$(node -p "require('./${PKG_DIR}package.json').name")
    CHANGELOG="${PKG_DIR}CHANGELOG.md"
    echo "--- $PKG_NAME ---"
    sed -n "/^## $NEXT$/,/^## [0-9]/{ /^## [0-9]/!p; /^## $NEXT$/p; }" "$CHANGELOG"
    echo ""
done

echo "========================="
echo ""
read -r -p "Review above. Publish v$NEXT? [y/e/N] (e=edit changelogs first) " CONFIRM
if [[ "$CONFIRM" == "e" || "$CONFIRM" == "E" ]]; then
    echo "Edit the CHANGELOG.md files in packages/*/, then re-run this script."
    exit 0
fi
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    echo "Aborted. Changelogs were updated but nothing was committed."
    echo "Run 'git checkout -- packages/*/CHANGELOG.md CHANGELOG.md' to revert."
    exit 0
fi

# Bump version in all packages
echo "Bumping versions to $NEXT..."
for PKG in packages/*/package.json; do
    node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$PKG', 'utf8'));
pkg.version = '$NEXT';

// Update @signumjs/* peer/dependency versions
for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
    if (!pkg[depType]) continue;
    for (const [name, ver] of Object.entries(pkg[depType])) {
        if (name.startsWith('@signumjs/') && ver !== '*') {
            pkg[depType][name] = '^$NEXT';
        }
    }
}

fs.writeFileSync('$PKG', JSON.stringify(pkg, null, 2) + '\n');
"
done
echo "All packages bumped to $NEXT"



# Generate docs
echo "Generating docs..."
npm run doc

# Commit, tag, and push — GitHub Actions handles npm publish
git add packages/*/package.json packages/*/CHANGELOG.md CHANGELOG.md docs/
git commit -m "chore: version bump v$NEXT"
git tag "v$NEXT"

echo "Pushing to origin..."
git push && git push origin "v$NEXT"

echo ""
echo "v$NEXT tagged and pushed. GitHub Actions will publish to npm."
echo "Monitor the publish workflow at: https://github.com/signum-network/signumjs/actions"
