# Software templates

Backstage software templates (scaffolder) for services that deploy to a local
Rancher Desktop k3s cluster.

| Template | Description |
| --- | --- |
| [`nodejs-service`](nodejs-service/template.yaml) | Express service + Dockerfile + k8s manifests + TechDocs + GitHub Actions. Publishes to GitHub. |
| [`fastapi-service`](fastapi-service/template.yaml) | FastAPI service + Dockerfile + k8s manifests. Publishes to GitHub. |
| [`documentation`](documentation/template.yaml) | Standalone TechDocs site, pre-filled with the Backstage community documentation templates (runbook, system architecture, command reference). |

The Backstage community also publishes a set of templates at
[backstage/software-templates](https://github.com/backstage/software-templates).
Those are registered separately from a fork; see `app-config.yaml`.

## Layout

Each template is a directory with two parts:

```
<template-name>/
├── template.yaml   # the entity: parameters (the form) and steps (the actions)
└── skeleton/       # files copied into the new repo, rendered with nunjucks
```

In `skeleton/` files, `${{ values.foo }}` is substituted at scaffold time.
Shell forms like `${GITHUB_SHA::7}` and JS template literals like `${port}`
pass through untouched, so they can be used freely.

## Registering with Backstage

Templates are loaded as catalog locations. See `app-config.yaml` in the
Backstage app:

```yaml
catalog:
  locations:
    - type: url
      target: https://github.com/<owner>/backstage-templates/blob/main/nodejs-service/template.yaml
      rules:
        - allow: [Template]
```

`type: url` (rather than `type: file`) is what gives each template a working
**View Source** link in the Backstage UI.

## Adding a template

1. Create `<name>/template.yaml` and a `<name>/skeleton/` directory.
2. Add a location entry pointing at the new `template.yaml`.
3. Dry-run it before committing (see below).
4. Restart Backstage, or hit **Refresh** on the entity in the UI.

## Dry runs

Renders a template through the real scaffolder without publishing or
registering anything. Values must satisfy the template's parameter JSON schema.

```sh
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"

# list the files a template would produce
node ../dry-run.mjs templates/nodejs-service \
  '{"name":"demo-svc","owner":"user:guest","repoUrl":"github.com?owner=me&repo=demo-svc"}'

# print one rendered file
SHOW=k8s/deployment.yaml node ../dry-run.mjs templates/fastapi-service \
  '{"name":"demo-api","owner":"user:guest"}'
```

## Deploying a scaffolded service

Rancher Desktop's moby engine shares its image store with k3s, so a local
`docker build` is directly usable by the cluster — no registry push needed,
which is why the manifests set `imagePullPolicy: IfNotPresent`.

```sh
docker build -t demo-svc:dev .
kubectl --context rancher-desktop apply -f k8s/
curl http://demo-svc.localhost
```

Traefik ships with k3s and listens on port 80, and `*.localhost` resolves to
127.0.0.1 on macOS, so no `/etc/hosts` entry is required.
