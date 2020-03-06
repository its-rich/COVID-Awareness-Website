from bs4 import BeautifulSoup
import requests, re

result = requests.get("https://www.who.int/csr/don/archive/year/en/")

#print(result.status_code)
#print(result.headers)

src = result.content

soup = BeautifulSoup(src, 'html.parser')
links = []
prefix = "https://www.who.int/"
end = 0

for link in soup.findAll('a', attrs={'href': re.compile("/csr/don/archive/year/[1-2][0-9]{3}/.*")}):
    links.append(prefix + link.get('href'))
    end = end + 1
print(links)

counter = 0
for counter in  range(end):
    newResult = requests.get(links[0])
    print(newResult)
#for year in links:
 #   print(year)
  #  print("\n")


