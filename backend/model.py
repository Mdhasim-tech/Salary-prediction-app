import numpy as np
from xgboost import XGBRegressor
import pandas as pd
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.calibration import LabelEncoder
from sklearn.model_selection import train_test_split
import json

import joblib


df=pd.read_csv("Prediction.csv")
# print(df.head())
# print(df.columns)
# print(df.size)
# print(df.describe())

# print(df.isnull().sum())


numerical_cols=['Age','Years of Experience','Salary']
for cols in numerical_cols:
    df[cols]=df[cols].fillna(df[cols].mean())

categorical_cols=["Gender","Education Level","Job Title"]
for cols in categorical_cols:
    df[cols]=df[cols].fillna(df[cols].mode()[0])



# 1. Encode 'Gender' (nominal)
df = pd.get_dummies(df, columns=['Gender'])

# 2. Encode 'Education Level' (ordinal)
education_order = ["Bachelor's", "Master's", "PhD"]
le_education = LabelEncoder()
le_education.fit(education_order)
df['Education Level'] = le_education.transform(df['Education Level'])

# 3. Encode 'Job Title' (nominal)
df = pd.get_dummies(df, columns=['Job Title'])


X=df.drop("Salary",axis=1)
y=df["Salary"]
with open("feature_columns.json", "w") as f:
    json.dump(X.columns.tolist(), f)

X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)
xgb_model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=4, random_state=42)
xgb_model.fit(X_train, y_train)


y_pred_xgb = xgb_model.predict(X_test)

r2_xgb = r2_score(y_test, y_pred_xgb)
mse_xgb = mean_squared_error(y_test, y_pred_xgb)
rmse_xgb = np.sqrt(mse_xgb)

print("XGBoost R² Score:", r2_xgb)
print("XGBoost MSE:", mse_xgb)
print("XGBoost RMSE:", rmse_xgb)

# Save the trained XGBoost model
joblib.dump(xgb_model, 'salary_predictor_xgb.pkl')
