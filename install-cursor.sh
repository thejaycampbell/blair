#!/usr/bin/env bash
set -e

if ! command -v node &>/dev/null; then
  echo "Error: Node.js is required (https://nodejs.org)"
  exit 1
fi

TARGET="${1:-$(pwd)}"
npx --yes blair-cmo --ide cursor "$TARGET"
