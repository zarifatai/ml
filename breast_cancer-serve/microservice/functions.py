import json
from microservice import model
import numpy as np


def predict(X, model):
    prediction = model.predict(X)[0]
    return prediction


def get_model_response(input_dict):
    X = np.array(input_dict["input"]).reshape(1, -1)
    prediction = predict(X, model)
    if prediction == 1:
        label = "M"
    else:
        label = "B"
    return {
        "status": 200,
        "label": label,
        "prediction": int(prediction)
    }
