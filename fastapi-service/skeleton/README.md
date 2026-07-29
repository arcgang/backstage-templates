# ${{ values.name }}

${{ values.description }}

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload --port ${{ values.port }}
```

## Rancher Desktop

```sh
docker build -t ${{ values.name }}:dev .
kubectl --context rancher-desktop apply -f k8s/
curl http://${{ values.hostname }}
```
