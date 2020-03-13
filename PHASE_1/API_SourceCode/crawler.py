import requests
from bs4 import BeautifulSoup
import json

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
        article = {
            'url': url,
            'date_of_publication': "NULL",
            'headline': "NULL",
            'main_text': "NULL",
            'reports': []
        }
        article['date_of_publication'] = soup.find("meta", attrs={'name':"webit_cover_date"})["content"]
        article['headline'] = soup.find("meta", attrs={'name':"DC.title"})["content"].split("|")[1].strip()
        text = soup.find("div", attrs={'id':"primary"})
        text.find('h1', attrs={'class':"headline"}).decompose()
        text.find('p').decompose()
        article['main_text'] = text.get_text().strip()

        article['reports'] = create_report(soup)
        #print(article)
        export_json(article)

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