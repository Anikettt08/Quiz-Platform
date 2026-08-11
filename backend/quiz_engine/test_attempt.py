from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Optional

from backend.quiz_engine.question import Question
from backend.quiz_engine.services.evaluator import (
    EvaluationResult,
    evaluate_answers,
)
from backend.quiz_engine.services.scoring import (
    ScoreResult,
    calculate_score,
)
from backend.quiz_engine.services.timer import QuizTimer


@dataclass
class TestAttempt:
    id: int
    questions: list[Question]
    started_at: datetime
    duration_seconds: int

    answers: Dict[int, Optional[int]] = field(default_factory=dict)
    submitted: bool = False

    def __post_init__(self):
        self.timer = QuizTimer(
            duration_seconds=self.duration_seconds,
            started_at=self.started_at,
        )

    def submit_answer(
        self,
        question_id: int,
        option_id: Optional[int],
    ) -> None:
        if self.submitted:
            raise ValueError("Test has already been submitted.")

        if self.timer.is_expired(datetime.now()):
            raise ValueError("Test time has expired.")

        question_ids = {
            question.id for question in self.questions
        }

        if question_id not in question_ids:
            raise ValueError("Question does not belong to this test.")

        self.answers[question_id] = option_id

    def submit(self) -> list[EvaluationResult]:
        if self.submitted:
            raise ValueError("Test has already been submitted.")

        self.submitted = True

        return evaluate_answers(
            self.questions,
            self.answers,
        )

    def calculate_final_score(
        self,
        results: list[EvaluationResult],
        marks_per_correct: float = 1.0,
        negative_marks: float = 0.0,
    ) -> ScoreResult:
        return calculate_score(
            results,
            marks_per_correct=marks_per_correct,
            negative_marks=negative_marks,
        )
        