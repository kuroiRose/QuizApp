import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }){
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((ans) => {
                const isSelected = selectedAnswer === ans;
                let cssClasses = '';

                if(answerState === 'answered' && isSelected){
                    cssClasses = 'selected';
                }
                if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                    cssClasses = answerState;
                }
                return <li key={ans} className="answer">
                    <button className={cssClasses} onClick={() => onSelect(ans)} disabled={answerState!==''}>{ans}</button>
                </li>
            })}
        </ul>
    )
}