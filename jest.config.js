module.exports = {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "globals": {
        "ts-jest": {
            "diagnostics": false
        }
    },
    "collectCoverageFrom": [
        "**/src/**/*.ts",
        "!**/e2e/**",
    ],
    "testPathIgnorePatterns": [
        "helpers",
        ".*\\.e2e\\.ts$",
        "out",
        "node_modules"
    ],
    "verbose": true
};


