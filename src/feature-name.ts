import core from "@actions/core"
import github from "@actions/github"

const context = github.context

core.setOutput("feature_name", JSON.stringify(context))
