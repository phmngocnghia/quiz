/**
get data
load cate count based on selected
if any then return 50
else
 */

import { InputNumber } from "antd";
import { Form } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizAmount } from "../../services/quiz";
import { QUIZ_DIFFICULTIES } from "../../data";

const fieldName = "amount";

/**
 {"category_id":9,"category_question_count":{"total_question_count":300,"total_easy_question_count":118,"total_medium_question_count":123,"total_hard_question_count":59}}
 {
  "easy"
  medium
  "hard"
  total: 50
 }
 */
const MAX_QUIZ_AMOUNT = 50;

const deductQuizAmountToMaxAmount = (amount: number) =>
  amount > MAX_QUIZ_AMOUNT ? MAX_QUIZ_AMOUNT : amount;

export const SelectQuizAmount = () => {
  const [form] = Form.useForm();
  const quizCategory = Form.useWatch("category", form);

  const { isLoading: isLoadingQuizCategories, data: quizCategoryOptions } =
    useQuery({
      queryKey: ["quizAmount"],
      queryFn: () => fetchQuizAmount("9"),
      select: (data: any) => {
        const {
          total_easy_question_count = MAX_QUIZ_AMOUNT,
          total_medium_question_count = MAX_QUIZ_AMOUNT,
          total_hard_question_count = MAX_QUIZ_AMOUNT,
          total_question_count = MAX_QUIZ_AMOUNT,
        } = data?.category_question_count || {};

        return {
          [QUIZ_DIFFICULTIES.easy]: total_easy_question_count,
          [QUIZ_DIFFICULTIES.medium]: total_medium_question_count,
          [QUIZ_DIFFICULTIES.hard]: total_hard_question_count,
          [QUIZ_DIFFICULTIES.any]: total_question_count,
        };
      },
    });

  return (
    <Form.Item label="Select number of quizzes" name="amount">
      <InputNumber min={1} max={10} />
    </Form.Item>
  );
};
