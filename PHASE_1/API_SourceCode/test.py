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
        report = {
            'url': url,
            'date_of_publication': "NULL",
            'headline': "NULL",
            'main_text': "NULL",
            'reports': []
        }
        report['date_of_publication'] = soup.find("meta", attrs={'name':"DC.date.published"})["content"]
        report['headline'] = soup.find("meta", attrs={'name':"DC.title"})["content"].split("|")[1].strip()
        text = soup.find("div", attrs={'id':"primary"})
        text.find('h1', attrs={'class':"headline"}).decompose()
        text.find('p').decompose()
        report['main_text'] = text.get_text().strip()

        # keywords = soup.find("meta", attrs={'name':"DC.keywords"})["content"].strip().split(",")
        # report['disease'] = keywords[0].split()[0]
        # report['content'] =
        print(report)
        export_json(report)

    else:
        print("ERROR ACCESSING: ", url)

def export_json(d):
    with open('test.json', 'w') as f:
        json.dump(d, f, ensure_ascii=False, indent="\t")


# index = "https://www.who.int/csr/don/archive/year/en/"
# years = get_years(index)
# print(years[0])
# contents = get_links_in_year(years[0])
# for x in contents:
#     print(x)
get_document("https://www.who.int/csr/don/1998_09_21/en/")