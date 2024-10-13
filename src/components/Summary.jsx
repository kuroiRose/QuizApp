import QuizCompleteImage from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }){
    const skippedAnswers = userAnswers.filter((ans) => ans === null);
    const correctAnswers = userAnswers.filter((ans, index) => ans === QUESTIONS[index].answers[0]);

    const percentSkipped = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const percentCorrect = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const percentWrong = 100 - percentCorrect - percentSkipped;

    return (
        <div id="summary">
            <img src={QuizCompleteImage} alt="Trophy Image" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{percentSkipped}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{percentCorrect}%</span>
                    <span className="text">Answered Correctly</span>
                </p>
                <p>
                    <span className="number">{percentWrong}%</span>
                    <span className="text">Answered Incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((ans, index) => {
                    let cssClass = 'user-answer';
                    if(ans === null){
                        cssClass += ' skipped';
                    } else if(ans === QUESTIONS[index].answers[0]){
                        cssClass += ' correct';
                    } else{
                        cssClass += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>Q{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{ans ?? 'SKIPPED!!!'}</p>
                        </li>
                    )
                })}
                
            </ol>
        </div>
    )
}