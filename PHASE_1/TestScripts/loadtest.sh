#!/bin/sh

# The load test always varies in output so it cannot be matched against an expected output.

`wrk -t2 -c100 -d30s -R2000 "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2020-01-01T00:00:00&end_date=2020-03-20T00:00:00&key=corona&location=China" --timeout 30 1> results.txt`
