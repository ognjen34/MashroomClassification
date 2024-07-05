# Mushroom Classification

## Project Topic

**Classification of Mushrooms Based on Their Characteristics**

## Problem Description

The aim of this project is to classify mushrooms based on their physical characteristics and habitats to identify edible and poisonous species.

## Data

We will use a pre-existing dataset that contains information about various mushroom species. The dataset is available at the following link: [Secondary Mushroom - UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/Mushroom)

## Methodology

### Exploratory Data Analysis

* Review and visualize the data to understand the distribution and interdependence of variables using correlation matrices.
* Check for missing data and appropriately handle it.

### Modeling

* Train various classification models (e.g., logistic regression, decision tree, random forest, gradient boosting).

### Evaluation

* **Metric:** F1 Score , Precision and Recall

## Technologies Used

* **Backend:** Flask
* **Frontend:** React

## Frontend Details

The frontend of this application is developed using React. It includes a form for entering all the details about mushrooms and allows users to select the classification model to be used.



## Instructions to Run the Project

1. **Navigate to the project folder:**

```
cd /path/to/project
```

2. **Install the necessary Python packages:**

```
pip install flask flask-cors numpy pandas scikit-learn seaborn
```

3. **Run the Flask server:**

```
python server.py
```

5. **Navigate to the frontend folder:**

```
cd frontend
```

6. **Install the necessary npm packages:**

```
npm install
```

7. **Start the React application:**

```
npm start
```
