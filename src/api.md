api

get
https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple

handle
Code 0: Success Returned results successfully.
Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
Code 3: Token Not Found Session Token does not exist.
Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.

category
https://opentdb.com/api_category.php

difficult
easy|medium|hard

type
multil choice|.

User story: Users should be able to select category, difficulty, question type and amount of questions.

submit answers

cliet side

question

answers

correct_answer
incorrect_answers

fetch,
https://opentdb.com/api_category.php

questions,
https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE

features

ant design
react query

loading
error
form
request

quiz

get data

- format in react query:type

number of quest ant design
paginate, prev..next

question
answer

router

create quiz
request
cate
questions
duration

api query

get

answer quiz

paginate 1/2

quizes
viewedQuizNumber
answersByQuiznumber
showResult

quiz
question
options
answer
showResult

show result
quiz answer: right/wrong

     quiz
       types
       difficult

api query
