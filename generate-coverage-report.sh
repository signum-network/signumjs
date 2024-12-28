#!/bin/bash

rm -rf .nyc_output
mkdir -p .nyc_output
find packages/*/coverage -name '*.json' -exec cp {} .nyc_output/ \;
nyc merge .nyc_output coverage.json
nyc report --reporter=lcov
