import pytest
import sys
import os

# Add app to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@pytest.fixture
def sample_patient_ids():
    """Fixture providing sample patient IDs for testing"""
    return [f"PAT-{i:06d}" for i in range(100)]


@pytest.fixture
def sample_diseases():
    """Fixture providing sample disease codes"""
    return ["J09", "A00", "B05", "E11.9", "I10"]
