from datetime import date
from typing import Optional

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.export_service import ExportService

router = APIRouter()


@router.get("/")
def export_report(from_date: Optional[date] = None, to_date: Optional[date] = None):
    output = ExportService.export_company_orders(from_date, to_date)
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=coffee_report.xlsx"},
    )
