import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

client = TestClient(app)


class TestAPIEndpoints:
    """Tests for FastAPI endpoints"""

    def test_root(self):
        """Root endpoint should return OK"""
        response = client.get("/")
        assert response.status_code == 200

    def test_list_schemas(self):
        """Should list available schemas"""
        response = client.get("/api/v1/schemas")
        # May return empty list if no schemas directory
        assert response.status_code in [200, 404]

    def test_generate_nonexistent_schema(self):
        """Should return 404 for nonexistent schema"""
        response = client.post(
            "/api/v1/generate",
            json={"schema_name": "nonexistent_schema_xyz", "rows": 100},
        )
        assert response.status_code == 404

    def test_health_check(self):
        """Health check endpoint if exists"""
        response = client.get("/health")
        # May or may not exist
        assert response.status_code in [200, 404]


class TestAPIModels:
    """Tests for API request/response models"""

    def test_generation_request_validation(self):
        """Should validate generation request"""
        # Missing required field
        response = client.post("/api/v1/generate", json={})
        assert response.status_code == 422  # Validation error

    def test_generation_request_with_seed(self):
        """Should accept seed parameter"""
        response = client.post(
            "/api/v1/generate",
            json={"schema_name": "cie10", "rows": 100, "seed": 42},
        )
        # May fail if schema doesn't exist, but should not be validation error
        assert response.status_code != 422
