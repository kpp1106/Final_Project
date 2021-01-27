import os
from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd

app = Flask(__name__)

def load_model():
    global model;
    global modelColumns;
    # Open these comments once I have my pickle files saved
    with open('models/LS_model.pkl', 'rb') as f:
        model = pickle.load(f)
        print("model loaded")
    
    with open('models/LS_model_columns.txt', 'rb') as g:
        modelColumns = pickle.load(g)
    
def process_input(data):
    print(data)
    modelData = {};

    # add empty keys for dummy-encoded property areas
    for column in modelColumns:
        modelData[column] = 0;
    
    #inputting data
    modelData['Year'] = data['Year'];
    modelData['country'+'_'+data['country']] = 1

    # convert to dataframe for easy processing
    df = pd.DataFrame([modelData])
   
    # # create mapping dictionaries
    # gender_values = {'Female' : 0, 'Male' : 1} 
    # married_values = {'No' : 0, 'Yes' : 1}
    # education_values = {'Graduate' : 0, 'Not Graduate' : 1}
    # employed_values = {'No' : 0, 'Yes' : 1}
    # credit_history = {'No' : 0, 'Yes' : 1}
    # dependent_values = {'3+': 3, '0': 0, '2': 2, '1': 1}

    # # perform mapping of values
    # df.replace({'Gender': gender_values, 'Married': married_values, 'Education': education_values, \
    #             'Self_Employed': employed_values, 'Dependents': dependent_values, 'Credit_History': credit_history}, inplace=True)

    # # map the property area to the appropriate encoded column
    # propArea = df['Property_Area']
    # df['Property_Area'+'_'+propArea] = 1

    # # drop the property_area field
    # df = df.drop('Property_Area', axis=1)

    return df

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        input_data = request.form.to_dict()
        # preprodess data
        data = process_input(input_data)
        # model prediction
        value = model.predict(data)
        return render_template('index_orig.html', result=value)

    return render_template('index_orig.html')

if __name__ == "__main__":
    load_model()
    app.run(debug=True)