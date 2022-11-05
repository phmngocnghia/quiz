import { Fetcher, opentdbFetcher } from "./fetcher";

/**
getQuizCategories
https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
 */

export const fetchQuizCategories = () =>
  opentdbFetcher.query("/api_category.php").catch((error) => {
    console.error(error);

    return {
      trivia_categories: [],
    };
  });

/**
getQuizOptions
https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
 */
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
