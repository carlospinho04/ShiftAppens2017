import sys
import json
import TwitterApi as ta
import tests as t

# reads info from a json file
def get_data_from_file():
    with open('teams.json') as team_info:
        data = json.load(team_info)

    return data

# returns teams from region
def get_teams_from_region(region):
    teams_and_logos = {}
    data = get_data_from_file() 
    for teams in data['games'][region]['teams']:
        teams_and_logos[teams['name']] = teams['logo'] 

    return teams_and_logos

# returns name and logo of players from a team
def get_players_from_team(team_name, region):
    players = {}
    data = get_data_from_file()
    for team in data['games'][region]['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
        players[team_members[position]['nick']] = team_members[position]['avatar']

    return players

# returns logo, name, kda, winrate from players of a team
def get_info_from_team(team_name, region):
    nicks_team = get_team_nicks(team_name, region)
    data = {}
    players = get_players_from_team(team_name, region)
    for player in nicks_team:
        data[player] = t.game_tests(player, region)
        data[player].update({'logo': players[player]})
    return data
        
# returns emotions from players of a team
def get_tweets_from_team(team_name, region):
    team_members_twitter = get_teams_members_twitter(team_name, region)
    emotions_from_team = {}
    for player in team_members_twitter:
        emotions_from_team.update(ta.get_player_emotion(player, team_members_twitter[player]))

    return emotions_from_team

# returns name and twitter from players of a team
def get_teams_members_twitter(team_name, region):
    players_twitter = {}
    data = get_data_from_file()
    for team in data['games'][region]['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
        players_twitter[team_members[position]['nick']] = team_members[position]['twitter']

    return players_twitter

# returns members of a team
def get_team_nicks(team_name, region):
    players_nick = []
    data = get_data_from_file()
    for team in data['games'][region]['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
        players_nick.append(team_members[position]['nick'])

    return  players_nick 

if __name__ == '__main__':
    get_tweets_from_team('Fnatic', 'euw')
