import { Button, Form, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizCategories } from "../../services/quiz";
import { SelectQuizAmount } from "./SelectQuizAmount";
import { QUIZ_TYPE_OPTIONS } from "./data/quiz-type";
import { QUIZ_DIFFICULTIES_OPTIONS } from "./data/quiz-difficulty";

export const ConfigQuiz = ({ onQueryQuiz }: any) => {
  const { isLoading: isLoadingQuizCategories, data: quizCategoryOptions } =
    useQuery({
      queryKey: ["quizCategory"],
      queryFn: fetchQuizCategories,
      select: (data = {}) => {
        const { trivia_categories = [] } = data;
        return trivia_categories.map((category: any) => ({
          value: category.id,
          label: category.name,
        }));
      },
    });

  const onSubmit = (queryQuizConfigurations: any) => {
    onQueryQuiz(queryQuizConfigurations);
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <SelectQuizAmount />

        <Form.Item label="Select Category" name="category">
          <Select
            loading={isLoadingQuizCategories}
            defaultValue="Any Category"
            options={quizCategoryOptions}
          />
        </Form.Item>

        <Form.Item label="Select Difficulty" name="difficulty">
          <Select
            defaultValue="Any Difficulty"
            options={QUIZ_DIFFICULTIES_OPTIONS}
          />
        </Form.Item>

        <Form.Item label="Select type" name="type">
          <Select defaultValue="Any Type" options={QUIZ_TYPE_OPTIONS} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Generate Quizzes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
