from bs4 import BeautifulSoup
from urllib.parse import urljoin
import requests
from tqdm import tqdm

def fetch_html(url):
    response = requests.get(url)
    return response.content

def extract_links_from_html(html, base_url):
    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', href=True)
    all_links = {urljoin(base_url, link['href']) for link in links}
    return all_links

def crawl_site(start_url):
    to_visit = {start_url}
    visited = set()
    all_links = set()

    with tqdm(total=1, desc="Crawling") as pbar:
        while to_visit:
            current_url = to_visit.pop()
            if current_url in visited:
                continue

            visited.add(current_url)
            html = fetch_html(current_url)
            links = extract_links_from_html(html, start_url)
            
            new_links = links - visited
            to_visit.update(new_links)
            all_links.update(links)

            # Update progress bar
            pbar.update(1)
            pbar.total = len(visited) + len(to_visit)
    
    return all_links

def save_links(links, filename="extracted_links.txt"):
    with open(filename, 'w') as f:
        for link in links:
            f.write(link + "\n")

# Starting URL
start_url = "https://docs.biconomy.io/"

# Extract and save the links
links = crawl_site(start_url)
save_links(links)
