from fastapi import FastAPI

app = FastAPI(title="${{ values.name }}", description="${{ values.description }}")


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "${{ values.name }}", "description": "${{ values.description }}"}
