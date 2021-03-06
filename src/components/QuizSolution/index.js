import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './QuizSolution.module.scss';

function QuizSolution() {
  const {
    quizData: { data: quizDataList = [] },
  } = useSelector((state) => state.quiz);
  const { selectedAnswerByUser, userScore, maxUserScore } = useSelector(
    (state) => state.score,
  );
  const submission = useSelector((state) => state.score.submission);

  const { isPremium } = useSelector((state) => state.auth);

  if (!submission) return <Redirect to="/category" />;
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const selectedQuestionHandler = (index) => {
    setSelectedQuestionIndex(index);
  };

  const correctAnswerOption = Object.keys(
    quizDataList[selectedQuestionIndex].correct,
  )
    .find((key) => quizDataList[selectedQuestionIndex].correct[key] === 'true')
    .split('_')
    .slice(0, 2)
    .join('_');
  return (
    <div className={styles.scorePageContainer}>
      <div className={styles.questionsContainer}>
        <div className={styles.questions}>
          {quizDataList.map((question, index) => (
            <div
              role="button"
              tabIndex={0}
              className={styles.question}
              key={question.id}
              onClick={() => selectedQuestionHandler(index)}
              onKeyDown={() => selectedQuestionHandler(index)}
            >
              {`${index + 1}.`}
              <span
                className={styles.desktopOnly}
              >{` ${question.question}`}</span>
            </div>
          ))}
        </div>
        <div className={styles.questionwithOption}>
          <div
            className={styles.score}
          >{`You Scored ${userScore}/${maxUserScore}`}</div>
          {isPremium ? (
            <div className={styles.questionSolution}>
              <div className={styles.questionSolution__container}>
                {quizDataList[selectedQuestionIndex].question}
                <div
                  className={
                    correctAnswerOption ===
                    selectedAnswerByUser[selectedQuestionIndex]
                      ? styles.AnswerSelectedByUser__containerCorrect
                      : styles.AnswerSelectedByUser__containerWrong
                  }
                >
                  <div className={styles.AnswerSelectedByUser}>
                    {quizDataList[selectedQuestionIndex].answers[
                      selectedAnswerByUser[selectedQuestionIndex]
                    ] ? (
                      quizDataList[selectedQuestionIndex].answers[
                        selectedAnswerByUser[selectedQuestionIndex]
                      ]
                    ) : (
                      <span style={{ color: 'black' }}>
                        You didnot attempt this question
                      </span>
                    )}
                  </div>
                  <div className={styles.AnswerSelectedByUser__label}>
                    You Chose
                  </div>
                </div>
                <div className={styles.correctAnswer__container}>
                  <div className={styles.correctAnswer}>
                    {
                      quizDataList[selectedQuestionIndex].answers[
                        correctAnswerOption
                      ]
                    }
                  </div>
                  <div className={styles.correctAnswer__label}>
                    Correct Answer
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.questionNoSolution}>
              <div className={styles.questionNoSolution__container}>
                <div> Solutions are visible to premium members only</div>
                <div className={styles.purchasePremium}>
                  Please purchase premium membership.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizSolution;
