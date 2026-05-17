from fastapi import APIRouter
from app.schemas.company_schema import CompanyCreate
from app.services.company_service import CompanyService

router = APIRouter()


@router.post("/")
def create_company(company: CompanyCreate):
    return CompanyService.create_company(company)


@router.get("/")
def get_companies():
    return CompanyService.get_all_companies()


@router.put("/{company_id}")
def update_company(company_id: int, company: CompanyCreate):
    return CompanyService.update_company(company_id, company)


@router.delete("/{company_id}")
def delete_company(company_id: int):
    return CompanyService.delete_company(company_id)
