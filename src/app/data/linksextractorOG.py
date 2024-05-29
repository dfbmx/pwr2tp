from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Assuming `html_content` is your HTML string
html_content = """{}"""

def extract_links_from_html(html, base_url="https://docs.biconomy.io/"):
    soup = BeautifulSoup(html, 'html.parser')
    content_div = soup.find('div', id='content')
    links = content_div.find_all('a', href=True) if content_div else []
    all_links = {urljoin(base_url, link['href']) for link in links}
    return all_links

def save_links(links, filename="extracted_links.txt"):
    with open(filename, 'w') as f:
        for link in links:
            f.write(link + "\n")

# Replace `html_content` with your actual HTML string
links = extract_links_from_html(html_content)
save_links(links)
