#!/usr/local/bin/python
#coding:utf8
import numpy as np
import pandas as pd
import googletrans
from googletrans import Translator
from pyavrophonetic import avro
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

#USING PYTHON DEFUALT GOOGLE TRANSLATOR
translator = Translator()
#CSV FILE READ FROM LOCAL STORAGE USING PANDAS
df = pd.read_csv("C:\\Users\\Daraz\\Desktop\\banglish2\\brand-nw.csv", encoding='UTF-8')
df.columns = ['Original_Word']

#DEFINE A COLUMN TO STORE THE  TRANSLATED WORDS
translated_words = []
for element in df['Original_Word']:
    # HELP OF THE GOOGLE TRANSLATOR, TRANSLATE THE WORDS FROM SOURCE LANGUAGE TO DESTINATION
    tr_bng2 = translator.translate(element, src= 'en', dest= 'bn')
    translated_words.append(tr_bng2.text)
                    

#STORE THE TRANSLATED WORDS
df['translated_words'] = translated_words
#FINALLY WRITE THE OUTPUT WORDS IN SAME CSV FILE
df.to_csv("C:\\Users\\Daraz\\Desktop\\banglish2\\brand-new.csv", header=True, index=False)
