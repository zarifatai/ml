import uvicorn
from fastapi import FastAPI
from model import Model


app = FastAPI()
model = Model()


@app.get("/")
def root():
    return {"message": "Hello, World!"}


@app.post("/predict")
def predict(X):
    return model.predict(X)


@app.post("predict_proba")
def predict_proba(X):
    return model.predict_proba(X)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
