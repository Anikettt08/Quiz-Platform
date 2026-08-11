from backend.quiz_engine.question import Option, Question
from backend.quiz_engine.services.evaluator import (
    evaluate_answer,
    evaluate_answers,
)


def create_question(question_id: int = 1) -> Question:
    return Question(
        id=question_id,
        text="What is 2 + 2?",
        options=[
            Option(1, "3"),
            Option(2, "4", is_correct=True),
            Option(3, "5"),
            Option(4, "6"),
        ],
    )


def test_correct_answer():
    question = create_question()

    result = evaluate_answer(question, 2)

    assert result.is_correct is True
    assert result.selected_option_id == 2
    assert result.correct_option_id == 2


def test_incorrect_answer():
    question = create_question()

    result = evaluate_answer(question, 1)

    assert result.is_correct is False
    assert result.selected_option_id == 1
    assert result.correct_option_id == 2


def test_unanswered_question():
    question = create_question()

    result = evaluate_answer(question, None)

    assert result.is_correct is False
    assert result.selected_option_id is None


def test_evaluate_multiple_answers():
    questions = [
        create_question(1),
        create_question(2),
    ]

    answers = {
        1: 2,
        2: 1,
    }

    results = evaluate_answers(questions, answers)

    assert len(results) == 2
    assert results[0].is_correct is True
    assert results[1].is_correct is False