import pytest

from backend.quiz_engine.question import Option, Question
from backend.quiz_engine.quiz import Quiz


def create_question(question_id: int) -> Question:
    return Question(
        id=question_id,
        text=f"Question {question_id}",
        options=[
            Option(1, "Option A"),
            Option(2, "Option B", is_correct=True),
        ],
    )


def test_add_question():
    quiz = Quiz(id=1, title="Python Basics")

    quiz.add_question(create_question(1))

    assert quiz.get_question_count() == 1


def test_cannot_add_duplicate_question():
    quiz = Quiz(id=1, title="Python Basics")
    question = create_question(1)

    quiz.add_question(question)

    with pytest.raises(ValueError):
        quiz.add_question(question)


def test_remove_question():
    quiz = Quiz(id=1, title="Python Basics")
    quiz.add_question(create_question(1))

    quiz.remove_question(1)

    assert quiz.get_question_count() == 0


def test_remove_missing_question():
    quiz = Quiz(id=1, title="Python Basics")

    with pytest.raises(ValueError):
        quiz.remove_question(999)