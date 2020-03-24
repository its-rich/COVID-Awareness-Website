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
from datetime import timedelta
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

def get_time():
    copy = datetime.datetime.now() + timedelta(hours=11)
    return copy

def handle_request(request):
    db = firestore.Client()
    start_timer = timer()
    copy = get_time()
    time = copy.strftime('%Y-%m-%d %H:%M:%S')

    ref = db.collection(u'logs').document(time)

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
    }

    # Check that the request is a GET request
    if request.method != 'GET':
        resp_json = {
            'message': 'This API can only handle GET requests'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    # There should only be a certain amount of search parameters
    if len(request.args) < 2:
        resp_json = {
            'message': 'There should at least be 2 search parameters passed with the query: start_date & end_date'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
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
            timestr = str((end_timer - start_timer))
            ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(400),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{}'.format(ms),
                u'Time': u'{}'.format(time)
            })
            return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
        if arg != 'key' and arg != 'location' and len(request.args.get(arg)) == 0:
            resp_json = {
                'message': 'These search parameters cannot be empty: {} is empty'.format(arg)
            }
            end_timer = timer()
            timestr = str((end_timer - start_timer))
            ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(400),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{}'.format(ms),
                u'Time': u'{}'.format(time)
            })
            return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    empty_key = False
    empty_loc = False

    if 'location' not in request.args:
        empty_loc = True
    elif len(request.args.get('location').strip()) == 0:
        empty_loc = True

    if 'key' not in request.args:
        empty_key = True
    elif len(request.args.get('key').strip()) == 0:
        empty_key = True

    # TODO
    if empty_key == False and len(request.args.get('key').replace(",","")) > 100:
        resp_json = {
            'message': 'The key should not be longer than 100 characters'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif empty_loc == False and len(request.args.get('location').strip()) > 100:
        resp_json = {
            'message': 'There should be no location longer than 100 characters so anything more than 100 characters is not accepted as a valid location'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    start = request.args.get('start_date')
    end = request.args.get('end_date')

    correct = True

    if len(start) != 19:
        correct = False
    elif len(end) != 19:
        correct = False
    elif re.search('[A-SU-Za-z!-,./;-@{-~ ]', start + end) is not None:
        correct = False

    if correct == False:
        resp_json = {
            'message': 'The start_date or end_date is not in the proper ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    try:
        newDate = datetime.datetime(int(start[:4]),int(start[5:7]),int(start[8:10]),int(start[11:13]),int(start[14:16]),int(start[17:]))
        correct = True
    except ValueError:
        correct = False

    if correct == False:
        resp_json = {
            'message': 'The start_date is not in the proper ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    correct = True

    try:
        newDate = datetime.datetime(int(end[:4]),int(end[5:7]),int(end[8:10]),int(end[11:13]),int(end[14:16]),int(end[17:]))
        correct = True
    except ValueError:
        correct = False

    if correct == False:
        resp_json = {
            'message': 'The end_date is not in the proper ISO 8601 date and format; YYYY-MM-DDTHH:MM:SS'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    now = copy.strftime('%Y-%m-%dT%H:%M:%S')

    fine = False

    if start == end:
        fine = True

    # start_date < end_date
    if fine == False and start != '1996-01-01T00:00:00' and isBefore(start, '1996-01-01T00:00:00'):
        resp_json = {
            'message': 'The earliest the start_date can be is 1st of January 1996 as WHO started releasing reports in 1996'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    if fine == False and isBefore(end, start):
        resp_json = {
            'message': 'The end_date should not be before the start_date'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif fine == False and isBefore(now, start):
        resp_json = {
            'message': 'The start_date is past the current date & time, so nothing can be found'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)
    elif fine == False and isBefore(now, end):
        resp_json = {
            'message': 'The end_date is past the current date & time, so nothing can be found'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(400),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

    key_list = []

    if empty_key == False:
        # break up key terms into list
        terms = request.args.get('key').split(',')
        for term in terms:
            term = term.strip()
            if term == '':
                break
            key_list.append(term)
    else:
        key_list.append('')

    term = False
    docs = []
    country = False
    iso2 = False
    iso3 = False
    state = False
    response = []

    if empty_loc == False:
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
            timestr = str((end_timer - start_timer))
            ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(400),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{}'.format(ms),
                u'Time': u'{}'.format(time)
            })
            return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 400, headers)

        if location == 'United States of America':
            location = 'United States'

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
                state = True
                term = True

        if term == False and len(location) == 3:
            query = db.collection(u'world').where(u'iso3', u'==', u'{}'.format(location)).stream()
            docs = [doc for doc in query]
            if len(docs) != 0:
                iso3 = True
                term = True
        elif term == False and len(location) == 2:
            query = db.collection(u'world').where(u'iso2', u'==', u'{}'.format(location)).stream()
            docs = [doc for doc in query]
            if len(docs) != 0:
                iso2 = True
                term = True

        if term == False:
            resp_json = {
                'message': 'The location did not match a real location. This is case sensitive and all cities/states/countries must be completely spelt out in their english spelling'
            }
            end_timer = timer()
            timestr = str((end_timer - start_timer))
            ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(400),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{}'.format(ms),
                u'Time': u'{}'.format(time)
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
        elif iso2 == True:
            query = db.collection(u'reports').where(u'iso2', u'array_contains', u'{}'.format(location)).stream()
            docs = [doc for doc in query]
            if len(docs) != 0:
                found_loc.extend(docs)
        elif iso3 == True:
            query = db.collection(u'reports').where(u'iso3', u'array_contains', u'{}'.format(location)).stream()
            docs = [doc for doc in query]
            if len(docs) != 0:
                found_loc.extend(docs)
        elif state == True:
            query = db.collection(u'reports').where(u'state', u'array_contains', u'{}'.format(location)).stream()
            docs = [doc for doc in query]
            if len(docs) != 0:
                found_loc.extend(docs)
        else:
            for w in world:
                query = db.collection(u'reports').where(u'locations', u'array_contains', {u"country": u"{}".format(w.split('_')[1]), "location": "{}".format(w.split('_')[0])}).stream()
                docs = [doc for doc in query]
                if len(docs) != 0:
                    found_loc.extend(docs)

        all_docs = [doc for doc in found_loc]

        if len(all_docs) == 0:
            resp_json = {
                'message': 'There are no reports which exactly matched the provided location. There are no reports which directly reference this location'
            }
            end_timer = timer()
            timestr = str((end_timer - start_timer))
            ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
            ref.set({
                u'Request Method': u'{}'.format(request.method),
                u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
                u'Access Time': u'{}'.format(time),
                u'Team Name': u'Emperor_Augustus',
                u'Data Source': u'WHO',
                u'Request Path': u'/report',
                u'Response Status': u'{}'.format(404),
                u'Remote Address': u'{}'.format(request.remote_addr),
                u'Execution Time': u'{}'.format(ms),
                u'Time': u'{}'.format(time)
            })
            return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 404, headers)

    if empty_loc == True:
        query = db.collection(u'reports').stream()
        for q in query:
            if empty_key == False:
                key_exists = False
            t_date = q.get('date_of_publication')
            date = t_date.split(' ')[0] + 'T' +t_date.split(' ')[1]
            if isAfter(date, end):
                continue
            elif isBefore(date, start):
                continue
            main_text = q.get('main_text')
            if empty_key == False:
                for key in key_list:
                    if re.search('{}'.format(key.lower().strip()), main_text.lower()) is not None:
                        key_exists = True
                        break
            if empty_key == False and key_exists == False:
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
    else:
        for q in all_docs:
            if empty_key == False:
                key_exists = False
            t_date = q.get('date_of_publication')
            date = t_date.split(' ')[0] + 'T' +t_date.split(' ')[1]
            if isAfter(date, end):
                continue
            elif isBefore(date, start):
                continue
            main_text = q.get('main_text')
            if empty_key == False:
                for key in key_list:
                    if re.search('{}'.format(key.lower().strip()), main_text.lower()) is not None:
                        key_exists = True
                        break
            if empty_key == False and key_exists == False:
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
            'message': 'There are no reports which exactly matched the provided search parameters'
        }
        end_timer = timer()
        timestr = str((end_timer - start_timer))
        ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
        ref.set({
            u'Request Method': u'{}'.format(request.method),
            u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
            u'Access Time': u'{}'.format(time),
            u'Team Name': u'Emperor_Augustus',
            u'Data Source': u'WHO',
            u'Request Path': u'/report',
            u'Response Status': u'{}'.format(404),
            u'Remote Address': u'{}'.format(request.remote_addr),
            u'Execution Time': u'{}'.format(ms),
            u'Time': u'{}'.format(time)
        })
        return (json.dumps(resp_json, ensure_ascii=False).encode('utf8'), 404, headers)

    end_timer = timer()
    timestr = str((end_timer - start_timer))
    ms = timestr.split('.')[0] + '{}'.format(timestr.split('.')[1][:3]) + ' ms'
    ref.set({
        u'Request Method': u'{}'.format(request.method),
        u'Query Parameters (String)': u'{}'.format(request.full_path[1:]),
        u'Access Time': u'{}'.format(time),
        u'Team Name': u'Emperor_Augustus',
        u'Data Source': u'WHO',
        u'Request Path': u'/report',
        u'Response Status': u'{}'.format(200),
        u'Remote Address': u'{}'.format(request.remote_addr),
        u'Execution Time': u'{}'.format(ms),
        u'Time': u'{}'.format(time)
    })

    return (json.dumps(response, ensure_ascii=False).encode('utf8'), 200, headers)
