import pytest
from app.schemas import AIRequestSchema
from app.services.rule_engine import RuleEngine
from app.core.constants import RETIRE_THRESHOLD
from app.services.maintenance_service import MaintenanceInsightsService


def test_excellent_condition_asset() -> None:
    """Verifies that a new asset in excellent condition gets high score and Repair."""
    payload = AIRequestSchema(
        asset={
            "id": 1,
            "asset_tag": "AST-HVAC-99",
            "name": "New AC Unit",
            "category": "HVAC",
            "age": 0,
            "condition": "Excellent",
        },
        maintenance_history=[],
    )
    engine = RuleEngine()
    recommendation, health_score, reason = engine.evaluate_asset(payload)
    assert health_score == 100
    assert recommendation == "REPAIR"
    assert "healthy baseline" in reason


def test_poor_condition_asset() -> None:
    """Verifies that a degraded asset (poor condition, old age, failures) triggers Retire."""
    payload = AIRequestSchema(
        asset={
            "id": 2,
            "asset_tag": "AST-IT-12",
            "name": "Old Laptop",
            "category": "IT",
            "age": 98,  # > 8 years (Old: 20)
            "condition": "Poor",  # Poor: 30
        },
        maintenance_history=[
            {"date": "2026-01-01", "issue": "Failure 1", "status": "Resolved"},
            {"date": "2026-02-01", "issue": "Failure 2", "status": "Resolved"},
            {"date": "2026-03-01", "issue": "Failure 3", "status": "Resolved"},
            {"date": "2026-04-01", "issue": "Failure 4", "status": "Resolved"},
        ],  # 4 failures out of 5 max (s_freq = 20)
    )
    engine = RuleEngine()
    recommendation, health_score, reason = engine.evaluate_asset(payload)
    # HS = 0.4*30 + 0.3*20 + 0.3*20 = 12 + 6 + 6 = 24
    assert health_score == 24
    assert health_score < RETIRE_THRESHOLD
    assert recommendation == "RETIRE"
    assert "physical state" in reason or "age" in reason or "repair" in reason


def test_old_asset_degradation() -> None:
    """Verifies that advanced age reduces the health score."""
    payload_new = AIRequestSchema(
        asset={
            "id": 3,
            "asset_tag": "AST-V-01",
            "name": "Truck",
            "category": "Vehicle",
            "age": 2,
            "condition": "Good",
        },
        maintenance_history=[],
    )
    payload_old = AIRequestSchema(
        asset={
            "id": 4,
            "asset_tag": "AST-V-02",
            "name": "Old Truck",
            "category": "Vehicle",
            "age": 99,  # > 8 years (Old: 20)
            "condition": "Good",
        },
        maintenance_history=[],
    )
    engine = RuleEngine()
    _, score_new, _ = engine.evaluate_asset(payload_new)
    _, score_old, _ = engine.evaluate_asset(payload_old)
    assert score_old < score_new


def test_heavy_maintenance_history() -> None:
    """Verifies failure frequency penalizes the score."""
    payload_none = AIRequestSchema(
        asset={
            "id": 5,
            "asset_tag": "AST-C-01",
            "name": "Conveyor",
            "category": "Conveyor",
            "age": 10,
            "condition": "Good",
        },
        maintenance_history=[],
    )
    payload_heavy = AIRequestSchema(
        asset={
            "id": 6,
            "asset_tag": "AST-C-02",
            "name": "Broken Conveyor",
            "category": "Conveyor",
            "age": 10,
            "condition": "Good",
        },
        maintenance_history=[
            {"date": "2026-01-01", "issue": "Failure 1", "status": "Resolved"},
            {"date": "2026-02-01", "issue": "Failure 2", "status": "Resolved"},
            {"date": "2026-03-01", "issue": "Failure 3", "status": "Resolved"},
            {"date": "2026-04-01", "issue": "Failure 4", "status": "Resolved"},
        ],
    )
    engine = RuleEngine()
    _, score_none, _ = engine.evaluate_asset(payload_none)
    _, score_heavy, _ = engine.evaluate_asset(payload_heavy)
    assert score_heavy < score_none


def test_boundary_scores() -> None:
    """Checks rule decisions precisely at and adjacent to the threshold boundary."""
    engine = RuleEngine()

    # Case 1: HS = 51 >= 50 -> Repair
    # s_cond: 60 (Fair), s_age: 50 (6-8 years, e.g. 72 months), s_freq: 40 (3 failures -> 100*(1-3/5)=40)
    # HS = 0.4*60 + 0.3*50 + 0.3*40 = 24 + 15 + 12 = 51
    payload_repair = AIRequestSchema(
        asset={
            "id": 7,
            "asset_tag": "AST-C-01",
            "name": "Asset Boundary Repair",
            "category": "Conveyor",
            "age": 72,
            "condition": "Fair",
        },
        maintenance_history=[
            {"date": "2026-01-01", "issue": "Failure 1", "status": "Resolved"},
            {"date": "2026-02-01", "issue": "Failure 2", "status": "Resolved"},
            {"date": "2026-03-01", "issue": "Failure 3", "status": "Resolved"},
        ],
    )
    recommendation, score, _ = engine.evaluate_asset(payload_repair)
    assert score == 51
    assert recommendation == "REPAIR"

    # Case 2: HS = 48 < 50 -> Retire
    # s_cond: 30 (Poor), s_age: 80 (3-5 years, e.g. 36 months), s_freq: 40 (3 failures)
    # HS = 0.4*30 + 0.3*80 + 0.3*40 = 12 + 24 + 12 = 48
    payload_retire = AIRequestSchema(
        asset={
            "id": 8,
            "asset_tag": "AST-C-02",
            "name": "Asset Boundary Retire",
            "category": "Conveyor",
            "age": 36,
            "condition": "Poor",
        },
        maintenance_history=[
            {"date": "2026-01-01", "issue": "Failure 1", "status": "Resolved"},
            {"date": "2026-02-01", "issue": "Failure 2", "status": "Resolved"},
            {"date": "2026-03-01", "issue": "Failure 3", "status": "Resolved"},
        ],
    )
    recommendation, score, _ = engine.evaluate_asset(payload_retire)
    assert score == 48
    assert recommendation == "RETIRE"


@pytest.mark.anyio
async def test_rule_engine_exception_fallback() -> None:
    """Verifies that service layer catches engine exceptions and yields safe fallback."""
    payload = AIRequestSchema(
        asset={
            "id": 10,
            "asset_tag": "AST-01",
            "name": "Faulty",
            "category": "HVAC",
            "age": 10,
            "condition": "Excellent",
        },
        maintenance_history=[],
    )
    service = MaintenanceInsightsService()

    # Force the rule engine to raise an exception when evaluated
    def raise_error(p):
        raise ValueError("Inference logic corrupted")

    service.rule_engine.evaluate_asset = raise_error

    response = await service.get_insights(payload)
    assert response.recommendation == "REPAIR"
    assert response.asset_health == 50
    assert "temporarily unavailable" in response.reason
