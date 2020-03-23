import json, sys

fileExpected = str(sys.argv[1])

r = open('results.txt', "r", encoding="UTF-8")
e = open(fileExpected, "r", encoding="UTF-8")

rLine = r.readline()
eLine = e.readline()

lineNum = 1
clean = True
while (rLine != ""):
    comparison = ( json.loads(rLine) == json.loads(eLine) )
    if comparison == False:
        clean = False
        break

    lineNum += 1
    rLine = r.readline()
    eLine = e.readline()

if clean:
        sys.exit(0)

sys.exit(1)
