import sys
import json
import TwitterApi as ta

def get_tweets_from_team():
    team_name = sys.argv[1]
    team_members_twitter = get_teams_members_twitter(team_name)
    for player_twitter in team_members_twitter:
        print "PLAYER TWITTER NAME: " + player_twitter
        ta.get_player_emotion(player_twitter)
def get_teams_members_twitter(team_name):
    players_twitter = []
    with open('teams.json') as team_info:
        data = json.load(team_info)
    for team in data['games']['eu']['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
         players_twitter.append(team_members[position]['twitter'])
    return players_twitter


def get_team_stats(region,team_name):
    players_stats = []
    with open('teams.json') as team_info:
        data = json.load(team_info)
    for team in data['games'][region]['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
            break
    for position in team_members:
        players_stats.append(team_members[position]['nick'])
    if(region.lower()=='lol_na')
        return  {region:'na',nicks:players_stats} 
    else
        return  {region:'euw',nicks:players_stats} 

    



if __name__ == '__main__':
    #get_tweets_from_team()
    get_team_stats()


