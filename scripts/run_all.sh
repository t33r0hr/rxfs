#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
CLI_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

for npm_cmd in "${@}"; do
  npm run "${npm_cmd}" || true
done