#!/usr/bin/env bash
# exit on error
set -o errexit

yarn install --ignore-platform
yarn build