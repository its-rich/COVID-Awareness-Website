'''
TO RUN THIS ON A LOCAL HOST


FOR ME
------------------------
https://github.com/GoogleCloudPlatform/functions-framework-python

Get JSON key file


FOR YOU
------------------------
Can use a virtual env, but make sure you have all requirements as in requirements.txt

then set up the environment variable
https://cloud.google.com/docs/authentication/getting-started

then run command
functions-framework --target handle_request

^ environment variable must be the same terminal that you run the command
'''

from google.cloud import firestore
import json
import datetime
import re

def find_loc(field, location):
    query = db.collection(u'world').where(u'{}'.format(field), u'>=', u'{}'.format(location)).stream()
    docs = [doc for doc in query]
    if len(docs) == 0:
        return False
    return True

def isBefore(time1, time2):
    #replacing all x's with 0 as it is assumed that any missing dates are the
    #lowest possible values, as it should return false if it is ambiguous which date came first
    time1 = re.sub('x','0',time1)
    time2 = re.sub('x','0',time2)
    #splitting the times into months,days,hours,etc
    time1 = re.split('\:|\-|T', time1)
    time2 = re.split('\:|\-|T', time2)

    #Finding if time1 is before time2
    if (int(time1[0]) < int(time2[0])):
        return True
    if (time1[0] == time2[0]):

        if (int(time1[1]) < int(time2[1])):
            return True
        if (time1[1] == time2[1]):

            if (int(time1[2]) < int(time2[2])):
                return True
            if (time1[2] == time2[2]):

                if (int(time1[3]) < int( time2[3])):
                    return True
                if (time1[3] == time2[3]):

                    if (int(time1[4]) < int(time2[4])):
                        return True
                    if (time1[4] == time2[4]):

                        if (int(time1[5]) <= int(time2[5])):
                            return True
                        else:
                            return False
    return False

def isAfter(time1, time2):
    #replacing all x's with 9 as it is assumed that any missing dates are the
    # highest possible values, as it should return false if it is ambiguous which date came first
    time1 = re.sub('x','9',time1)
    time2 = re.sub('x','9',time2)
    #splitting the times into months,days,hours,etc
    time1 = re.split('\:|\-|T', time1)
    time2 = re.split('\:|\-|T', time2)

    #Finding if time1 is after time2
    if (int(time1[0]) > int(time2[0])):
        return True
    if (time1[0] == time2[0]):

        if (int(time1[1]) > int(time2[1])):
            return True
        if (time1[1] == time2[1]):

            if (int(time1[2]) > int(time2[2])):
                return True
            if (time1[2] == time2[2]):

                if (int(time1[3]) > int( time2[3])):
                    return True
                if (time1[3] == time2[3]):

                    if (int(time1[4]) > int(time2[4])):
                        return True
                    if (time1[4] == time2[4]):

                        if (int(time1[5]) >= int(time2[5])):
                            return True
                        else:
                            return False
    return False

