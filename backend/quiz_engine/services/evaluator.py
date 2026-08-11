from dataclasses import dataclass
from typing import Dict, Optional

from backend.quiz_engine.question import Question


@dataclass
class EvaluationResult:
    question_id: int
    selected_option_id: Optional[int]
    correct_option_id: int
    is_correct: bool


def evaluate_answer(
    question: Question,
    selected_option_id: Optional[int],
) -> EvaluationResult:
    correct_options = [
        option for option in question.options
        if option.is_correct
    ]

    if len(correct_options) != 1:
        raise ValueError(
            "Question must have exactly one correct option."
        )

    correct_option = correct_options[0]

    return EvaluationResult(
        question_id=question.id,
        selected_option_id=selected_option_id,
        correct_option_id=correct_option.id,
        is_correct=(
            selected_option_id == correct_option.id
        ),
    )


def evaluate_answers(
    questions: list[Question],
    answers: Dict[int, Optional[int]],
) -> list[EvaluationResult]:
    results = []

    for question in questions:
        selected_option_id = answers.get(question.id)

        results.append(
            evaluate_answer(
                question,
                selected_option_id,
            )
        )

    return results