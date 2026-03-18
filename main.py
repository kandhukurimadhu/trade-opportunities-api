from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from services.data_collector import fetch_market_data
from services.ai_analyzer import analyze_data

from utils.auth import verify_token
from utils.rate_limiter import limiter
from utils.session import track_session
from utils.logger import logger


# 🚀 Initialize app
app = FastAPI(
    title="Trade Opportunities API",
    description="AI-powered market analysis using Gemini",
    version="1.0.0"
)

# 🌐 Enable CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# 🟢 HEALTH CHECK
# ==============================
@app.get("/", tags=["Health"])
def health():
    return {"status": "API is running 🚀"}


# ==============================
# 📊 ANALYZE ENDPOINT (JSON)
# ==============================
@app.get(
    "/analyze/{sector}",
    tags=["Analysis"],
    summary="Analyze sector and return structured insights"
)
async def analyze_sector(
    request: Request,
    sector: str,
    token: str = Depends(verify_token)
):
    try:
        # 🔐 Input validation
        if not sector.isalpha():
            raise HTTPException(
                status_code=400,
                detail="Sector must contain only letters"
            )

        if len(sector) < 3:
            raise HTTPException(
                status_code=400,
                detail="Sector too short"
            )

        # 🚦 Rate limiting
        limiter(token)

        # 📊 Session tracking
        track_session(token)

        logger.info(f"Analyzing sector: {sector}")

        # 🌐 Data collection
        data = fetch_market_data(sector)

        if not data:
            raise HTTPException(
                status_code=404,
                detail="No data found for this sector"
            )

        # 🤖 AI analysis (returns JSON)
        report = analyze_data(sector, data)

        return {
            "sector": sector,
            "report": report  # ✅ structured JSON
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Error in analyze_sector: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )


# ==============================
# 📥 DOWNLOAD ENDPOINT (MARKDOWN)
# ==============================
@app.get(
    "/analyze/{sector}/download",
    tags=["Download"],
    summary="Download sector analysis report as markdown file"
)
async def download_report(
    sector: str,
    token: str = Depends(verify_token)
):
    try:
        # 🔐 Input validation
        if not sector.isalpha():
            raise HTTPException(
                status_code=400,
                detail="Invalid sector"
            )

        # 🚦 Rate limiting
        limiter(token)

        # 📊 Session tracking
        track_session(token)

        logger.info(f"Downloading report for: {sector}")

        # 🌐 Data collection
        data = fetch_market_data(sector)

        if not data:
            raise HTTPException(
                status_code=404,
                detail="No data found"
            )

        # 🤖 AI analysis (JSON)
        report = analyze_data(sector, data)

        # 🔥 Convert JSON → Markdown
        if isinstance(report, dict):
            markdown = f"""
# {sector.capitalize()} Market Analysis (India)

## 📈 Trends
{chr(10).join(f"- {t}" for t in report.get("trends", []))}

## 💰 Opportunities
{chr(10).join(f"- {o}" for o in report.get("opportunities", []))}

## ⚠ Risks
{chr(10).join(f"- {r}" for r in report.get("risks", []))}

## 🎯 Recommendations
{chr(10).join(f"- {rec}" for rec in report.get("recommendations", []))}
"""
        else:
            markdown = str(report)

        return Response(
            content=markdown,
            media_type="text/markdown",
            headers={
                "Content-Disposition": f"attachment; filename={sector}_report.md"
            }
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Download error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Download failed"
        )