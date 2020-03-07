
import scrapy

class QuotesSpider(scrapy.Spider):
    name = "spider"
    start_urls = [
        'https://www.who.int/csr/don/archive/year/en/'
    ]

    def parse(self, response):
        # first check for contents within the page
        primary = response.css("#primary")
        # check the date of publishment
        date_of_content = response.css("head meta").re_first(r"[0-9]{4}-[0-9]{2}-[0-9]{2} .*[0-9]{2}")
        if primary is not None:
                header = primary.css("h1.headline::text").get()
                content = primary.css("p span::text").getall()
                yield {
                    'url': response.request.url,
                    'header': header,
                    'date': date_of_content,
                    'content': content,
                }
        # goes through all the years of reports
        for selector in response.css("div.col_2-1_1 li"):
            next_year = selector.css('a::attr(href)').get()
            if next_year is not None:
                next_year = response.urljoin(next_year)
                yield scrapy.Request(next_year, callback=self.parse)