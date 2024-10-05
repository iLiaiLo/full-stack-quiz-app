
const QuestionData = (props) => {
  return (
    <section className='questionContainer'>
        {props.questionData.map((question,index)=>{
          return (
            <div key={index} className='questionData'>

            <h2>{question.question}</h2>
          
            <div className="answers">
            
            {question.answerOptions && question.answerOptions.map((answer,ind)=>{
              return (<button key={ind} style={{backgroundColor:answer.chosen?"lightgreen":"transparent"}} 
                onClick={()=>props.userOption(answer.answer,question.id)}>{answer.answer}</button>)
            })}
            </div>

            </div>
            )
        })[props.Index]}
        
        <button style={{display:props.displayNext?"inline-block":"none"}} onClick={props.nextQuestion}>next</button>
      
      </section>
  )
}

export default QuestionData