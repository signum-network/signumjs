#!/bin/bash

VERSION=$1

# Exit on any error
set -e

# Validate required arguments
if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 v1.2.3"
    exit 1
fi

# Validate version format
if [[ ! $VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
    echo "Error: Version must be in format v1.2.3"
    exit 1
fi

# Run build steps
echo "⚙️ Building and testing..."
if ! npx turbo run compile test bundle; then
    echo "Build failed"
    exit 1
fi

# Create git tag
echo "🏷️ Creating git tag: $VERSION"
git tag "$VERSION"

# Prompt for OTP
echo -n "Enter npm OTP: "
read -r OTP

# Publish with changeset
echo "🌎Publishing with changeset..."
npx changeset publish --no-git-tag --otp="$OTP"

git push origin "$VERSION"
echo "🎉 Successfully published $VERSION"
