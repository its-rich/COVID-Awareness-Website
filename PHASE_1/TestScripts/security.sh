#!/bin/sh

# Since these tests print the date and time these commands are used it will never
# be able to match an expected output. Although these tests will always behave the
# same way since google will not loosen their security settings

# note the first this first command will scan all 65,000 tcp ports so it will take a while
# `nmap -Pn -p 1-65535 asia-northeast1-seng3011-api.cloudfunctions.net > results.txt`

# so that the tests does not last up to 30mins a quicker scan is done with this command
`nmap asia-northeast1-seng3011-api.cloudfunctions.net > results.txt`

# Create decoys when scanning
`nmap -D 216.239.36.54 2>> results.txt 1>/dev/null`
`nmap -D 216.239.36.54 >> results.txt`

# FIN Scan
`nmap -sF -p1-100 -T4 para 2>> results.txt 1>/dev/null`

# Check firewall settings
`nmap -sA 216.239.36.54 2>> results.txt 1>/dev/null`

# Attempting to bypass Windows IPsec filter using source port 88
`nmap -sS -v -v -Pn -g 88 216.239.36.54 2>> results.txt 1>/dev/null`
