#!/bin/sh

#End_date == Start_date
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2019-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`
#
# cp results.txt expected1.txt
python3 jsoncmp.py expected1.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Start_date  == 1996-01-01
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=1996-01-01T12:00:00&end_date=1999-01-01T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected2.txt
python3 jsoncmp.py expected2.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#End_date  == 1996-01-01
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=1995-01-01T12:00:00&end_date=1996-01-01T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected3.txt
python3 jsoncmp.py expected3.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Start_date = current time
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-03-22T12:00:00&end_date=2020-03-22T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected4.txt
python3 jsoncmp.py expected4.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#End_date = current time
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-01-02T12:00:00&end_date=2020-03-22T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected5.txt
python3 jsoncmp.py expected5.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#only commas in the key
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-03-22T12:00:00&end_date=2020-05-22T12:00:00&key=,,,&location=Australia" -H "Accept:application/json" -o results.txt`

# cp results.txt expected6.txt
python3 jsoncmp.py expected6.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Key == 100 characters
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-01-02T12:00:00&end_date=2020-03-22T12:00:00&key=no%20location%20xyz%20characters%20so%20anyything%20more%20than%20xyz%20characters%20is%20not%20accepted%20as%20a%20valid%20location&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected7.txt
python3 jsoncmp.py expected7.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location == 100 characters
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-01-02T12:00:00&end_date=2020-03-22T12:00:00&key=co&location=no%20location%20xyz%20characters%20so%20anyything%20more%20than%20xyz%20characters%20is%20not%20accepted%20as%20a%20valid%20location" -H "Accept:application/json" -o results.txt`

# cp results.txt expected8.txt
python3 jsoncmp.py expected8.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi
