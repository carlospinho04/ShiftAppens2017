import sys
import json
import TwitterApi as ta
import tests as t

def get_teams_from_region(region):
    teams_and_logos = {}
    data = get_data_from_file() 
    for teams in data['games'][region]['teams']:
        teams_and_logos[teams['name']] = teams['logo'] 
    return json.dumps(teams_and_logos)
def get_tweets_from_team():
    team_members_twitter = get_teams_members_twitter(team_name, region)
    for player_twitter in team_members_twitter:
        print "PLAYER TWITTER NAME: " + player_twitter
        ta.get_player_emotion(player_twitter)

def get_kda_from_team():
    nicks_team = get_team_nicks(team_name, region)
    for player in nicks_team:
        t.game_tests(player, region)
        
def get_teams_members_twitter(team_name, region):
    players_twitter = []
    data = get_data_from_file()
    for team in data['games'][region]['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
         players_twitter.append(team_members[position]['twitter'])

    return players_twitter


def get_data_from_file():
    with open('teams.json') as team_info:
        data = json.load(team_info)
    return data

def get_team_nicks(team_name, region):
    players_stats = []
    data = get_data_from_file()
    for team in data['games'][region]['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
        players_stats.append(team_members[position]['nick'])

    return  players_stats 

if __name__ == '__main__':
    get_teams_from_region('euw')
