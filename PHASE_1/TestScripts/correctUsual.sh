##!/bin/sh

#Start_date < End_Date
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected18.txt
python3 jsoncmp.py expected18.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location = city
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=Wuhan" -H "Accept:application/json" -o results.txt`

# cp results.txt expected19.txt
python3 jsoncmp.py expected19.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location = state
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=Hubei" -H "Accept:application/json" -o results.txt`

# cp results.txt expected20.txt
python3 jsoncmp.py expected20.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location == country
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected21.txt
python3 jsoncmp.py expected21.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Key == term1
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected22.txt
python3 jsoncmp.py expected22.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Key == term1, term2, term3
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=china,coronavirus&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected23.txt
python3 jsoncmp.py expected23.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Location = iso2 country code
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=china,coronavirus&location=USA" -H "Accept:application/json" -o results.txt`

# cp results.txt expected24.txt
python3 jsoncmp.py expected24.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#Key == ''
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=&location=China" -H "Accept:application/json" -o results.txt`

# cp results.txt expected25.txt
python3 jsoncmp.py expected25.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi

#location == ''
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2019-03-14T12:00:00&end_date=2020-03-14T12:00:00&key=death&location=" -H "Accept:application/json" -o results.txt`

# cp results.txt expected26.txt
python3 jsoncmp.py expected26.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi


#Key == ''
`curl -s  "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-01-01T12:00:00&end_date=2020-03-14T12:00:00" -H "Accept:application/json" -o results.txt`

# cp results.txt expected27.txt
python3 jsoncmp.py expected27.txt
if [[ $? -eq 1 ]]; then
    exit 1
fi
