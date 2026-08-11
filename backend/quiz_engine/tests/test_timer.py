from datetime import datetime, timedelta

import pytest

from backend.quiz_engine.services.timer import QuizTimer


def test_timer_calculates_expiration_time():
    start = datetime(2026, 8, 11, 14, 0, 0)

    timer = QuizTimer(
        duration_seconds=1800,
        started_at=start,
    )

    assert timer.expires_at == datetime(2026, 8, 11, 14, 30, 0)


def test_timer_returns_remaining_seconds():
    start = datetime(2026, 8, 11, 14, 0, 0)

    timer = QuizTimer(
        duration_seconds=1800,
        started_at=start,
    )

    current_time = start + timedelta(minutes=10)

    assert timer.remaining_seconds(current_time) == 1200


def test_timer_returns_zero_after_expiration():
    start = datetime(2026, 8, 11, 14, 0, 0)

    timer = QuizTimer(
        duration_seconds=1800,
        started_at=start,
    )

    current_time = start + timedelta(minutes=40)

    assert timer.remaining_seconds(current_time) == 0


def test_timer_detects_expiration():
    start = datetime(2026, 8, 11, 14, 0, 0)

    timer = QuizTimer(
        duration_seconds=1800,
        started_at=start,
    )

    current_time = start + timedelta(minutes=31)

    assert timer.is_expired(current_time) is True


def test_timer_is_not_expired_before_deadline():
    start = datetime(2026, 8, 11, 14, 0, 0)

    timer = QuizTimer(
        duration_seconds=1800,
        started_at=start,
    )

    current_time = start + timedelta(minutes=10)

    assert timer.is_expired(current_time) is False


def test_timer_requires_positive_duration():
    start = datetime(2026, 8, 11, 14, 0, 0)

    with pytest.raises(ValueError):
        QuizTimer(
            duration_seconds=0,
            started_at=start,
        )