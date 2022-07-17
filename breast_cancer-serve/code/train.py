from tkinter import W
from sklearn.ensemble import VotingClassifier
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import MinMaxScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
import pandas as pd
import joblib
import gzip


"""
Data retrieved from: https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/ and renamed to breast_cancer.csv

Filename: breast-cancer-wisconsin.data
"""


# load and preprocess data
data = pd.read_csv("data/breast_cancer.csv", header=None)
data = data.iloc[:, 1:]

add_nans = pd.Series([None if x == "?" else x for x in data.iloc[:, 5]])  # replace '?' with NaNs
data.drop(data.columns[5], axis=1, inplace=True)
data = pd.concat([add_nans, data], axis=1)

# split into train and test set
y = [0 if x == 2 else 1 for x in data.iloc[:, -1]]
X = data.iloc[:, :-1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# create ensemble of 3 models
estimators = []
estimators.append(("logistic", LogisticRegression()))
estimators.append(("cart", DecisionTreeClassifier()))
estimators.append(("svm", SVC()))

# create the ensemble model
ensemble = VotingClassifier(estimators)

# make preprocess pipeline
pipe = Pipeline([
    ("imputer", SimpleImputer()),
    ("scaler", MinMaxScaler(feature_range=(0, 1))),
    ("model", ensemble),
])

# train the model
pipe.fit(X_train, y_train)

# test accuracy
print("Accuracy:", pipe.score(X_test, y_test))

# export model
joblib.dump(pipe, gzip.open("model/model_binary.dat.gz", "wb"))
