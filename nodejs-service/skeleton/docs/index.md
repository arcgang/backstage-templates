# ${{ values.name }}

${{ values.description }}

## Endpoints

| Path       | Purpose                    |
| ---------- | -------------------------- |
| `/`        | Service identity payload   |
| `/healthz` | Readiness / liveness probe |

## Deployment

Runs on Rancher Desktop's k3s cluster behind Traefik at
`http://${{ values.hostname }}`. Manifests live in `k8s/`.
