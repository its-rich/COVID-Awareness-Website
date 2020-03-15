import requests
from bs4 import BeautifulSoup
import json
from google.cloud import firestore
import re

def get_years(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    results = []

    for href in soup.find("ul", class_="list").find_all("li"):
        results.append("https://www.who.int" + href.find("a")["href"])

    return results

def get_links_in_year(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    results = []

    for href in soup.find("ul", class_="auto_archive").find_all("li"):
        results.append("https://www.who.int" + href.find("a")["href"])

    return results

def get_document(url):
    r = requests.get(url)
    if r.status_code == 200:
        soup = BeautifulSoup(r.content, "html.parser")

        date = soup.find("meta", attrs={'name':"webit_cover_date"})["content"] + ' xx:xx:xx'
        headline = soup.find("meta", attrs={'name':"DC.title"})["content"].split("|")[1].strip()
        main_text = ''

        # should work for 2014 - 2020 inclusive
        for text in soup.findAll(attrs={'id':"primary"}):
            text.find('h1', attrs={'class':"headline"}).decompose()
            text.find('p').decompose()
            main_text = text.get_text().strip().split('\nPublic health response\n\n')[0]
            break

        # db = firestore.Client()
        # query = db.collection(u'symptoms').stream()
        #
        # symptoms = []
        #
        # for q in query:
        #     symptoms.append(q.get('symptom'))
        #
        # found_symp = []
        #
        # for s in symptoms:
        #     if re.search(' {}[, ]'.format(s.lower().strip()), main_text.lower()) is not None:
        #         found_symp.append(s)
        #
        # if len(found_symp) == 0:
        #     found_symp.append('unknown')
        #
        # query = db.collection(u'world').stream()
        #
        # loc = []
        #
        # for q in query:
        #     loc.append(q.get('city') + ', ' + q.get('state') + '_' + q.get('country'))
        #
        # found_loc = []
        #
        # countries = []
        #
        # for l in loc:
        #     if re.search(' {}[, ]'.format(l.split(', ')[0].strip()), main_text) is not None:
        #         found_loc.append(l)
        #     exists = False
        #     for full_loc in found_loc:
        #         if l.split('_')[1].strip() in full_loc:
        #             exists = True
        #     if exists == True:
        #         continue
        #     elif re.search(' {}[, ]'.format(l.split('_')[1].strip()), main_text) is not None:
        #         found_loc.append("+_" + l.split('_')[1])
        #
        # locations = []
        #
        # for l in found_loc:
        #     if l[0] == '+' and l[1] == '_':
        #         exists = False
        #         for c in found_loc:
        #             if c is l:
        #                 continue
        #             if l[2:] in c:
        #                 exists = True
        #                 break
        #         if exists == True:
        #             found_loc.remove(l)
        #
        # keywords = soup.find("meta", attrs={'name':"DC.keywords"})["content"].strip().split(", ")
        # for term in keywords:
        #     if "[country]" in term:
        #         word = term.split("[country]")[0]
        #         word = word.strip()
        #         exists = False
        #         for full_loc in found_loc:
        #             if word in full_loc:
        #                 exists = True
        #                 break
        #         if exists == False:
        #             found_loc.append('_' + word)
        #
        # for l in found_loc:
        #     lo = l.split('_')[0]
        #     if len(lo) == 1:
        #         lo = ''
        #     temp = {
        #         u'country': u'{}'.format(l.split('_')[1]),
        #         u'location': u'{}'.format(lo)
        #     }
        #     locations.append(temp)
        #     if l.split('_')[1] not in countries:
        #         countries.append(l.split('_')[1])
        #
        # diseases = []
        #
        # query = db.collection(u'diseases').stream()
        # for q in query:
        #     d = q.get('diseases')
        #     for word in d:
        #         if re.search(' {}[, ]'.format(word.lower().strip()), main_text.lower()) is not None:
        #             diseases.append(d[0].strip())
        #             break
        #
        # if len(diseases) > 1:
        #     if 'other' in diseases:
        #         diseases.remove('other')
        #     if 'unknown' in diseases:
        #         diseases.remove('unknown')
        #
        # ref = db.collection(u'reports').document(headline + " " + soup.find("meta", attrs={'name':"webit_cover_date"})["content"])
        # ref.set({
        #     u'url': u'{}'.format(url),
        #     u'date_of_publication': u'{}'.format(date),
        #     u'headline': u'{}'.format(headline),
        #     u'main_text': u'{}'.format(main_text),
        #     u'event_date': u'{}'.format(soup.find("meta", attrs={'name':"webit_cover_date"})["content"]),
        #     u'locations': locations,
        #     u'diseases': diseases,
        #     u'syndromes': found_symp,
        #     u'countries': countries
        # })
        # print("done")

    else:
        print("ERROR ACCESSING: ", url)

def create_report(soup):
    report = {
        'event_date': "NULL",
        'locations': [],
        'diseases': [],
        'syndromes': []
    }
    report['event_date'] = soup.find("meta", attrs={'name':"webit_cover_date"})["content"]
    keywords = soup.find("meta", attrs={'name':"DC.keywords"})["content"].strip().split(", ")
    print(keywords)
    for term in keywords:
        if "[subject]" in term:
            word = term.split(" ")[0]
            if word not in report['diseases']:
                report['diseases'].append(word)
                report['syndromes'].append(word)
        elif "[country]" in term:
            word = term.split(" ")[0]
            if word not in report['locations']:
                report['locations'].append(word)

    return report
    # print(keywords)
    #print (report)

def export_json(d):
    with open('test.json', 'w', encoding='utf8') as f:
        json.dump(d, f, ensure_ascii=False, indent="\t")


# index = "https://www.who.int/csr/don/archive/year/en/"
# years = get_years(index)
# print(years[0])
# contents = get_links_in_year(years[0])
# for x in contents:
#     print(x)
#     # get_document(x)

# get_document("https://www.who.int/csr/don/20-february-2020-lassa-fever-nigeria/en/")
