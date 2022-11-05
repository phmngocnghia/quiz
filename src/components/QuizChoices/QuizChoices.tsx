import { Radio } from "antd";

import { radioErrorStyles } from "./QuizChoices.module.scss";

type QuizChoicesProps = {
  value: string;
  correctAnswer: string;
  answers: string[];
  isReavealResult: boolean;
  onChange: any;
};

export const QuizChoices = ({
  value,
  onChange,
  answers,
  correctAnswer,
  isReavealResult,
}: QuizChoicesProps) => {
  if (isReavealResult) {
    return (
      <div>
        {answers.map((answer) => {
          const isChecked = answer === value || answer === correctAnswer;
          const isWrongAnswer = isChecked && answer !== correctAnswer;

          return (
            <Radio
              checked={isChecked}
              className={isWrongAnswer && radioErrorStyles}
              key={answer}
              value={answer}
            >
              {answer}
            </Radio>
          );
        })}
      </div>
    );
  }

  return (
    <Radio.Group value={value} onChange={onChange}>
      {answers.map((answer) => (
        <Radio key={answer} value={answer}>
          {answer}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export const QuizTrueFalseChoics = (props) => (
  <QuizChoices {...props} answers={[true, false]} />
);
