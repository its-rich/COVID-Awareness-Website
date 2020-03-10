from bs4 import BeautifulSoup
import requests, re

result = requests.get("https://www.who.int/csr/don/archive/year/en/")

#print(result.status_code)
#print(result.headers)

src = result.content

soup = BeautifulSoup(src, 'html.parser')
links = []
overal = []
prefix = "https://www.who.int"
# Goes through all the years
for link in soup.findAll('a', attrs={'href': re.compile("/csr/don/archive/year/[1-2][0-9]{3}/.*")}):
    links.append(prefix + link.get('href'))

# Enter the href link to each year
for coverage in links:
    newResult = requests.get(coverage)
    src2 = newResult.content
    newSoup = BeautifulSoup(src2, 'html.parser')
    # get the href link for each report for the year and store all of it in list overal
    for reports in newSoup.findAll('a', attrs={'href': re.compile("/csr/don/[0-9]{2}.*")}):
        overal.append(prefix + reports.get('href'))
# Removes any duplication of url in this run
overal = list(dict.fromkeys(overal))

# Enter the href link to the report to extract the data required
for page in overal:
    lastResult = requests.get(page)
    src3 = lastResult.content
    lastSoup = BeautifulSoup(src3, 'html.parser')
    # Within the report get the title,date,content,disease,syndrome and location
    report = {
        'url':
        'title':
        'date':
        'content':
    }




