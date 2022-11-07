from fastapi import FastAPI
from model import Model, Sample


app = FastAPI()
model = Model()


@app.post("/predict")
def predict(sample: Sample):
    return {"prediction": model.predict(sample)}


@app.post("/predict_proba")
def predict_proba(sample: Sample):
    return {"probability prediction": model.predict_proba(sample)}


@app.get("/features")
def get_features():
    features = Sample.__fields__.keys()
    return [x.replace("_", " ").capitalize() for x in features]
