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
