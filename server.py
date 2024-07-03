from flask import Flask, request, jsonify
from model import train
import pandas as pd
from flask_cors import CORS, cross_origin





app = Flask(__name__)

clasificator = None
corelated_features = None
columns_to_remove = None
scaler = None
label_encoder = None

CORS(app)  

@app.route('/process-data', methods=['POST'])
def process_data():

    global clasificator, corelated_features, columns_to_remove, scaler,label_encoder
    json_data = request.json  
    print(json_data)
    df = pd.DataFrame([json_data])  
    print(df)



    df = df.drop(columns=columns_to_remove)
    df = df.drop(columns=corelated_features)
    
    categorical_columns = df.select_dtypes(include=['object', 'category']).columns
    categorical_columns = categorical_columns.drop(["cap-diameter","stem-height","stem-width"])
    
    
    for col in categorical_columns:
            encoder = label_encoder[col]
            df[col] = encoder.transform(df[col])
    df = scaler.transform(df)




    result = []

    if clasificator:
        result = clasificator.predict(df)


    print(result[0])
    result_response = {"result": result[0]}
    return jsonify((result_response)), 200

@app.route('/')
def create_user():
    global clasificator, corelated_features, columns_to_remove, scaler,label_encoder
    model = request.args.get('model', type=str, default='KNN')

    f1_macro,classifier,corelated_features,columns_to_remove,scaler,report,label_encoder = train( model=model)

    clasificator = classifier
    corelated_features = corelated_features
    columns_to_remove = columns_to_remove
    scaler = scaler
    label_encoder = label_encoder

    print(1)
    return jsonify(1), 201

if __name__ == '__main__':
    app.run(port=5001, debug=True)