export const QUIZ_DIFFICULTIES = {
  any: "any",
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

export const QUIZ_DIFFICULTIES_OPTIONS = Object.values(QUIZ_DIFFICULTIES).map(
  (difficulty) => ({
    name: difficulty,
    value: difficulty,
  })
);
