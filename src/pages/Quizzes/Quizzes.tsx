import { useQuery } from "@tanstack/react-query";
import { Radio, Checkbox, Alert, Empty } from "antd";
import { Pagination } from "antd";
import { useState } from "preact/hooks";
import { fetchQuizzes } from "../../services/quiz";
import { Spin } from "antd";

const plainOptions = ["Apple", "Pear", "Orange"];

export const Quizzes = ({ fetchQuizConfigurations }: any) => {
  const {
    isLoading: isLoadingQuizzes,
    data: quizzes,
    error,
  } = useQuery({
    queryKey: ["fetchQuizzes"],
    queryFn: () => fetchQuizzes(fetchQuizConfigurations),
    select: (data: any = {}) => {
      const { results = [] } = data;
      return results.map((result: any) => ({
        ...result,
        answers: [...result.incorrect_answers, result.correct_answer],
      }));
    },
  });
  console.log({ isLoadingQuizzes });

  const [viewedQuizNumbr, viewQuizNumber] = useState(1);

  const onChangeViewedQuizNumber = (quizNumber: number) => {
    viewQuizNumber(quizNumber);
  };

  let quiz = null;

  if (isLoadingQuizzes) {
    return <Spin />;
  }

  const viewedQuiz = quizzes?.[viewedQuizNumbr];

  if (!viewedQuiz) {
    return <Empty />;
  }

  if (viewedQuiz.type === "boolean") {
    quiz = (
      <div>
        <h2>The HTML5 standard was published in 2014.</h2>;
        <Checkbox.Group options={viewedQuiz.answerers} value={[]} />
      </div>
    );
  } else {
    quiz = (
      <div>
        <h2>The HTML5 standard was published in 2014.</h2>;
        <Radio.Group>
          <Radio value={1}>True</Radio>
          <Radio value={2}>False</Radio>
        </Radio.Group>
      </div>
    );
  }

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
    <>
      <Pagination
        onChange={onChangeViewedQuizNumber}
        defaultCurrent={1}
        total={quizzes.length}
      />
      {quiz}
    </>
  );
};
