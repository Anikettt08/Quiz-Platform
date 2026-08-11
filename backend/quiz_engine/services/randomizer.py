import random
from typing import List

from backend.quiz_engine.question import Question


def select_random_questions(
    questions: List[Question],
    count: int,
) -> List[Question]:
    if count <= 0:
        raise ValueError("Question count must be greater than zero.")

    if count > len(questions):
        raise ValueError(
            "Requested question count cannot exceed available questions."
        )

    return random.sample(questions, count)