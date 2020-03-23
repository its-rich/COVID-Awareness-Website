#!/bin/sh

#Request.method!=GET
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2019-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected9.txt
python3 jsoncmp.py expected9.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#there are more search parameters than needed
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=d&words=yes&numbers=5" -H "Accept:application/json" -o results.txt`

# cp results.txt expected10.txt
python3 jsoncmp.py expected10.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Search parameters are empty
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=&location=" -H "Accept:application/json" -o results.txt`

# cp results.txt expected11.txt
python3 jsoncmp.py expected11.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Start_date/end_date is not in ISO 8601 format
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=22&end_date=2020-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected12.txt
python3 jsoncmp.py expected12.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Start_date/end_date contain characters other than[:T-0-9]
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03p-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected13.txt
python3 jsoncmp.py expected13.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Key > 100characters
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=b&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected14.txt
python3 jsoncmp.py expected14.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location > 100 characters
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=ChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinaChinadd" -H "Accept:application/json" -o results.txt`

cp results.txt expected15.txt
python3 jsoncmp.py expected15.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Key > 100 characters
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=no%20location%20xyz%20characters%20so%20anyything%20more%20than%20xyz%20characters%20is%20not%20accepted%20as%20a%20valid%20locationdddd&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected16.txt
python3 jsoncmp.py expected16.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location is not correctly spelt
`curl -s "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=Chinga" -H "Accept:application/json" -o results.txt`

# cp results.txt expected17.txt
python3 jsoncmp.py expected17.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi
