from dataclasses import dataclass

from backend.quiz_engine.services.evaluator import EvaluationResult


@dataclass
class ScoreResult:
    correct_answers: int
    incorrect_answers: int
    unanswered: int
    score: float
    maximum_score: float
    percentage: float


def calculate_score(
    results: list[EvaluationResult],
    marks_per_correct: float = 1.0,
    negative_marks: float = 0.0,
) -> ScoreResult:
    if marks_per_correct <= 0:
        raise ValueError("Marks per correct answer must be greater than zero.")

    if negative_marks < 0:
        raise ValueError("Negative marks cannot be less than zero.")

    correct_answers = 0
    incorrect_answers = 0
    unanswered = 0

    for result in results:
        if result.selected_option_id is None:
            unanswered += 1
        elif result.is_correct:
            correct_answers += 1
        else:
            incorrect_answers += 1

    score = (
        correct_answers * marks_per_correct
        - incorrect_answers * negative_marks
    )

    maximum_score = len(results) * marks_per_correct

    percentage = (
        (score / maximum_score) * 100
        if maximum_score > 0
        else 0.0
    )

    return ScoreResult(
        correct_answers=correct_answers,
        incorrect_answers=incorrect_answers,
        unanswered=unanswered,
        score=score,
        maximum_score=maximum_score,
        percentage=percentage,
    )