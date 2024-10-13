import { useState } from 'react';
import Timer from './Timer.jsx';
import Answers from './Answers.jsx';

import QUESTIONS from '../questions.js';

export default function Question({ index, onSelectAnswer, onSkipAnswer }){
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

    let timer = 15000;
    if(answer.selectedAnswer){
        timer = 1000;
    }
    if(answer.isCorrect !== null){
        timer = 2000;
    }

    function handleSelectAnswer(ans){
        setAnswer({
            selectedAnswer: ans,
            isCorrect: null,
        });
        setTimeout(() => {
            setAnswer({
                selectedAnswer: ans,
                isCorrect: QUESTIONS[index].answers[0] === ans,
            });
            setTimeout(() => {
                onSelectAnswer(ans);
            },2000);
        }, 1000);
    }

    let answerState = '';
    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer){
        answerState = 'answered';
    }

    return (
        <div id="question">
            <Timer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} 
            mode={answerState} />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers answers={QUESTIONS[index].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
        </div>
    )
}