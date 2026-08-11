from dataclasses import dataclass, field
from typing import List

from backend.quiz_engine.question import Question


@dataclass
class Quiz:
    id: int
    title: str
    questions: List[Question] = field(default_factory=list)

    def add_question(self, question: Question) -> None:
        if any(existing.id == question.id for existing in self.questions):
            raise ValueError("Question already exists in this quiz.")

        self.questions.append(question)

    def remove_question(self, question_id: int) -> None:
        for question in self.questions:
            if question.id == question_id:
                self.questions.remove(question)
                return

        raise ValueError("Question not found in this quiz.")

    def get_question_count(self) -> int:
        return len(self.questions)