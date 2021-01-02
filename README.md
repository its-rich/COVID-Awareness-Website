# What is this?
A web application that displays the impact of well known diseases on geographical locations since their initial outbreak. It also simulates how coronavirus can spread across Australia. 

# How can I access it?
https://seng3011-api.web.app/

# Features
* Visually display a variety of diseases and the amount of people they have infected or killed within since 1996 (based on data scraped from [WHO's Disease Outbreak News](https://www.who.int/csr/don/archive/year/2020/en/))
* Provides a coronavirus tracking system for Australians infected by coronavirus to provide their details
	* Completed before the COVIDSafe app existed 
	* A lot less invasive than the COVIDSafe app
* A coronavirus simulator which will visually display the how COVID can spread in Australia (based on the data from an [API](https://github.com/backtrackbaba/covid-api) that uses the dataset from John Hopkins' University)
	* Visually expresses the impact of an uncontrolled virus
	* Visually shows the effects of a lockdown
	* Visually indicates how effective a vaccine can be
	* Note it can only handle showing up to 30,000 cases

# Stack
The frontend was developed using ReactJS and is hosted on a Firebase server while the API is a Google Cloud Function written in Python.

# Where can I find the code?
Source code for the frontend: 
* [Repo](https://github.com/its-rich/COVID-Awareness-Website/tree/master/PHASE_2/Application_SourceCode/frontend)

Source code for the API/Google Cloud Function:
* [API](https://asia-northeast1-seng3011-api.cloudfunctions.net/report)
* [API File](https://github.com/its-rich/COVID-Awareness-Website/blob/master/PHASE_1/API_SourceCode/api.py)
* [API Logs](https://asia-northeast1-seng3011-api.cloudfunctions.net/logs)
* [API Logs File](https://github.com/its-rich/COVID-Awareness-Website/blob/master/PHASE_1/API_SourceCode/logs.py)

Source code for WHO Disease Outbreak News Webscraper:
* [File](https://github.com/its-rich/COVID-Awareness-Website/blob/master/PHASE_1/API_SourceCode/crawler.py)

# Project Report
* [Final Report.pdf](https://github.com/its-rich/COVID-Awareness-Website/blob/master/Reports/Final%20Report.pdf)
