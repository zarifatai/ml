import numpy as np


class Model:
    def __init__(self, threshold=0.5, weights_file="weights.txt"):
        self.weights = self.__get_weights(weights_file)
        self.threshold = threshold

    def predict_proba(self, X):
        X = self.__normalize(X)
        return self.__logit_function(X, self.weights)

    def predict(self, X):
        proba = self.predict_proba(X)
        return np.where(proba >= self.threshold, 1, 0)

    def __logit_function(self, X):
        return 1 / (1 + np.exp(-X.dot(self.weights)))

    def __normalize(self, X):
        return X / (X.max(axis=0) + np.spacing(0))

    def __get_weights(self, weights_file):
        with open(weights_file) as f:
            contents = f.read()
            contents = contents.strip("[] ")
            return [float(x) for x in contents.split()]
