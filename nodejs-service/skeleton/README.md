# ${{ values.name }}

${{ values.description }}

Owner: `${{ values.owner }}`

## Local

```sh
npm install
npm run dev
curl http://localhost:${{ values.port }}/healthz
```

## Rancher Desktop (k3s)

Rancher Desktop's moby engine shares its image store with k3s, so a local
`docker build` is immediately usable by the cluster — no registry push needed
(`imagePullPolicy: IfNotPresent` in the manifests relies on this).

```sh
docker build -t ${{ values.name }}:dev .
kubectl --context rancher-desktop apply -f k8s/
kubectl --context rancher-desktop rollout status deploy/${{ values.name }}
curl http://${{ values.hostname }}
```

`*.localhost` hostnames resolve to 127.0.0.1 on macOS, and Traefik listens on
port 80, so no `/etc/hosts` entry is required.
