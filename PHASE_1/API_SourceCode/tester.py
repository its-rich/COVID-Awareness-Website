from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
url = 'https://www.who.int/csr/don/archive/year/en/'
req = Request(url , headers={'User-Agent': 'Mozilla/5.0'})

webpage = urlopen(req).read()
page_soup = soup(webpage, "html.parser")
title = page_soup.find("title")
print(title)
links = []
overal = []
prefix = "https://www.who.int"
#print(soup.contents.find('title'))
# Goes through all the years
for link in soup.findAll('a', attrs={'href': re.compile("/csr/don/archive/year/[0-9]{4}/.*")}):
    links.append(prefix + link.get('href'))