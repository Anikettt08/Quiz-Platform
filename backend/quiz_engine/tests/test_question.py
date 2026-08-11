import pytest

from backend.quiz_engine.question import Option, Question


def test_valid_question():
    question = Question(
        id=1,
        text="What is 2 + 2?",
        options=[
            Option(1, "3"),
            Option(2, "4", is_correct=True),
            Option(3, "5"),
            Option(4, "6"),
        ],
    )

    question.validate()


def test_question_requires_correct_option():
    question = Question(
        id=1,
        text="What is 2 + 2?",
        options=[
            Option(1, "3"),
            Option(2, "4"),
        ],
    )

    with pytest.raises(ValueError):
        question.validate()


def test_question_requires_at_least_two_options():
    question = Question(
        id=1,
        text="What is 2 + 2?",
        options=[
            Option(1, "4", is_correct=True),
        ],
    )

    with pytest.raises(ValueError):
        question.validate()