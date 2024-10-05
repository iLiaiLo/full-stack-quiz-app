const Result = (props) => {
  return (
    <section className="resultContainer">

        <h1>Your score is {props.result()}/7</h1>

        <section className="see_restart">
        <button onClick={props.startAgain}>start again</button>
        <button onClick={props.getResult}>{props.seeResult?"hide result":"show result"}</button>
        </section>

        {props.seeResult && <section>

          {props.questionData.map((question,index)=>{

            return (
            <div key={index} className="ResultData">
              <h3>{question.question}</h3>
              <section className="choosedAnswers">
                {question.answerOptions.map((ans,ind)=>{
                  if(ans.isCorrect){
                    return (<button key={ind} style={{backgroundColor:"lightgreen"}}>{ans.answer}</button>)
                  }
                  else if(ans.chosen && !ans.isCorrect ){
                    return (<button key={ind} style={{backgroundColor:"tomato"}}>{ans.answer}</button>)
                  }
                  return (<button key={ind}>{ans.answer}</button>)
                })}
              </section>
            </div>)
          })}
        </section>
        }
      </section>
  )
}

export default Result