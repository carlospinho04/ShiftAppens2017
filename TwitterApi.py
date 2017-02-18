import time
from datetime import datetime
import sys
import json
from twitter import Twitter, OAuth, TwitterHTTPError, TwitterStream
import EmotionAnalyzer as ea

def get_player_emotion(player, twitt_name):
    player_tweets = get_last_tweets_from_player(twitt_name)
    emotion = ea.get_emotion_from_sentences(player_tweets, player) 
    return emotion

def get_last_tweets_from_player(player_name):
    last_commits = []
    twitter = init_twitter_connection()
    last_tweets = twitter.statuses.user_timeline(screen_name=player_name, count=10)
    for tweet in last_tweets:
        tweet_date = datetime.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y')
        current_date = str(time.strftime("%d-%m-%Y"))
        current_date = datetime.strptime(current_date, "%d-%m-%Y")
        if abs((tweet_date - current_date).days) < 7:
            last_commits.append(tweet['text'])
        else:
            break

    return last_commits

def init_twitter_connection():
    data = get_config_info()
    ACCESS_TOKEN = data['access_token']
    ACCESS_SECRET = data['access_secret'] 
    CONSUMER_KEY = data['consumer_key'] 
    CONSUMER_SECRET = data['consumer_secret']
    oauth = OAuth(ACCESS_TOKEN, ACCESS_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
    twitter = Twitter(auth=oauth)
    return twitter
    
def get_config_info():
    with open ('config.json') as config_data:
        data = json.load(config_data)
    return data

