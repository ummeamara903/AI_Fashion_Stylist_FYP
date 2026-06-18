import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler, MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import NearestNeighbors
from mapping import product_colors, product_shoes, allowed_accessories
import joblib
import os

# Load dataset
dataset = pd.read_csv(r"D:\FashionStylist\Fashionscience\dataset\fashion_dataset.csv")
# Drop unnecessary column
dataset = dataset.drop(columns=['fabric'], errors='ignore')
print(dataset["occasion"].unique())
categorical_cols = ['gender','season','occasion','dress_type']

#  Convert multi-item columns (IMPORTANT FIX: include all targets)
dataset['product'] = dataset['product'].apply(lambda x: [i.strip() for i in str(x).split('+')])
dataset['accessory'] = dataset['accessory'].apply(lambda x: [i.strip() for i in str(x).split('+')])
dataset['shoes'] = dataset['shoes'].apply(lambda x: [i.strip() for i in str(x).split('+')])
dataset['color'] = dataset['color'].apply(lambda x: [i.strip() for i in str(x).split('+')])

#  Encode categorical features
encoder = OneHotEncoder(handle_unknown='ignore')
X_cat = encoder.fit_transform(dataset[categorical_cols]).toarray()

#  Scale budget
scaler = MinMaxScaler()
budget_scaled = scaler.fit_transform(dataset[['budget']])

# Combine features
X_features = np.hstack((X_cat, budget_scaled))

# Multi-label encoding for ALL targets
mlb_product = MultiLabelBinarizer()
Y_product = mlb_product.fit_transform(dataset['product'])

mlb_accessory = MultiLabelBinarizer()
Y_accessory = mlb_accessory.fit_transform(dataset['accessory'])

mlb_shoes = MultiLabelBinarizer()
Y_shoes = mlb_shoes.fit_transform(dataset['shoes'])

mlb_color = MultiLabelBinarizer()
Y_color = mlb_color.fit_transform(dataset['color'])

# Train models
rf_product = RandomForestClassifier(n_estimators=200, random_state=42)
rf_product.fit(X_features, Y_product)

rf_accessory = RandomForestClassifier(n_estimators=200, random_state=42)
rf_accessory.fit(X_features, Y_accessory)

rf_shoes = RandomForestClassifier(n_estimators=200, random_state=42)
rf_shoes.fit(X_features, Y_shoes)

rf_color = RandomForestClassifier(n_estimators=200, random_state=42)
rf_color.fit(X_features, Y_color)

# Similarity fallback (KNN)
knn = NearestNeighbors(n_neighbors=1, metric='cosine')
knn.fit(X_features)

# Create model save folder
model_dir = "models"
os.makedirs(model_dir, exist_ok=True)

# Save everything (VERY IMPORTANT FOR API)
joblib.dump(rf_product, os.path.join(model_dir, "product_model.pkl"))
joblib.dump(rf_accessory, os.path.join(model_dir, "accessory_model.pkl"))
joblib.dump(rf_shoes, os.path.join(model_dir, "shoes_model.pkl"))
joblib.dump(rf_color, os.path.join(model_dir, "color_model.pkl"))

joblib.dump(encoder, os.path.join(model_dir, "encoder.pkl"))
joblib.dump(scaler, os.path.join(model_dir, "scaler.pkl"))

joblib.dump(mlb_product, os.path.join(model_dir, "mlb_product.pkl"))
joblib.dump(mlb_accessory, os.path.join(model_dir, "mlb_accessory.pkl"))
joblib.dump(mlb_shoes, os.path.join(model_dir, "mlb_shoes.pkl"))
joblib.dump(mlb_color, os.path.join(model_dir, "mlb_color.pkl"))

joblib.dump(knn, os.path.join(model_dir, "knn_model.pkl"))

print("All models and encoders saved successfully!")
