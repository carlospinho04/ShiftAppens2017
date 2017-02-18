
# these tests are pretty bad, mostly to make sure no exceptions are thrown

import time
import json
from riotwatcher import RiotWatcher, NORTH_AMERICA, EUROPE_WEST
from riotwatcher import LoLException, error_404, error_429

key = 'RGAPI-8a4e9fd9-ef04-4088-ad57-f9eb445bbb7b'

# if summoner doesnt have ranked teams, teams tests will fail
# if summoner doesnt have ranked stats, stats tests will fail
# these are not graceful failures, so try to use a summoner that has them

w = RiotWatcher(key)

def wait():
    while not w.can_make_request():
        time.sleep(1)


def champion_tests():
    wait()
    temp = w.get_all_champions()
    wait()
    w.get_champion(temp['champions'][0]['id'])


def current_game_tests():
    wait()
    player = w.get_featured_games()['gameList'][0]['participants'][0]['summonerName']
    wait()
    player_id = w.get_summoner(name=player)['id']
    wait()
    w.get_current_game(player_id)


def featured_games_tests():
    wait()
    w.get_featured_games()


def game_tests(summoner,region):
    wait()
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
    
    return

def league_tests(summoner):
    wait()
    w.get_league(summoner_ids=[summoner['id'], ])
    wait()
    w.get_league_entry(summoner_ids=[summoner['id'], ])
    wait()
    w.get_challenger()
    wait()
    w.get_master()


def static_tests():
    temp = w.static_get_champion_list()
    w.static_get_champion(temp['data'][list(temp['data'])[0]]['id'])
    temp = w.static_get_item_list()
    w.static_get_item(temp['data'][list(temp['data'])[0]]['id'])
    temp = w.static_get_mastery_list()
    w.static_get_mastery(temp['data'][list(temp['data'])[0]]['id'])
    w.static_get_realm()
    temp = w.static_get_rune_list()
    w.static_get_rune(temp['data'][list(temp['data'])[0]]['id'])
    temp = w.static_get_summoner_spell_list()
    w.static_get_summoner_spell(temp['data'][list(temp['data'])[0]]['id'])
    w.static_get_versions()


def status_tests():
    w.get_server_status()
    w.get_server_status(region=NORTH_AMERICA)


def match_tests(match):
    wait()
    return w.get_match(match['matchId'])



def stats_tests(summoner):
    wait()
    w.get_stat_summary(summoner['id'])
    wait()
    w.get_ranked_stats(summoner['id'])


def summoner_tests(summoner_name):
    wait()
    try:
        s = w.get_summoner(name=summoner_name)
        wait()
        w.get_summoner(_id=s['id'])
        wait()
        w.get_summoner_name([s['id'], ])
    except LoLException as e:
        if e == error_429:
            print('We should retry in {} seconds.'.format(e.headers['Retry-After']))
        elif e == error_404:
            print('Summoner not found.')
    return s


def team_tests(summoner):
    wait()
    t = w.get_teams_for_summoner(summoner['id'])
    wait()
    w.get_team(t[0]['fullId'])


def match_list_tests(summoner):
    wait()
    ##print(w.get_match_list(summoner['id'])['matches'])
    return w.get_match_list(summoner['id'])['matches']


def main():
    region = EUROPE_WEST
    name = 'PSG Steve'
    s = w.get_summoner(name=name,region=region)
    game_tests(s,region)

    #match_tests(m)

if __name__ == '__main__':
    main()