# Application Core Constants

# Maximum possible health score
MAX_HEALTH_SCORE = 100
MIN_HEALTH_SCORE = 0

# Score weighting coefficients (must sum to 1.0)
WEIGHT_CONDITION = 0.40
WEIGHT_AGE = 0.30
WEIGHT_FREQUENCY = 0.30

# Recommendation boundary thresholds
RETIRE_THRESHOLD = 50

# Condition qualitative to quantitative score maps
CONDITION_EXCELLENT_SCORE = 100
CONDITION_GOOD_SCORE = 80
CONDITION_FAIR_SCORE = 60
CONDITION_POOR_SCORE = 30

CONDITION_SCORE_MAP = {
    "Excellent": CONDITION_EXCELLENT_SCORE,
    "Good": CONDITION_GOOD_SCORE,
    "Fair": CONDITION_FAIR_SCORE,
    "Poor": CONDITION_POOR_SCORE,
}

# Generic Age Brackets in months (0-2 years, 3-5 years, 6-8 years, 8+ years)
AGE_BRACKET_EXCELLENT_LIMIT = 24  # <= 2 years
AGE_BRACKET_GOOD_LIMIT = 60       # <= 5 years
AGE_BRACKET_AVERAGE_LIMIT = 96    # <= 8 years

AGE_SCORE_EXCELLENT = 100
AGE_SCORE_GOOD = 80
AGE_SCORE_AVERAGE = 50
AGE_SCORE_OLD = 20

# Failure frequency constraints
MAX_FAILURES_THRESHOLD = 5
FREQUENCY_SCORE_MIN = 0
FREQUENCY_SCORE_MAX = 100
