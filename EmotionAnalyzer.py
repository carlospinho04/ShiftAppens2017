import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def get_emotion_from_sentences(sentences):
    analyzer = SentimentIntensityAnalyzer()
    for sentence in sentences:
        vs = analyzer.polarity_scores(sentence)
        print(sentence, vs)

