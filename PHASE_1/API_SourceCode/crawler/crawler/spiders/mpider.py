import scrapy

class Mpider(scrapy.Spider):
    name = "quotes"
    start_url = [
        #"https://www.who.int/csr/don/archive/year/en/"
        'http://quotes.toscrape.com/page/1/',
        'http://quotes.toscrape.com/page/2/',
    ]

    def parse(self, response):
        print(response.url)
        """
        for selector in response.css("div.col_2-1_1 li"):
            print(selector)
            yield {
                #'link': selector.css('a::attr(href)').extract()
                'link': selector.css('a::text').extract()
            }
        """




