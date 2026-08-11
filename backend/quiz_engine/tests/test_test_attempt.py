from datetime import datetime, timedelta

import pytest

from backend.quiz_engine.question import Option, Question
from backend.quiz_engine.test_attempt import TestAttempt


def create_question(question_id: int) -> Question:
    return Question(
        id=question_id,
        text=f"Question {question_id}",
        options=[
            Option(1, "A"),
            Option(2, "B", is_correct=True),
        ],
    )


def create_attempt() -> TestAttempt:
    start = datetime.now()

    return TestAttempt(
        id=1,
        questions=[
            create_question(1),
            create_question(2),
        ],
        started_at=start,
        duration_seconds=1800,
    )


def test_submit_answer():
    attempt = create_attempt()

    attempt.submit_answer(1, 2)

    assert attempt.answers[1] == 2


def test_cannot_answer_question_not_in_test():
    attempt = create_attempt()

    with pytest.raises(ValueError):
        attempt.submit_answer(999, 2)


def test_submit_test_evaluates_answers():
    attempt = create_attempt()

    attempt.submit_answer(1, 2)
    attempt.submit_answer(2, 1)

    results = attempt.submit()

    assert len(results) == 2
    assert results[0].is_correct is True
    assert results[1].is_correct is False


def test_cannot_submit_twice():
    attempt = create_attempt()

    attempt.submit()

    with pytest.raises(ValueError):
        attempt.submit()


def test_cannot_answer_after_submission():
    attempt = create_attempt()

    attempt.submit()

    with pytest.raises(ValueError):
        attempt.submit_answer(1, 2)


def test_final_score():
    attempt = create_attempt()

    attempt.submit_answer(1, 2)
    attempt.submit_answer(2, 1)

    results = attempt.submit()

    score = attempt.calculate_final_score(results)

    assert score.correct_answers == 1
    assert score.incorrect_answers == 1
    assert score.score == 1
    assert score.maximum_score == 2
    assert score.percentage == 50.0