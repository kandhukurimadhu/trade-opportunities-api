import requests

def fetch_market_data(sector: str):
    query = f"{sector} industry India market trends news"

    url = "https://api.duckduckgo.com/"
    params = {
        "q": query,
        "format": "json"
    }

    try:
        res = requests.get(url, params=params, timeout=5)
        data = res.json()

        results = []

        # ✅ Extract related topics (REAL DATA)
        for item in data.get("RelatedTopics", []):
            if isinstance(item, dict):
                if "Text" in item:
                    results.append(item["Text"])
                elif "Topics" in item:
                    for sub in item["Topics"]:
                        if "Text" in sub:
                            results.append(sub["Text"])

        # ✅ Fallback if empty
        if not results:
            results.append(f"No strong data found for {sector}, using general trends")

        return results[:8]  # limit results

    except Exception as e:
        return [f"Error fetching data: {str(e)}"]