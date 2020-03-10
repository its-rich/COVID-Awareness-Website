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

def handle_request(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    request_json = request.get_json()

    # this doesnt seem to work
    #response = make_response(render_template('This can only handle GET requests'), 404)

    headers = {
    	'Content-Type': 'application/json'
    }
    '''
    # Check that the request is a GET request
    if request.method != 'GET':
        return ('This can only handle GET requests\n', 400, headers)

    # A GET request must use a string query
    if not request.args:
        return ('You must make a request using string queries\n', 404, headers)

    parameters = ["start", "timezone1", "end", 'timezone2', 'key', 'location']

    # Only a specific set of queries can be made
    for arg in request.args:
        if arg not in parameters:
            return ('The string queries are incorrect\n', 404, headers)

    # All queries must not be empty
    for term in parameters:
        if term is "timezone1" or term is "timezone2":
            continue
        if request.args.get(term) is '':
            return ('All parameters must not be empty\n', 404, headers)
    '''
    # something to manage the dates

    # something to manage the timezone

    # something to manage the key

    #
    #location = request.args.get('location')

    list = []
    # to get the query string
    #start_date = request.args.get(startdate)

    #if start_date is None:
    #    return
    #default_app = firebase_admin.initialize_app()

    db = firestore.Client()
    #diseases = db.collection(u'Coronavirus').stream()

    query = db.collection(u'Coronavirus').where(u'date_of_publication', u'>=', u'2020').stream()

    for q in query:
        list.append(q.get('headline'))

    #for disease in diseases:
        #print(disease.id)

    str = ', '.join(list)
    return str

    #doesn't seem to work
    #print(db.collection(u'Coronavirus').list_documents())
    #return "yes"


    '''str = ', '.join(list)

    return(str)'''


    """if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return f'Hello World!'"""
