from flask import *
import json
import requests
import TeamInfo as ti

app = Flask(__name__)

@app.route('/get_teams', methods=['GET', 'POST'])
def get_teams():
    if request.method == 'POST':
        region = request.json['region']
    else:
        return 'hello!'
    print region
    return json.dumps(region)

if __name__ == '__main__':
    app.run()
    
