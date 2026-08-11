from dataclasses import dataclass
from typing import List


@dataclass
class Option:
    id: int
    text: str
    is_correct: bool = False


@dataclass
class Question:
    id: int
    text: str
    options: List[Option]
    category_id: int | None = None

    def validate(self) -> None:
        if not self.text.strip():
            raise ValueError("Question text cannot be empty.")

        if len(self.options) < 2:
            raise ValueError("A question must have at least 2 options.")

        correct_options = [
            option for option in self.options
            if option.is_correct
        ]

        if len(correct_options) != 1:
            raise ValueError(
                "A question must have exactly one correct option."
            )