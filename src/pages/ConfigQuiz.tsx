// form
// category, difficulty, question type and amount
// loading cate, questions

import { Form, Select } from "antd";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchQuizCategories } from "../services/quiz";

/**
onSubmit
   fetch data -> transform
   redirect Quizes
   fetch
    render
    error
    any
 */

export const ConfigQuiz = () => {
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

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => {}}
        autoComplete="off"
      >
        <Form.Item label="Question category" name="category">
          <Select
            loading={isLoadingQuizCategories}
            defaultValue="lucy"
            options={quizCategoryOptions}
          />
        </Form.Item>
      </Form>
    </>
  );
};
