import requests
from bs4 import BeautifulSoup

# List of URLs to extract text from
urls =  [
    "https://docs.biconomy.io/supportedNetworks",
"https://docs.biconomy.io/FAQ",
"https://docs.biconomy.io/audits",
"https://docs.biconomy.io/audits",
"https://docs.biconomy.io/contracts",
"https://docs.biconomy.io/category/troubleshooting",
"https://docs.biconomy.io/dashboard",
"https://docs.biconomy.io/modules",
"https://docs.biconomy.io/gas-estimations",
"https://docs.biconomy.io/bundler",
"https://docs.biconomy.io/paymaster",
"https://docs.biconomy.io/account",
"https://docs.biconomy.io/tutorials",
"https://docs.biconomy.io/quickstart",
"https://docs.biconomy.io/tutorials",
"https://docs.biconomy.io/Bundler/integration",
"https://docs.biconomy.io/Bundler/bundlermethods",
"https://docs.biconomy.io/Bundler/api/",
"https://docs.biconomy.io/GasEstimations/integration",
"https://docs.biconomy.io/GasEstimations/methods",
"https://docs.biconomy.io/Modules/ecdsa",
"https://docs.biconomy.io/Modules/multichain",
"https://docs.biconomy.io/Modules/sessionvalidationmodule",
"https://docs.biconomy.io/Modules/BatchedSession",
"https://docs.biconomy.io/Modules/abiSessionValidationModule",
"https://docs.biconomy.io/dashboard/paymaster",
"https://docs.biconomy.io/dashboard/paymasterRules",
"https://docs.biconomy.io/dashboard/spendingLimits",
"https://docs.biconomy.io/dashboard/organization",
"https://docs.biconomy.io/dashboard/apis",
"https://docs.biconomy.io/troubleshooting/commonerrors",
"https://docs.biconomy.io/troubleshooting/polyfill"
]
def fetch_text(url):
    """Fetches text content from a given URL"""
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()
        
        # Get text
        text = soup.get_text(separator='\n')
        
        # Break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # Break multi-headlines into a line each
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # Drop blank lines
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        return text
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return ""

def save_text_to_file(filename, text):
    """Saves text to a given filename"""
    with open(filename, "a", encoding="utf-8") as file:
        file.write(text + "\n\n")

for url in urls:
    text = fetch_text(url)
    if text:
        save_text_to_file("all_site_contentbicomy.txt", text)
