import core from "@actions/core";
import github from "@actions/github";

const { ref, eventName, payload } = github.context;

const delimiter = core.getInput("delimiter") || "-";

const pipe = (...fns: Function[]) => (x: any) => fns.reduce((v, f) => f(v), x);


const isValidName = (name: string) => {
	/**
	 * ASCII letters, numbers and hyphens
	 */
	return /^[a-zA-Z0-9\-]+$/g.test(name);
};
const getBranchName = () => {
	if (eventName === "delete") {
		return payload.ref;
	}

	return ref;
};

const normalizeName = (ref: string) => {
	return ref.replace("refs/heads", "");
};

const transformName = (branchName: string) => {
	return branchName.replace("/", delimiter);
};

const featureName = pipe(normalizeName, transformName)(getBranchName());

const valid = isValidName(featureName);

if (!valid) {
	core.setFailed(
		`Invalid feature name: ${featureName}. You've chosen "${delimiter}" as a delimiter, try something else, like "-"`,
	) as never;
}

core.setOutput("feature_name", featureName);
