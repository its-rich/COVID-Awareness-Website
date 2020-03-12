import urllib.request
from bs4 import BeautifulSoup

def get_years(url):
    #req = urllib.request.Request(url)
    sourcecode = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(sourcecode, "html.parser")
    results = []
    
    # for href in soup.find("div", class_="col_2-1_1").find_all("li"):
    for href in soup.find("ul", class_="list").find_all("li"):
        #print("https://www.who.int" + href.find("a")["href"])
        results.append("https://www.who.int" + href.find("a")["href"])
    
    return results

def get_links(url):
    #req = urllib.request.Request(url)
    sourcecode = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(sourcecode, "html.parser")
    results = []
    
    # for href in soup.find("div", class_="col_2-1_1").find_all("li"):
    for href in soup.find("ul", class_="auto_archive").find_all("li"):
        #print("https://www.who.int" + href.find("a")["href"])
        results.append("https://www.who.int" + href.find("a")["href"])
    
    return results
    
index = "https://www.who.int/csr/don/archive/year/en/"
years = get_years(index)
print(years[0])
contents = get_links(years[0])
for x in contents:
    print(x)