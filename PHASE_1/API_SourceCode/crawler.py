import requests
from bs4 import BeautifulSoup
import json
from google.cloud import firestore

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
        #     if s.lower() in main_text.lower():
        #         found_symp.append(s)
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
        # for l in loc:
        #     if l.split(', ')[0] in main_text:
        #         found_loc.append(l)
        #
        # locations = []
        #
        # keywords = soup.find("meta", attrs={'name':"DC.keywords"})["content"].strip().split(", ")
        # for term in keywords:
        #     if "[country]" in term:
        #         word = term.split(" ")[0]
        #         if word not in found_loc:
        #             found_loc.append('_' + word)
        #
        # for l in found_loc:
        #     temp = {
        #         u'country': u'{}'.format(l.split('_')[1]),
        #         u'location': u'{}'.format(l.split('_')[0])
        #     }
        #     locations.append(temp)
        #

        # diseases to fix
        # Different names for 1 diseases should only have 1 name show up

        # all_diseases = [ "Anthrax cutaneous", "Anthrax gastrointestinous", "Anthrax inhalation",
        #             "Botulism", "Brucellosis", "Chikungunya", "Cholera", "Cryptococcosis", "Cryptosporidiosis",
        #             "Crimean-congo haemorrhagic fever", "Dengue", "Diphteria", "Ebola haemorrhagic Fever", "ebola virus", "Ehec",
        #             "E.coli", "Enterovirus 71 infection", "Influenza a/h5n1", "h5n1", "Influenza a/h7n9", "h7n9",
        #             "Influenza a/h9n2", "h9n2", "Influenza a/h1n1", "h1n1", "Influenza a/h1n2", "h1n2", "Influenza a/h3n5",
        #             "h3n5", "Influenza a/h3n2", "h3n2", "Influenza a/h2n2", "h2n2", "hand, foot and mouth disease",
        #             "Hand disease", "Foot disease", "Mouth disease", "Hantavirus", "hepatitis a", "hepatitis b",
        #             "hepatitis c", "hepatitis d", "hepatitis e", "histoplasmosis", "hiv/aids", "hiv", "aids", "lassa fever",
        #             "malaria", "marburg virus disease", "measles", "mers-cov", "mumps", "nipah virus", "norovirus infection",
        #             "pertussis", "plague", "pneumococcus pneumonia", "poliomyelitis", "q fever", "rabies", "rift valley fever",
        #             "rotavirus infection", "rubella", "salmonellosis", "sars", "shigellosis", "smallpox", "staphylococcal enterotoxin b",
        #             "thypoid fever", "tuberculosis", "tularemia", "vaccinia and cowpox", "vaccinia", "cowpox", "varicella",
        #             "west nile virus", "yellow fever", "yersiniosis", "zika", "legionares", "listeriosis", "monkeypox", "2019-nCoV",
        #             "COVID-19", "coronavirus"]
        # "Unknown", "Other",

        # diseases = []
        #
        # for d in all_diseases:
        #     if d.lower() in main_text.lower():
        #         diseases.append(d)

        #
        # ref = db.collection(u'reports').document(u'{}'.format(headline))
        # ref.set({
        #     u'url': u'{}'.format(url),
        #     u'date_of_publication': u'{}'.format(date),
        #     u'headline': u'{}'.format(headline),
        #     u'main_text': u'{}'.format(main_text),
        #     u'event_date': u'{}'.format(soup.find("meta", attrs={'name':"webit_cover_date"})["content"]),
        #     u'locations': locations,
        #     u'diseases': diseases,
        #     u'syndromes': u'{}'.format(found_symp)
        # })
        print("done")

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
get_document("https://www.who.int/csr/don/17-january-2020-novel-coronavirus-japan-ex-china/en/")
