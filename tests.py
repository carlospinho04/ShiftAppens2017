# these tests are pretty bad, mostly to make sure no exceptions are thrown

import time
import json
import sys
from riotwatcher import RiotWatcher, NORTH_AMERICA, EUROPE_WEST
from riotwatcher import LoLException, error_404, error_429

key = 'RGAPI-8a4e9fd9-ef04-4088-ad57-f9eb445bbb7b'

w = RiotWatcher(key)

def wait():
    while not w.can_make_request():
        time.sleep(1)

#def game_tests(username,region):
def game_tests():
    wait()
    #region = raw_input('What is your region? (EUROPE_WEST/NORTH_AMERICA)')
    name = sys.argv[1]
    print name
    region = sys.argv[2]
    print region
    summoner = w.get_summoner(name=name,region=region)
    x=w.get_recent_games(summoner['id'],region =region)
    kills=0
    deaths = 0
    assists = 0
    wins = 0
    
    for i in range(10):
        deaths +=x['games'][i]['stats']['numDeaths'] if 'numDeaths' in x['games'][i]['stats'] else 0
        assists +=x['games'][i]['stats']['assists'] if 'assists' in x['games'][i]['stats'] else 0
        kills += x['games'][i]['stats']['championsKilled'] if 'championsKilled' in x['games'][i]['stats'] else 0
        if(x['games'][i]['stats']['win'] == True):
            wins+=1
    kda = (kills+assists)/(deaths*1.00)
    wrate =wins/10.0
    print "WinRate: ", wrate ," KDA: " ,"%.3f" % round(kda,3)
    #return json.dumps({'WinRate': wrate ,'KDA':"%.3f" % round(kda,3)})



def main():
    region = EUROPE_WEST
    name = 'PSG Steve'
    s = w.get_summoner(name=name,region=region)
    game_tests(s,region)

    #match_tests(m)

if __name__ == '__main__':
	game_tests()