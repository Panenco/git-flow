import * as esbuild from "esbuild";
import type { BuildOptions } from "esbuild";
import { program } from "commander";

program.option("--watch", "watch mode");

program.parse(process.argv);
const cliOptions = program.opts();

const options: BuildOptions = {
	entryPoints: ["src/feature-name.ts"],
	bundle: true,
	format: "esm",
	outdir: "lib",
	outbase: "src",
	platform: "node",
	target: ["esnext"],
	sourcemap: false,
	treeShaking: true,
	minify: !cliOptions.watch,
	banner: {
		js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
	},
};

if (cliOptions.watch) {
	const ctx = await esbuild.context(options);
	await ctx.watch();
} else {
	await esbuild.build(options);
}
