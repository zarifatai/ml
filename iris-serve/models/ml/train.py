from sklearn.externals import joblib
from sklearn import datasets
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.tree import DecisionTreeClassifier

iris = datasets.load_iris(return_X_y=True)
X = iris[0]
y = iris[1]

clf_pipeline = [("scaling", MinMaxScaler()),
                ("clf", DecisionTreeClassifier(random_state=42))]
pipeline = Pipeline(clf_pipeline)
pipeline.fit(X, y)

joblib.dump(pipeline, "./model.joblib")
