import numpy as np
from pydantic import BaseModel


class Sample(BaseModel):
    mean_radius: float
    mean_texture: float
    mean_smoothness: float
    mean_compactness: float
    mean_symmetry: float
    mean_fractal_dimension: float
    radius_error: float
    texture_error: float
    smoothness_error: float
    compactness_error: float
    concave_points_error: float
    symmetry_error: float
    worst_symmetry: float
    worst_fractal_dimension: float


class Model:
    def __init__(self, threshold: float = 0.5, weights_file: str = "./weights.txt"):
        self.weights = self.__get_weights(weights_file)
        self.threshold = threshold

    def predict_proba(self, sample: Sample):
        X = np.array([1] + list(sample.dict().values()))
        X = self.__normalize(X)
        return self.__logit_function(X)

    def predict(self, sample: Sample):
        proba = self.predict_proba(sample)
        return 1 if proba >= self.threshold else 0

    def __logit_function(self, X: list[float]):
        return 1 / (1 + np.exp(-X.dot(self.weights)))

    def __normalize(self, X: np.ndarray):
        return X / (X.max(axis=0) + np.spacing(0))

    def __get_weights(self, weights_file: str):
        with open(weights_file) as f:
            contents = f.read()
            contents = contents.strip("[] ")
            return [float(x) for x in contents.split()]
