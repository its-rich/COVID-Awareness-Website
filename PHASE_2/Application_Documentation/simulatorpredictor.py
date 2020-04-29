import json
from sklearn.linear_model import LinearRegression
import math

testout = []
testin = []
actualin = []
c = 0

with open('2020-01-01_2020-02-01.json', encoding='utf-8') as json_file:
    data = json.load(json_file)
    for date in data['result']['AUS']:
        testout.append(date['confirmed'])
        testin.append([c])
        c += 1

with open('2020-02-01_2020-03-01.json', encoding='utf-8') as json_file:
    data = json.load(json_file)
    for date in data['result']['AUS']:
        testout.append(date['confirmed'])
        testin.append([c])
        c += 1

with open('2020-03-01_2020-04-01.json', encoding='utf-8') as json_file:
    data = json.load(json_file)
    for date in data['result']['AUS']:
        testout.append(date['confirmed'])
        testin.append([c])
        c += 1

with open('2020-04-01_2020-05-01.json', encoding='utf-8') as json_file:
    data = json.load(json_file)
    for date in data['result']['AUS']:
        testout.append(date['confirmed'])
        testin.append([c])
        c += 1

for i in range(200):
    actualin.append([i])

predictor = LinearRegression(n_jobs=-1)
predictor.fit(X=testin, y=testout)
outcome = predictor.predict(X=actualin)
# print(outcome)

len = 0
totalcases = [1]
infectionrate = []

for predict in outcome:
    if math.floor(predict) > 0:
        val = totalcases[len]/math.floor(predict)
        # val = math.ceil(val)
        infectionrate.append(val)
        totalcases.append(math.floor(predict))
        len += 1

print(infectionrate)
