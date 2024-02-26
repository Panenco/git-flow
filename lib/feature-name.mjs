import core from "@actions/core";
import github from "@actions/github";

const { ref, eventName, payload } = github.context;

core.debug(`[DEBUG] Event name: ${eventName}`);
core.debug(`[DEBUG] Ref: ${ref}`);
core.debug(`[DEBUG] Payload ref: ${payload?.ref}`);

const delimiter = core.getInput("delimiter") || "-";

core.debug(`[DEBUG] Delimiter: ${delimiter}`);

/**
 * @param {Function} fns
 * @return {function(*): any}
 */
const pipe = (...fns) => (param) => fns.reduce((value, func) => func(value), param);

/**
 *
 * @param {string} name
 * @return {boolean}
 */
const isValidName = (name) => {
	/**
	 * ASCII letters, numbers and hyphens
	 */
	return /^[a-zA-Z0-9\-]+$/g.test(name);
};
const getBranchName = () => {
	if (eventName === "delete") {
		core.debug(`[DEBUG] Delete event detected, using payload.ref: ${payload.ref}`);
		return payload.ref;
	} else {
		core.debug(`[DEBUG] Using ref: ${ref}`);
		return ref;
	}
};

/**
 *
 * @param {string} ref - branch ref
 * @return {string}
 */
const normalizeName = (ref) => {
	return ref.replace("refs/heads/", "");
};

/**
 *
 * @param {string} branchName
 * @return {string}
 */
const transformName = (branchName) => {
	return branchName.replace("/", delimiter);
};

/**
 * @type {string}
 */
const featureName = pipe(normalizeName, transformName)(getBranchName());

core.debug(`[DEBUG] Feature name: ${featureName}`);

const valid = isValidName(featureName);

if (!valid) {
	/** @type {never} */
	core.setFailed(
		`Invalid feature name: ${featureName}. You've chosen "${delimiter}" as a delimiter, try something else, like "-"`,
	);
}

core.setOutput("feature_name", featureName);
