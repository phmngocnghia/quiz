import { containerStyles } from "./Quizzes.module.scss";
import { useQuery } from "@tanstack/react-query";
import { Radio, Checkbox, Alert, Empty, Button } from "antd";
import { Pagination, Form } from "antd";
import { useEffect, useRef, useState } from "preact/hooks";
import { fetchQuizzes } from "../../services/quiz";
import { Spin } from "antd";
import {
  QuizChoices,
  QuizTrueFalseChoics,
} from "../../components/QuizChoices/QuizChoices";
import dayjsDuration from "dayjs/plugin/duration";
import dayjs, { duration } from "dayjs";
import { useCountCorrectAnswer } from "./hooks/useCheckCorrectAnswerNumber";
import { TimerCountDown } from "../../components/TimerCountDown";

dayjs.extend(dayjsDuration);

export const Quizzes = ({ fetchQuizConfigurations }: any) => {
  const { duration, restFetchQuizConfigurations } = fetchQuizConfigurations;
  console.log({ duration });

  const {
    isLoading: isLoadingQuizzes,
    data: quizzes,
    error,
  } = useQuery({
    queryKey: [],
    queryFn: () => fetchQuizzes(restFetchQuizConfigurations),
    select: (data: any = {}) => {
      const { results = [] } = data;
      return results.map((result: any) => ({
        question: result.question,
        type: result.type,
        answers: [...result.incorrect_answers, result.correct_answer],
        correctAnswer: result.correct_answer,
      }));
    },
  });

  const [form] = Form.useForm();

  const [viewedQuizNumber, viewQuizNumber] = useState(1);
  const [isRevealResult, viewAnswers] = useState<boolean>();

  if (isLoadingQuizzes) {
    return <Spin />;
  }

  const viewedQuiz = quizzes?.[viewedQuizNumber];

  if (!viewedQuiz) {
    return <Empty />;
  }

  const { correctAnswerCount, countCorrectAnswer } = useCountCorrectAnswer();

  const checkResults = (answers: Record<number, string>) => {
    countCorrectAnswer(answers, quizzes);
    viewAnswers(true);
  };

  const tryAgain = () => {
    viewAnswers(false);
    form.resetFields();
  };

  if (error) {
    return (
      <Alert
        message="Something went wrong when loading quizzes."
        description="Please try again later, or contact custom support"
        type="error"
      />
    );
  }

  return (
    <div class={containerStyles}>
      <TimerCountDown duration={duration} />
      <Pagination
        onChange={viewQuizNumber}
        defaultCurrent={1}
        total={quizzes.length}
        defaultPageSize={1}
        className="mb-6 mt-6"
      />
      <Form layout="vertical" onFinish={checkResults}>
        <Form.Item
          labelAlign="right"
          className="flex flex-col"
          label={viewedQuiz.question}
          name={"test" + viewedQuizNumber}
        >
          {viewedQuiz.type === "multiple" && (
            <QuizChoices {...viewedQuiz} isReavealResult={isRevealResult} />
          )}
          {viewedQuiz.type === "single" && (
            <QuizTrueFalseChoics
              {...viewedQuiz}
              isReavealResult={isRevealResult}
            />
          )}
        </Form.Item>

        {isRevealResult && (
          <div class="mb-3">
            Answer correctly {correctAnswerCount} / {quizzes.length}
          </div>
        )}

        {!isRevealResult && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Check results
            </Button>
          </Form.Item>
        )}

        {isRevealResult && (
          <Form.Item>
            <Button onClick={tryAgain} htmlType="submit">
              Try again
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
