import React, { useEffect, useState } from 'react'

function Question({ data, quesNum, scoreArray, setScoreArray }) {

    const [clickedIndex, setClickedIndex] = useState(null)

    useEffect(() => {
        setClickedIndex(null)
    }, [quesNum])

    function handleClick(getIndex){
        setClickedIndex(getIndex)
        const scoreArrayCopy = [...scoreArray]
        if(getIndex === data.correct){
            scoreArrayCopy[quesNum] = 1
        } else {
            scoreArrayCopy[quesNum] = 0
        }
        setScoreArray(scoreArrayCopy)
    }

  return (
    <div className='px-8 pt-8 pb-12 border-b-2 border-[#E7E7E7]'>
        <h1 className='text-3xl font-bold mb-7'>{quesNum + 1}. {data.question}</h1>
        <div className='flex flex-col gap-3 text-lg font-medium'>
            {
                data.options.map((option, index) => 
                <div 
                    key={index} 
                    onClick={() => handleClick(index)} 
                    className={`${clickedIndex === data.correct && index === data.correct ? 'bg-[#D4EDDA] border-[#D4EDDA]' : clickedIndex === index && index !== data.correct ? 'bg-[#F8D7DA] border-[#F8D7DA]' : 'bg-[#F0F8FF] border-[#BDDFFE]'} cursor-pointer px-3 py-2 rounded-md border-2`}
                >{option}</div>
                )
            }
        </div>
    </div>
  )
}

export default Question