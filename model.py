import sys
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, f1_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier

def columns_with_many_missing_values(df, threshold=0.9):
    missing_proportions = df.isnull().mean()
    columns_to_remove = missing_proportions[missing_proportions > threshold].index.tolist()
    return columns_to_remove

def label_encode(train_data, test_data):
    categorical_columns = train_data.select_dtypes(include=['object', 'category']).columns

    imputer = SimpleImputer(strategy='most_frequent')
    train_data[categorical_columns] = imputer.fit_transform(train_data[categorical_columns])
    test_data[categorical_columns] = imputer.transform(test_data[categorical_columns])

    lable_encoders = {}
    for col in categorical_columns:
        label_encoder = LabelEncoder()

        
        train_data[col] = label_encoder.fit_transform(train_data[col])
        test_data[col] = label_encoder.transform(test_data[col])
        lable_encoders[col] = label_encoder
        
    


    

    return train_data, test_data,lable_encoders

def remove_highly_correlated_features(df_train,df_test, threshold=0.8):
    corr_matrix = df_train.corr().abs()
    upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
    to_drop = [column for column in upper.columns if any(upper[column] > threshold)]
    df_train.drop(columns=to_drop, inplace=True)
    df_test.drop(columns=to_drop, inplace=True)
    return df_train,df_test,to_drop

def model_select(model):
    if model == 'RandomForest':
        return RandomForestClassifier(n_estimators=100, random_state=42)
    elif model == 'LogisticRegression':
        return LogisticRegression(max_iter=1000, solver='lbfgs')
    elif model == 'KNN':
        return KNeighborsClassifier(n_neighbors=1)
    elif model == 'NaiveBayes':
        return GaussianNB()
    elif model == 'GradientBoosting':
        return GradientBoostingClassifier(n_estimators=100, learning_rate=0.1)
    elif model == 'DecisionTree':
        return DecisionTreeClassifier()
def plot_correlation_matrix(df, title):
    plt.figure(figsize=(12, 8))
    correlation_matrix = df.corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt='.2f')
    plt.title(title)
    plt.show()

def train(model="KNN", column_threshold=0.9, correlation_threshold=0.8):
    data_file_path = "data.csv"

    data = pd.read_csv(data_file_path, sep=';')


    columns_to_remove = columns_with_many_missing_values(data, threshold=column_threshold)
    data = data.drop(columns=columns_to_remove)


    X = data.drop(columns=['class'])
    y = data['class']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, stratify=y)



    X_train_final, X_test_final,label_encoder = label_encode(X_train.copy(), X_test.copy())
    X_train_final, X_test_final,corelated_features = remove_highly_correlated_features(X_train_final, X_test_final, threshold=correlation_threshold)

    scaler = StandardScaler()
    X_train_final = scaler.fit_transform(X_train_final)
    X_test_final = scaler.transform(X_test_final)

    classifier = model_select(model)

    classifier.fit(X_train_final, y_train)
    y_pred = classifier.predict(X_test_final)

    

    f1_macro = f1_score(y_test, y_pred, average='macro')

    class_names = data['class'].unique()
    report = classification_report(y_test, y_pred, target_names=class_names)
    print(classification_report(y_test, y_pred, target_names=class_names))

    return f1_macro,classifier,corelated_features,columns_to_remove,scaler,report,label_encoder

if __name__ == "__main__":
    train()
    train(model="LogisticRegression")
    train(model="RandomForest")
    train(model="NaiveBayes")
    train(model="GradientBoosting")
    train(model="DecisionTree")
