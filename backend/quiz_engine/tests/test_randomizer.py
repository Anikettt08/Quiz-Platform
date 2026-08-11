import pytest

from backend.quiz_engine.question import Option, Question
from backend.quiz_engine.services.randomizer import select_random_questions


def create_questions(count: int):
    questions = []

    for question_id in range(1, count + 1):
        questions.append(
            Question(
                id=question_id,
                text=f"Question {question_id}",
                options=[
                    Option(1, "A"),
                    Option(2, "B", is_correct=True),
                ],
            )
        )

    return questions


def test_select_random_questions_returns_requested_count():
    questions = create_questions(10)

    selected = select_random_questions(questions, 5)

    assert len(selected) == 5


def test_selected_questions_are_unique():
    questions = create_questions(10)

    selected = select_random_questions(questions, 10)

    ids = [question.id for question in selected]

    assert len(ids) == len(set(ids))


def test_cannot_request_more_questions_than_available():
    questions = create_questions(5)

    with pytest.raises(ValueError):
        select_random_questions(questions, 10)


def test_question_count_must_be_positive():
    questions = create_questions(5)

    with pytest.raises(ValueError):
        select_random_questions(questions, 0)