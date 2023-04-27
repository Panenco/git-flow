import core from "@actions/core"
import github from "@actions/github"

const ref = github.context.ref;

console.log(`Hello ${ref}!`)

const featureName = ref.replace("refs/heads/", "")
	.replace('/', '-');

core.setOutput("feature_name", featureName)
