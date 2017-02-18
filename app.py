from flask import *
import json
import requests
import TeamInfo as ti

app = Flask(__name__)

@app.route('/get_teams', methods=['GET', 'POST'])
def get_teams():
    if request.method == 'POST':
        region = request.json['region']
    teams_and_logos = ti.get_teams_from_region(region)
    return json.dumps(teams_and_logos)

@app.route('/get_players_from_team', methods=['GET', 'POST'])
def get_players_from_team():
    if request.method == 'POST':
        team_name = request.json['team_name']
        region = request.json['region']
    players_and_logos = ti.get_players_from_team(team_name, region)
    return json.dumps(players_and_logos)
    



if __name__ == '__main__':
    app.run()
    
