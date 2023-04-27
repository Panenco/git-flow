# Git flow actions

A repo with actions regarding a git flow concept described [here](https://github.com/doichev-kostia/git-flow-poc).
All the explanations and examples are in that repo.

## Actions:

### Feature

This action creates a GCP service name based on the branch name

```yml
- name: Create a feature name
  id: feature
  uses: Panenco/git-flow/feature@master
  with:
      delimiter: "-"

- name: Print the feature name
  run: |
      echo "Feature name: ${{ steps.feature.outputs.feature_name }}"
```

### Cleanup

This action deletes GCP service name based on the branch name

```yml
- name: Cleanup
  uses: Panenco/git-flow/cleanup@v1
  with:
      workload_identity_provider: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
      service_account: ${{ secrets.SERVICE_ACCOUNT }}
      delimiter: "-"
```
