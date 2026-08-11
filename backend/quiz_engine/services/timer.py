from datetime import datetime, timedelta


class QuizTimer:
    def __init__(self, duration_seconds: int, started_at: datetime):
        if duration_seconds <= 0:
            raise ValueError("Duration must be greater than zero.")

        self.duration_seconds = duration_seconds
        self.started_at = started_at

    @property
    def expires_at(self) -> datetime:
        return self.started_at + timedelta(seconds=self.duration_seconds)

    def remaining_seconds(self, current_time: datetime) -> int:
        remaining = (self.expires_at - current_time).total_seconds()

        return max(0, int(remaining))

    def is_expired(self, current_time: datetime) -> bool:
        return current_time >= self.expires_at