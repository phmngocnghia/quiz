import { useState } from "preact/hooks";

export const useCountCorrectAnswer = () => {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const countCorrectAnswer = (answers, quizzes) => {
    const correctAnswerCount = quizzes.reduce(
      (correctAnswerCount, quiz, quizIndex) => {
        if (quiz.correctAnswer === answers[quizIndex]) {
          return correctAnswerCount + 1;
        }

        return correctAnswerCount;
      },
      0
    );
    setCorrectAnswerCount(correctAnswerCount);
  };

  return {
    correctAnswerCount,
    countCorrectAnswer,
  };
};
