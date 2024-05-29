import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
# import pdfkit  # Uncomment if PDF output is needed

def is_valid_url(url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)

def get_all_website_links(url):
    urls = set()
    domain_name = urlparse(url).netloc
    session = requests.Session()
    session.headers["User-Agent"] = "Mozilla/5.0"
    response = session.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    for a_tag in soup.findAll("a"):
        href = a_tag.attrs.get("href")
        if href == "" or href is None:
            continue
        href = urljoin(url, href)
        parsed_href = urlparse(href)
        href = parsed_href.scheme + "://" + parsed_href.netloc + parsed_href.path
        if not is_valid_url(href):
            continue
        if href in urls:
            continue
        if domain_name not in href:
            continue
        urls.add(href)
    return urls

def get_text_from_url(url):
    session = requests.Session()
    session.headers["User-Agent"] = "Mozilla/5.0"
    response = session.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    text = soup.get_text(separator='\n')
    return text

def save_text_to_file(text, filename):
    with open(filename, "w", encoding="utf-8") as file:
        file.write(text)

# Uncomment the next line if PDF output is needed
# def save_text_to_pdf(text, filename):
#     pdfkit.from_string(text, filename)

main_url = "https://docs.biconomy.io/"
all_links = get_all_website_links(main_url)
all_text = ""

for link in all_links:
    all_text += get_text_from_url(link) + "\n\n"

save_text_to_file(all_text, "biconomy.txt")
# Uncomment the next line if PDF output is needed
# save_text_to_pdf(all_text, "website_content.pdf")
