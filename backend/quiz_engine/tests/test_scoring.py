import pytest

from backend.quiz_engine.services.evaluator import EvaluationResult
from backend.quiz_engine.services.scoring import calculate_score


def test_score_without_negative_marking():
    results = [
        EvaluationResult(1, 2, 2, True),
        EvaluationResult(2, 1, 2, False),
        EvaluationResult(3, None, 2, False),
        EvaluationResult(4, 2, 2, True),
    ]

    result = calculate_score(results)

    assert result.correct_answers == 2
    assert result.incorrect_answers == 1
    assert result.unanswered == 1
    assert result.score == 2
    assert result.maximum_score == 4
    assert result.percentage == 50.0


def test_score_with_negative_marking():
    results = [
        EvaluationResult(1, 2, 2, True),
        EvaluationResult(2, 1, 2, False),
        EvaluationResult(3, 2, 2, True),
        EvaluationResult(4, 1, 2, False),
    ]

    result = calculate_score(
        results,
        marks_per_correct=2,
        negative_marks=0.5,
    )

    assert result.correct_answers == 2
    assert result.incorrect_answers == 2
    assert result.score == 3.0
    assert result.maximum_score == 8
    assert result.percentage == 37.5


def test_unanswered_questions_receive_zero():
    results = [
        EvaluationResult(1, None, 2, False),
        EvaluationResult(2, None, 1, False),
    ]

    result = calculate_score(results)

    assert result.unanswered == 2
    assert result.score == 0
    assert result.percentage == 0.0


def test_marks_per_correct_must_be_positive():
    with pytest.raises(ValueError):
        calculate_score([], marks_per_correct=0)


def test_negative_marks_cannot_be_negative():
    with pytest.raises(ValueError):
        calculate_score([], negative_marks=-1)