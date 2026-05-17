ADMIN_EMAIL = "admin@brewhub.com"
ADMIN_PASSWORD = "admin123"

class AdminService:

    @staticmethod
    def login_admin(admin_data):
        if admin_data.email == ADMIN_EMAIL and admin_data.password == ADMIN_PASSWORD:
            return {"id": 1, "email": ADMIN_EMAIL, "name": "Admin"}
        return None