def handle_request(request):
    time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db = firestore.Client()

    # ref = db.collection(u'logs').document(u'{}'.format(time))
    # ref.set({
    #     u'Request Method': u'{}'.format(request.method),
    #     u'Query String': u'{}'.format(request.full_path[1:]),
    #     u'Date of Request': u'{}'.format(time),
    #     u'Response Status': u'{}'.format(400),
    #     u'JSON Response': u'{}'.format(resp_json)
    # })

    headers = {
    	'Content-Type': 'application/json'
    }

    # Check that the request is a GET request
    if request.method != 'GET':
        resp_json = {
            'message': 'This API can only handle GET requests'
        }
        # ref.set({
        #     u'Request Method': u'{}'.format(request.method),
        #     u'Query String': u'{}'.format(request.full_path[1:]),
        #     u'Date of Request': u'{}'.format(time),
        #     u'Response Status': u'{}'.format(400),
        #     u'JSON Response': u'{}'.format(resp_json)
        # })
        return (json.dumps(resp_json), 400, headers)

    '''
    # A GET request must use a string query
    if not request.args:
        return ('You must make a request using string queries\n', 400, headers)

    '''

    # # There should only be a certain amount of search parameters
    # if len(request.args) != 4:
    #     resp_json = {
    #         'message': 'There should only be 4 search parameters passed with the query'
    #     }
    #     ref.set({
    #         u'Request Method': u'{}'.format(request.method),
    #         u'Query String': u'{}'.format(request.full_path[1:]),
    #         u'Date of Request': u'{}'.format(time),
    #         u'Response Status': u'{}'.format(400),
    #         u'JSON Response': u'{}'.format(resp_json)
    #     })
    #     return (json.dumps(resp_json), 400, headers)
    #
    # # Check the given parameters are all correct and not empty
    # for arg in request.args:
    #     if arg not in parameters:
    #         resp_json = {
    #             'message': '{} is not an accepted parameter'.format(arg)
    #         }
    #         ref.set({
    #             u'Request Method': u'{}'.format(request.method),
    #             u'Query String': u'{}'.format(request.full_path[1:]),
    #             u'Date of Request': u'{}'.format(time),
    #             u'Response Status': u'{}'.format(400),
    #             u'JSON Response': u'{}'.format(resp_json)
    #         })
    #         return (json.dumps(resp_json), 400, headers)
        # if len(request.args.get(arg)) == 0:
        #     resp_json = {
        #         'message': 'The search parameters cannot be empty. {} is empty'.format(arg)
        #     }
        #     ref.set({
        #         u'Request Method': u'{}'.format(request.method),
        #         u'Query String': u'{}'.format(request.full_path[1:]),
        #         u'Date of Request': u'{}'.format(time),
        #         u'Response Status': u'{}'.format(400),
        #         u'JSON Response': u'{}'.format(resp_json)
        #     })
        #     return (json.dumps(resp_json), 400, headers)
    #
    # if len(request.args.get('key')) < 2:
    #     resp_json = {
    #         'message': 'The key should at least be 2 characters long'
    #     }
    #     ref.set({
    #         u'Request Method': u'{}'.format(request.method),
    #         u'Query String': u'{}'.format(request.full_path[1:]),
    #         u'Date of Request': u'{}'.format(time),
    #         u'Response Status': u'{}'.format(400),
    #         u'JSON Response': u'{}'.format(resp_json)
    #     })
    #     return (json.dumps(resp_json), 400, headers)
    #
    #
    # start = request.args.get(start_date)
    # end = request.args.get(end_date)

    # now = time[:10] + 'T' + time[11:]
    # start_date < end_date
    # if isBefore(end, start):
    #     resp_json = {
    #         'message': 'The end date should not be after the start date'
    #     }
    #     ref.set({
    #         u'Request Method': u'{}'.format(request.method),
    #         u'Query String': u'{}'.format(request.full_path[1:]),
    #         u'Date of Request': u'{}'.format(time),
    #         u'Response Status': u'{}'.format(400),
    #         u'JSON Response': u'{}'.format(resp_json)
    #     })
    #     return (json.dumps(resp_json), 400, headers)
    # elif isAfter(end, now):
    #     ref.set({
    #         u'Request Method': u'{}'.format(request.method),
    #         u'Query String': u'{}'.format(request.full_path[1:]),
    #         u'Date of Request': u'{}'.format(time),
    #         u'Response Status': u'{}'.format(400),
    #         u'JSON Response': u'{}'.format(resp_json)
    #     })
    #     resp_json = {
    #         'message': 'The end date is past the current date & time, so anything nothing can be found'
    #     }
    #     return (json.dumps(resp_json), 400, headers)

    # # break up key terms into list
    # terms = request.args.get('key').split(',')
    # key_list = []
    # for term in terms:
    #     if term[0] == ' ':
    #         term = term[1:]
    #     key_list.append(term)

    # check the location is real
    # #location = request.args.get('location')
    # if find_loc('city', location):
    #     query = db.collection(u'world').where(u'city', u'>=', u'{}'.format(location)).stream()
    # elif find_loc('country', location):
    #     query = db.collection(u'world').where(u'country', u'>=', u'{}'.format(location)).stream()
    # elif find_loc('state', location):
    #     query = db.collection(u'world').where(u'state', u'>=', u'{}'.format(location)).stream()
    # elif find_loc('iso2', location):
    #     query = db.collection(u'world').where(u'iso2', u'>=', u'{}'.format(location)).stream()
    # elif find_loc('iso3', location):
    #     query = db.collection(u'world').where(u'iso3', u'>=', u'{}'.format(location)).stream()
    # else:
        # resp_json = {
        #     'message': 'The location was misspelt'
        # }
        # ref.set({
        #     u'Request Method': u'{}'.format(request.method),
        #     u'Query String': u'{}'.format(request.full_path[1:]),
        #     u'Date of Request': u'{}'.format(time),
        #     u'Response Status': u'{}'.format(400),
        #     u'JSON Response': u'{}'.format(resp_json)
        # })
        # return (json.dumps(resp_json), 400, headers)

    list = []

    # query = db.collection(u'Coronavirus').where(u'date_of_publication', u'>=', u'aa').stream()
    query = db.collection(u'reports').where(u'date_of_publication', u'>=', u'2020').stream()

    docs = [doc for doc in query]

    if len(docs) == 0:
        resp_json = {
            'message': 'There are no reports which match the provided search parameters'
        }
        # ref.set({
        #     u'Request Method': u'{}'.format(request.method),
        #     u'Query String': u'{}'.format(request.full_path[1:]),
        #     u'Date of Request': u'{}'.format(time),
        #     u'Response Status': u'{}'.format(400),
        #     u'JSON Response': u'{}'.format(resp_json)
        # })
        return (resp_json, 404, headers)

    response = []

    # for q in docs:
    #     key_exists = False
    #     main_text = q.get('main_text')
    #     for key in key_list:
    #         if key.lower() in main_text.lower():
    #             key_exists = True
    #             break
    #     if key_exists == False:
    #         continue
    #     key_exists = False
    #     date = q.get('date_of_publication')
    #     if isAfter(date, end):
    #         continue
    #     elif isBefore(date, start):
    #         continue
    #     temp = {
    #         'url': q.get('url'),
    #         'date_of_publication': date,
    #         'headline': q.get('headline'),
    #         'main_text': main_text,
    #         'reports': [{
    #             'event_date': q.get('event_date'),
    #             'locations': q.get('locations'),
    #             'diseases': q.get('diseases'),
    #             'syndromes': q.get('syndromes')
    #         }]
    #     }
    #     response.append(temp)

    # ref.set({
    #     u'Request Method': u'{}'.format(request.method),
    #     u'Query String': u'{}'.format(request.full_path[1:]),
    #     u'Date of Request': u'{}'.format(time),
    #     u'Response Status': u'{}'.format(400),
    #     u'JSON Response': u'{}'.format(response)
    # })

    str = ', '.join(list)
    # return (json.dumps(response), 200, headers)
    return str
