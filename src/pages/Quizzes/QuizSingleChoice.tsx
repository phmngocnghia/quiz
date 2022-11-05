import { Radio } from "antd";

/**

contetnt

form 

form item key

state
answer


optional state

answer

group

checked both

write red

color red

no answer no group
.ant-radio-checked red
..ant-radio-checked .ant-radio-inner
import css

 */
import { radioErrorStyles } from "./QuizSingleChoice.module.scss";

export const QuizChoices = ({
  value,
  onChange,
  answers,
  correctAnswer,
  isReavealResult,
}) => {
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
