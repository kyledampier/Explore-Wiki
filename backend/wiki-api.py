import wikipedia
import re
from flask import Flask
import json
app = Flask(__name__)

def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/search/<keyword>')
def search_keyword(keyword):
    # show the user profile for that user
    return json.dumps(wikipedia.search(keyword))

@app.route('/links/<title>')
def get_page_links(title):
    page = wikipedia.page(title)
    links = page.links
    categories = page.categories
    pages = dict()
    print(len(links), len(categories))
    for cat in categories:
        try:
            tempLink = wikipedia.page(cat).links
            numInCommon = 0
            for l in tempLink:
                if (l in links):
                    numInCommon += 1
            pages[cat] = numInCommon
            print(cat, numInCommon)
        except:
            print("Failed: " + link)

    return json.dumps(pages)