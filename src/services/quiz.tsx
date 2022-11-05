import { Fetcher, opentdbFetcher } from "./fetcher";

export const fetchQuizCategories = () =>
  opentdbFetcher.query("/api_category.php").catch((error) => {
    console.error(error);

    return {
      trivia_categories: [],
    };
  });

export const fetchQuizAmount = (categoryId: string) =>
  opentdbFetcher
    .query(`/api_count.php?category=${categoryId}`)
    .catch((error) => {
      console.error(error);

      return {
        category_question_count: {
          total_easy_question_count: 50,
          total_hard_question_count: 50,
          total_medium_question_count: 50,
          total_question_count: 50,
        },
      };
    });

export const fetchQuizzes = (
  fetchQuizzesParams: {
    amount?: string;
    category?: string;
    difficulty?: string;
  } = {}
) => {
  const urlParams = new URLSearchParams();

  Object.entries(fetchQuizzesParams).map(([key, val]) => {
    if (val) urlParams.append(key, val);
  });

  if (!fetchQuizzesParams.amount) {
    urlParams.append("amount", "50");
  }

  return opentdbFetcher.query(`/api.php?${urlParams.toString()}`);
};
