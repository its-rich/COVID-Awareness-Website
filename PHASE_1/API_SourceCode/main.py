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
from timeit import default_timer as timer
import json
import datetime
import re

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

def valid_string(string):
    list = ['~','!','@','#','$','%','^','&','*','(',')','_','=','+','[',']','{','}','|','\'',';',':','"','<','>',',','/','?']
    for l in list:
        if l in string:
            return False
    return True

def handle_request(request):
    time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    start_timer = timer()

    db = firestore.Client()

    ref = db.collection(u'logs').document(u'{}'.format(time))

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

    # Check that the request is a GET request
    if request.method != 'GET':
        resp_json = {
            'message': 'This API can only handle GET requests'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    # There should only be a certain amount of search parameters
    if len(request.args) != 4:
        resp_json = {
            'message': 'There should be 4 search parameters passed with the query'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    # Check the given parameters are all correct and not empty
    parameters = ['key', 'location', 'start_date', 'end_date']
    for arg in request.args:
        if arg not in parameters:
            resp_json = {
                'message': '{} is not an accepted parameter'.format(arg)
            }
            end_timer = timer()
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(400),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
            })
            return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
        if len(request.args.get(arg)) == 0:
            resp_json = {
                'message': 'The search parameters cannot be empty. {} is empty'.format(arg)
            }
            end_timer = timer()
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(400),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
            })
            return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    if len(request.args.get('key')) < 2:
        resp_json = {
            'message': 'The key should at least be 2 characters long'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    # CHECK THAT THE START DATE & END DATE IS PROPER ISO FORMAT
    # DOESNT CHECK IF ALPHABET IN THERE

    start = request.args.get('start_date')
    end = request.args.get('end_date')

    if len(start) != 19:
        resp_json = {
            'message': 'The start_date is not in the proper ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif len(end) != 19:
        resp_json = {
            'message': 'The end_date is not in the proper ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif valid_string(start):
        resp_json = {
            'message': 'The start_date should only have digits and conform to the ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif valid_string(end):
        resp_json = {
            'message': 'The end_date should only have digits and conform to the ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    now = time[:10] + 'T' + time[11:]
    # start_date < end_date
    if isBefore(end, start):
        resp_json = {
            'message': 'The end_date should not be before the start_date'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif isAfter(end, now):
        resp_json = {
            'message': 'The end date is past the current date & time, so anything nothing can be found'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    # break up key terms into list
    terms = request.args.get('key').split(',')
    key_list = []
    for term in terms:
        term = term.strip()
        key_list.append(term)

    term = False
    docs = []
    country = False

    # check the location is real
    location = request.args.get('location').strip()

    invalid = False

    for letter in location:
        if letter.isdigit() == True:
            invalid = True
            break

    if invalid == False:
        if valid_string(location) == False:
            invalid = True

    if invalid == True:
        resp_json = {
            'message': 'There should only be letters in the location'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    if term == False:
        query = db.collection(u'world').where(u'city', u'==', u'{}'.format(location)).stream()
        docs = [doc for doc in query]
        if len(docs) != 0:
            term = True

    if term == False:

        query = db.collection(u'world').where(u'country', u'==', u'{}'.format(location)).stream()
        docs = [doc for doc in query]
        if len(docs) != 0:
            country = True
            term = True

    if term == False:
        query = db.collection(u'world').where(u'state', u'==', u'{}'.format(location)).stream()
        docs = [doc for doc in query]
        if len(docs) != 0:
            term = True

    if term == False and len(location) == 3:
        query = db.collection(u'world').where(u'iso3', u'==', u'{}'.format(location)).stream()
        docs = [doc for doc in query]
        if len(docs) != 0:
            term = True
    elif term == False and len(location) == 2:
        query = db.collection(u'world').where(u'iso2', u'==', u'{}'.format(location)).stream()
        docs = [doc for doc in query]
        if len(docs) != 0:
            term = True

    if term == False:
        resp_json = {
            'message': 'The location did not match a real location. This is case sensitive and all states must be completely spelt out'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    list = []

    world = []

    for q in docs:
        world.append(q.get('city') + ", " + q.get('state') + '_' + q.get('country'))

    found_loc = []

    if country == True:
        query = db.collection(u'reports').where(u'countries', u'array_contains', u'{}'.format(location)).stream()
        docs = [doc for doc in query]
        if len(docs) != 0:
            found_loc.extend(docs)
    else:
        for w in world:
            query = db.collection(u'reports').where(u'locations', u'array_contains', {u"country": u"{}".format(w.split('_')[1]), "location": "{}".format(w.split('_')[0])}).stream()
            docs = [doc for doc in query]
            if len(docs) != 0:
                found_loc.extend(docs)

    docs = [doc for doc in found_loc]

    if len(docs) == 0:
        resp_json = {
            'message': 'There are no reports which matched the provided location'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(404),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 404, headers)

    response = []

    for q in docs:
        key_exists = False
        date = q.get('date_of_publication')
        if isAfter(date, end):
            continue
        elif isBefore(date, start):
            continue
        main_text = q.get('main_text')
        for key in key_list:
            if key.lower() in main_text.lower():
                key_exists = True
                break
        if key_exists == False:
            continue
        key_exists = False
        temp = {
            'url': q.get('url'),
            'date_of_publication': date,
            'headline': q.get('headline'),
            'main_text': main_text,
            'reports': [{
                'event_date': q.get('event_date'),
                'locations': q.get('locations'),
                'diseases': q.get('diseases'),
                'syndromes': q.get('syndromes')
            }]
        }
        response.append(temp)

    if len(response) is 0:
        resp_json = {
            'message': 'There are no reports which matched the provided search parameters'
        }
        end_timer = timer()
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(404),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 404, headers)

    end_timer = timer()
    ref.set({
        u'Request Method': u'{}'.format(request.method),
        u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
        u'Access Time': u'{}'.format(time),
        u'Team Name': u'Emperor_Augustus',
        u'Data Source': u'WHO',
        u'Request Path': u'/report',
        u'Response Status': u'{}'.format(200),
        u'Remote Address': u'{}'.format(request.remote_addr),
        u'Execution Time': u'{:.2f}s'.format(end_timer - start_timer)
    })

    return (json.dumps(response, ensure_ascii=False).encode('utf8'), 200, headers)
