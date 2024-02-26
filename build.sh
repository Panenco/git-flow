#!/usr/bin/env sh
require_fix="import { createRequire } from 'node:module';const require = createRequire(import.meta.url)"

pnpm exec esbuild ./lib/feature-name.mjs --bundle --outfile=./build/feature-name.mjs --platform=node --target=node20 --format=esm --tree-shaking=true --banner:js="$require_fix";
