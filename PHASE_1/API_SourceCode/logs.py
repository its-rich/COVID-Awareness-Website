# functions-framework --target get_logs

from flask import render_template_string
from google.cloud import firestore
import re

INDEX_TEMPLATE = """
<!DOCTYPE html>
<head>
  <title>Team Emperor_Augustus' API Logs</title>
</head>
<body>
  <h1>Displays the 50 most recent logs</h1>
  <h2>API Link: "https://asia-northeast1-seng3011-api.cloudfunctions.net/report"</h2>
  {% for log in logs %}
      <p><strong>Access Time:</strong> {{ log.access }}</p>
      <p><strong>Execution Time:</strong> {{ log.time }}</p>
      <p><strong>Data Source:</strong> {{ log.data }}</p>
      <p><strong>Query Parameters:</strong> {{ log.query }}</p>
      <p><strong>Fully Parsed Query Parameters:<br> Start date:</strong> {{log.pquery1}}<br> <strong> End Date:</strong>{{log.pquery2}} <br> <strong> Key Terms: </strong> {{log.pquery3}} <br> <strong> Location: </strong> {{log.pquery4}}</p>
      <p><strong>Request Address:</strong> {{ log.address }},<strong> Request path:</strong> {{ log.path}}</p>
      <p><strong>Response Status:</strong> {{ log.status }}</p>
      <p><strong>Team Name:</strong> {{ log.name }}</p>
  <br>
  {% endfor %}
</body>
"""

class Log():
    def __init__(self, access, data, time, query,pquery, address, method, path, status, name):
        self.access = access
        self.data = data
        self.time = time
        self.query = query
        self.pquery = pquery
        if len(pquery) != 0 and pquery[0] != "Unrecognised format":
            self.pquery1 = pquery[0]
            self.pquery2 = pquery[1]
            self.pquery3 = pquery[2]
            self.pquery4 = pquery[3]
        else:
            self.pquery1 = "N/A"
            self.pquery2 = "N/A"
            self.pquery3 = "N/A"
            self.pquery4 = "N/A"
        self.address = address
        self.method = method
        self.path = path
        self.status = status
        self.name = name

def get_logs(request):
    db = firestore.Client()

    query = db.collection(u'logs').order_by(u'Time', direction='DESCENDING').limit(50).stream()
    #object_methods = [method_name for method_name in dir(query)
    #              if callable(getattr(query, method_name))]
    #print(object_methods)
    logs = []

# docs = db.collection(u'cities').stream()
#
# for doc in docs:
#     print(u'{} => {}'.format(doc.id, doc.to_dict()))
    for q in query:
        temp = q.to_dict()
        if 'Access Time'  in temp:
            access = str(temp['Access Time'])
        else:
            access = "Missing Information"
        if 'Data Source'  in temp:
            data = str(temp['Data Source'])
        else:
            data = "Missing Information"
        if 'Execution Time' in temp:
            time = str(temp["Execution Time"])
        else:
            time = "Missing Information"
        if 'Query Parameters (String)' in temp:
            query = str(temp['Query Parameters (String)'])
        else:
            query = "Missing Information"
        if 'Remote Address' in temp:
            address = str(temp['Remote Address'])
        else:
            address ="Missing Information"
        if 'Request Method' in temp:
            method =str(temp['Request Method'])
        else:
            method = "Missing Information"
        if 'Request Path' in temp:
             path = str(temp['Request Path'])
        else:
            path = "Missing Information"

        if 'Response Status' in temp:
            status = str(temp['Response Status'])
        else:
            status = "Missing Information"

        if 'Team Name' in temp:
            name = str(temp['Team Name'])
        else:
            name = "Missing Information"
        pquery = []
        if len(query) != 0 and (re.match("^\?start_date",query)):
            start = str(re.findall("start_date=(.*)&end",query))
            end = str(re.findall("end_date=(.*)&key",query))
            start = re.sub("%3A",":",start)
            end = re.sub("%3A",":",end)
            pquery.append(start)
            pquery.append(end)
            pquery.append((str(re.findall("key=(.*)&",query))))
            pquery.append((str(re.findall("location=(.*)$",query))))
        else:
           pquery = ["Unrecognised format"]
        L = Log(access, data, time, query, pquery, address, method, path, status, name)
        logs.append(L)
    #testLog = Log("10","WHO","0.1","US, coronavirus","Localhost","Get","path?","200","name?" )
    #logs.append(testLog)
    #reversing the array logs, so the most recent call is the top of the list

    return render_template_string(
        INDEX_TEMPLATE, logs = logs
    )

# get_logs(5)
