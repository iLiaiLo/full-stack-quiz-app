import {  useState } from 'react'
import QuestionData from './questionData';
import Result from './Result';
import Start from './Start';
import './App.css'

function App() {
 
  const [displayNext,setDisplayNext]=useState(false);
  const [questionData,setQuestionData]=useState({data:[],loading:true});
  const [start,setStart]=useState(false);
  const [Index,setIndex]=useState(0);
  const [seeResult,setSeeResult]=useState(false);

  const result=()=>{
    if(questionData.data){
    return questionData.data.reduce((acc,curr)=>acc+curr.score,0)
    }
  }

  function userOption(answer,id){
    const UpdateQuestions=questionData.data.map((que)=>{
      if(que.id===id){
        que.answerOptions.map((ans)=>{
          if(ans.answer===answer){
            ans.chosen=true;

            if(ans.isCorrect){
              que.score=1;
            }
            else{
              que.score=0;
            }
          }
          else{
            ans.chosen=false;
          }
          return ans
        })
        
      }
      return que

    })

    setQuestionData({data:UpdateQuestions,loading:false})
    setDisplayNext(true)

  }

  function nextQuestion(){
    setIndex(p=>p+1);
    setDisplayNext(false);
    if(Index===questionData.data.length-1){
      try{
        fetch('http://localhost:5000/answers',{
        method:"POST",
        body:JSON.stringify({"quiz result":result(),date:`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}),
        headers:{
          "Content-type":"application/json"
        }
      })
      }
      catch(e){
        console.log(e)
      }
    }
  }

  function getResult(){
    setSeeResult(prew=>!prew)
  }

  function startAgain(){
    setStart(false);
    setIndex(0);
    setQuestionData({data:[],loading:true});
    setSeeResult(false);
  }
  function startQuiz(){
    setStart(true)
    fetch('http://localhost:5000/questions')
    .then(res=>res.json())
    .then(Data=>setQuestionData({data:Data,loading:false}))
    .catch(e=>console.log(e))
    
  }

  function DisplayQuizContent(){
    if(start && questionData.data && !questionData.loading){

      if(Index<questionData.data.length){
        return <QuestionData questionData={questionData.data} userOption={userOption}
        Index={Index}  displayNext={displayNext} nextQuestion={nextQuestion}/>
      }
      else{
        return <Result result={result} getResult={getResult}
        startAgain={startAgain} seeResult={seeResult} questionData={questionData.data} />
      }
    }
    else{
      return <Start startQuiz={startQuiz} />
    }
  }



  return (
    <>
     <DisplayQuizContent />
    </>
  )
}

export default App
