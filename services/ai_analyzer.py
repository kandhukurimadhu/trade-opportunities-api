from google import genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("❌ GEMINI_API_KEY not found")

client = genai.Client(api_key=api_key)


def analyze_data(sector: str, data: list):

    prompt = f"""
    Analyze the {sector} sector in India.

    Data:
    {data}

    Return STRICT JSON ONLY:

    {{
      "trends": ["...", "..."],
      "opportunities": ["...", "..."],
      "risks": ["...", "..."],
      "recommendations": ["...", "..."]
    }}

    Rules:
    - No markdown
    - No explanation
    - Only JSON
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        # 🔥 Convert to JSON safely
        return json.loads(text)

    except Exception as e:
        return {
            "trends": [],
            "opportunities": [],
            "risks": [],
            "recommendations": [f"Error: {str(e)}"]
        }