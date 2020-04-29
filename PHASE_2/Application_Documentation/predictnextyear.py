import os
from google.cloud import firestore
import json
import re
import requests
from sklearn.linear_model import LinearRegression

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/rliu16/SENG3011/key.json'

db = firestore.Client()

# query = db.collection(u'reports').order_by(u"event_date", direction='DESCENDING').limit(10).stream()
query = db.collection(u'reports').where(u"diseases", u'array_contains', u'mers-cov').stream()
#
docs = [doc for doc in query]
f = open("numbers.txt", "w")
for d in docs:
    total = 0
    deatht = 0
    print(d.get('event_date')[:4])
    print(d.get('event_date')[:4], file=f)
    text = d.get('main_text').split('.')
    print(d.get('headline'))
    for t in text:
        match = re.search('(\d+,\d+|\d+) confirmed.*cases', t.lower())
        if match is None:
            match = re.search('(\d+,\d+|\d+) \w* confirmed.*cases', t.lower())
        if match is None:
            match = re.search('(\d+,\d+|\d+) \w* confirmed', t.lower())
        if match is None:
            match = re.search('(\d+,\d+|\d+) case', t.lower())

        if match is not None:
            # if ':' in match.group(0):
            #     pass
            # else:
            print(match.group(0))
            # print('found')
            num = int(match.group(1).replace(',',''))
            total += num
            # print('')
            # break

        dead = re.search('(\d+,\d+|\d+) cases died', t.lower())
        if dead is None:
            dead = re.search('(\d+,\d+|\d+) death', t.lower())

        if dead is not None:
            print(dead.group(0))
            num = int(dead.group(1).replace(',',''))
            deatht += num

    print('total ' + str(total))
    print('deaths ' + str(deatht))
    print('total ' + str(total), file=f)
    print('deaths ' + str(deatht), file=f)
    print('',file=f)
    print('')

new = t.split('\n')
for n in new:
    title = re.search('^(\w+[-]*[ ]{0,1}\w*)$', n.strip())
    if title is None:
        continue
    elif title.group(0).strip() == '':
        continue
    elif 'image' in title.group(0).lower():
        continue
    look = True
    break

fp = open('numbers.txt', 'r')

f1 = fp.readlines()

count = 1
year = '2013'
deaths =0
infected = 0
change = False
# for line in f1:
#     if count == 5:
#         count = 1
#     if count == 1:
#         if year != line:
#             year = line
#             change = True
#             print(year)
#             print('-')
#     if change == True:
#         print('deaths ' + str(deaths))
#         print('infected ' + str(infected))
#         print('-')
#         print('')
#         infected = 0
#         deaths = 0
#         change = False
#
#     if count == 2:
#         infected += int(line.split(' ')[1])
#     if count == 3:
#         deaths += int(line.split(' ')[1])
#     count+=1

ignore = False
c = 1
testout = []
testin = []
for line in f1:
    if count == 5:
            count = 1
    if count == 1:
        if year != line:
            ignore = True
        if year == line.strip():
            ignore = False
    if count == 2 and ignore == False:
        if line.split(' ')[1] != '0':
            pass
            # print(line)
    if count == 3 and ignore == False:
        if line.split(' ')[1] != '0':
            testout.append(line.split(' ')[1].strip())
            temp = []
            temp.append(c)
            testin.append(temp)
            c +=1
    count+=1

def get_simple_keys(data):
    result = []
    for key in data.keys():
        if type(data[key]) != dict:
            result.append(key)
        else:
            result += get_simple_keys(data[key])
    return result

predictor = LinearRegression(n_jobs=-1)
predictor.fit(X=testin, y=testout)
outcome = predictor.predict(X=[[c]])
print(outcome)
