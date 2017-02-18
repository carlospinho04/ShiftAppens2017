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
    for team in data['games']['lol_eu']['teams']:
        if team['name'].lower() == team_name.lower():
            team_members = team['members']
    for position in team_members:
         players_twitter.append(team_members[position]['twitter'])
    return players_twitter

if __name__ == '__main__':
    get_tweets_from_team()

