import logging
from typing import Tuple
from app.schemas import AIRequestSchema
from app.core.constants import (
    WEIGHT_CONDITION,
    WEIGHT_AGE,
    WEIGHT_FREQUENCY,
    CONDITION_SCORE_MAP,
    AGE_BRACKET_EXCELLENT_LIMIT,
    AGE_BRACKET_GOOD_LIMIT,
    AGE_BRACKET_AVERAGE_LIMIT,
    AGE_SCORE_EXCELLENT,
    AGE_SCORE_GOOD,
    AGE_SCORE_AVERAGE,
    AGE_SCORE_OLD,
    MAX_FAILURES_THRESHOLD,
    FREQUENCY_SCORE_MIN,
    FREQUENCY_SCORE_MAX,
    RETIRE_THRESHOLD,
    MAX_HEALTH_SCORE,
    MIN_HEALTH_SCORE,
)

logger = logging.getLogger(__name__)


class RuleEngine:
    """Deterministic, rule-based inference engine to evaluate asset status."""

    def evaluate_asset(self, payload: AIRequestSchema) -> Tuple[str, int, str]:
        """Calculates asset health, determines recommendation, and generates a reason.

        Returns:
            Tuple[str, int, str]: (recommendation, asset_health, reason)
        """
        logger.info("Rule Engine evaluation started.")

        asset = payload.asset
        history = payload.maintenance_history

        # Step 1: Calculate sub-scores
        s_cond = self._calculate_condition_score(asset.condition)
        s_age = self._calculate_age_score(asset.age)
        s_freq = self._calculate_frequency_score(len(history))

        # Step 2: Compute weighted health score
        health_score = int(
            round(
                (WEIGHT_CONDITION * s_cond)
                + (WEIGHT_AGE * s_age)
                + (WEIGHT_FREQUENCY * s_freq)
            )
        )
        health_score = max(MIN_HEALTH_SCORE, min(MAX_HEALTH_SCORE, health_score))
        logger.info(
            f"Health Score calculated: {health_score} (Cond: {s_cond}, Age: {s_age}, Freq: {s_freq})"
        )

        # Step 3: Determine recommendation based on threshold
        recommendation = "REPAIR" if health_score >= RETIRE_THRESHOLD else "RETIRE"
        logger.info(f"Recommendation generated: {recommendation}")

        # Step 4: Generate reason based on the dominant degradation component
        reason = self._generate_reason(
            recommendation=recommendation,
            health_score=health_score,
            condition=asset.condition,
            age=asset.age,
            failures=len(history),
            s_cond=s_cond,
            s_age=s_age,
            s_freq=s_freq,
        )

        logger.info("Rule Engine evaluation completed successfully.")
        return recommendation, health_score, reason

    def _calculate_condition_score(self, condition: str) -> int:
        """Maps physical condition literals to numerical scores."""
        return CONDITION_SCORE_MAP.get(condition, CONDITION_SCORE_MAP["Fair"])

    def _calculate_age_score(self, age: int) -> int:
        """Calculates age score based on generic age brackets in months."""
        if age <= AGE_BRACKET_EXCELLENT_LIMIT:
            return AGE_SCORE_EXCELLENT
        elif age <= AGE_BRACKET_GOOD_LIMIT:
            return AGE_SCORE_GOOD
        elif age <= AGE_BRACKET_AVERAGE_LIMIT:
            return AGE_SCORE_AVERAGE
        return AGE_SCORE_OLD

    def _calculate_frequency_score(self, failures: int) -> int:
        """Penalizes health score based on historical breakdown frequency."""
        if MAX_FAILURES_THRESHOLD <= 0:
            return FREQUENCY_SCORE_MIN
        score = int(
            round(FREQUENCY_SCORE_MAX * (1.0 - (failures / MAX_FAILURES_THRESHOLD)))
        )
        return max(FREQUENCY_SCORE_MIN, min(FREQUENCY_SCORE_MAX, score))

    def _generate_reason(
        self,
        recommendation: str,
        health_score: int,
        condition: str,
        age: int,
        failures: int,
        s_cond: int,
        s_age: int,
        s_freq: int,
    ) -> str:
        """Determines the dominant penalty component and constructs a natural reason."""
        # Find which component contributed the heaviest deduction from maximum (100)
        deductions = {
            "condition": MAX_HEALTH_SCORE - s_cond,
            "age": MAX_HEALTH_SCORE - s_age,
            "frequency": MAX_HEALTH_SCORE - s_freq,
        }
        dominant_factor = max(deductions, key=deductions.get)

        if recommendation == "RETIRE":
            if dominant_factor == "condition" and deductions["condition"] > 0:
                return (
                    f"Retirement recommended as the physical state of the asset is rated as '{condition}', "
                    "making repairs ineffective."
                )
            elif dominant_factor == "age" and deductions["age"] > 0:
                return (
                    f"Retirement recommended because the asset age ({age} months) has exceeded or is close "
                    "to its useful life limit."
                )
            elif dominant_factor == "frequency" and deductions["frequency"] > 0:
                return (
                    f"Retirement recommended due to excessive repair frequency, with {failures} breakdowns logged."
                )
            return (
                f"Retirement recommended. Critical degradation (Health Score: {health_score}%) "
                "across condition and lifetime parameters."
            )
        else:
            if health_score >= 75:
                return (
                    f"Repair recommended. The asset maintains a healthy baseline score of {health_score}% "
                    "with stable failure intervals."
                )
            else:
                if dominant_factor == "condition" and deductions["condition"] > 0:
                    return (
                        f"Repair recommended. The asset exhibits wear (condition: '{condition}') but remains "
                        "viable under normal maintenance."
                    )
                elif dominant_factor == "age" and deductions["age"] > 0:
                    return (
                        f"Repair recommended. Although the asset age ({age} months) is significant, it remains "
                        "functional and viable for service."
                    )
                return (
                    f"Repair recommended despite moderate degradation (Health Score: {health_score}%) "
                    "with manageable failure intervals."
                )
