import React, { useEffect, useState } from 'react'
import Question from './Question'
import quizData from '../data.js'

function Quiz() {

    const duration = 15
    const [quesNum, setQuesNum] = useState(0)
    const [scoreArray, setScoreArray] = useState(Array(quizData.length).fill(0))
    const [timer, setTimer] = useState(duration)

    function nextQues(){
        if(quesNum < quizData.length - 1){
            setQuesNum(quesNum + 1)
        } else {
            setQuesNum(0)
            setScoreArray(Array(quizData.length).fill(0))
        }
    }

    useEffect(() => {
        
        setTimer(duration)
        let timeLeft = duration - 1
        
        const timeInterval = setInterval(() => {
            if(timeLeft === 0){
                clearInterval(timeInterval)
                setTimer("00")
                if(quesNum < quizData.length - 1){
                    nextQues()
                }
            } else {
                if(timeLeft < 10){
                    setTimer(`0${timeLeft}`)
                } else {
                    setTimer(timeLeft)
                }
                timeLeft--
            }
        }, 1000)

        return () => clearInterval(timeInterval)

    }, [quesNum])

    function calcScore(){
        return scoreArray.reduce((acc, currVal) => acc + currVal, 0)
    }

    return (
        <div className='bg-white rounded-md w-2/3 shadow-lg'>
            <div className='py-3 px-8 shadow-md'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-3xl font-extralight uppercase tracking-widest'>Harry Potter Quiz</h2>
                    <div className='flex items-center gap-2 bg-[#CCE5FF] p-2 rounded-md text-xl '>
                        <h3 className='text-[#1764b6]'>Time Left</h3>
                        <div className='bg-[#343A40] px-3 py-0.5 text-white rounded-md'>
                            <h3>{timer}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Question data={quizData[quesNum]} quesNum={quesNum} scoreArray={scoreArray} setScoreArray={setScoreArray} />
            <div className='flex justify-between items-center px-8 py-3 text-xl'>
                <h3 className='font-medium'>Score: {calcScore()}/{quizData.length}</h3>
                <button onClick={nextQues} className='px-4 py-2 rounded-md bg-[#007BFF] text-white'>{quesNum < quizData.length - 1 ? 'Next Que' : 'Start Again'}</button>
            </div>
        </div>
    )
}

export default Quiz