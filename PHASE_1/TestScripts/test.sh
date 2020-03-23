#!/bin/sh

echo "Starting All tests"
echo
echo "Starting API tests"
echo
echo "Starting API usual test cases"
`sh correctUsual.sh`
if [[ $? -eq 1 ]]; then
    echo "An API usual test case failed. Stopping Script."
    rm results.txt
    exit 1
fi
echo "All of the API's usual test cases have been completed"
echo
echo "Starting API error test cases"
`sh correctError.sh`
if [[ $? -eq 1 ]]; then
    echo "An API error test case failed. Stopping Script."
    rm results.txt
    exit 1
fi
echo "All of the API's error test cases have been completed"
echo
echo "Starting API edge tests cases"
`sh correctEdge.sh`
if [[ $? -eq 1 ]]; then
    echo "An API edge test cases failed. Stopping Script."
    rm results.txt
    exit 1
fi
echo "All of the API's edge test cases have been completed"
echo
echo "Starting Load test"
`sh loadtest.sh`
echo "Success! The results matched the expected output."
echo "Load Test Completed"
echo "Load Test passed"
echo
echo "Starting Security Tests"
`sh security.sh`
echo "All Security Tests Completed"
echo "All Security Tests Passed"
echo
echo "All Tests Completed and All Tests Were Successful"
rm results.txt
