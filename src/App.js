import logo from './logo.svg';
import './App.css';
import data from './Data';
import { useEffect, useState } from 'react';
import { Button, Rating } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Grid from '@mui/material/Grid';
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import Timer from './components/Timer';
function App() {
  let[indexNumber , setIndexNumber] = useState(0)
  let[progress , setProgress] = useState(40)
  let[currentQuestion , setCurrentQuestion] = useState()
  let[mistake , setMistake] = useState(false)
  let[correct , setCorrect] = useState(false)
  let[allOptions, setAllOptions] = useState([])
  let[showResultButton , setShowResultButton] = useState(false)
  let[score , setScore] = useState(0)
  let[correctOption , setCorrectOption] = useState("")
  let[obtainedPer , setObtainedPer] = useState()
  let[maxPer , setMaxPer] = useState(100)
  let[minPer , setMinPer] = useState(0)
  let[attemptedQuestions , setAttemptedQuestions] = useState(0)
  let[attemptedPer , setAttemptedPer] = useState(0)
  let[totalQuestions , setTotalQuestions] = useState()
  let[currentPer , setCurrentPer] = useState(0)
  let[selectedOption , setSelectedOption] = useState("")
  let[isAttempt , setIsAttempt] = useState(false)
  let[showResult , setShowResult] = useState(false)
  let[startQuiz , setStartQuiz] = useState(true)
  let[showQuiz , setShowQuiz] = useState(false)
  let[stopTimer , setStopTimer] = useState(false)
  // let[isChecked , setIsChecked] = useState(false)
  let[value , setValue] = useState(0)
  let [questions,setQuestions]= useState([
    {
        question : "What is our country name?",
        correct_answer: "Pakistan",
        incorrect_answers: ["China","America","India"],
        difficulty: "hard",
    },
    {
        question : "What is our national language?",
        correct_answer: "Urdu" ,
        incorrect_answers: ["Chinese","English","Punjabi"],
        difficulty: "medium",
 
    },
    {
        question : "Allama Iqbal is our national _________",
        correct_answer: "Poet" ,
        incorrect_answers: ["Writer","Singer","Actor"],
        difficulty: "easy",
    },  {
      question : "What is our national language?",
      correct_answer: "Urdu" ,
      incorrect_answers: ["Chinese","English","Punjabi"],
      difficulty: "medium",

  }, {
    question : "What is our country name?",
    correct_answer: "Pakistan",
    incorrect_answers: ["China","America","India"],
    difficulty: "hard",
}
    ])
  const data = [
    { val : 100 , 
      color:"lightgrey" ,
    },
    {
      val: `${maxPer}`,
      color: 'green',
   
    },
    {
      val: `${attemptedPer}`,
      color: 'yellow',
  
    },
    {
      val: `${currentPer}`,
      color: "orange",
    
    },
    {
      val: `${minPer}`,
      color: 'red'
    }
  ]
    let reArrangeOptions = ()=>{
      setAllOptions([...questions[indexNumber].incorrect_answers , questions[indexNumber].correct_answer].sort())
      setCorrectOption(questions[indexNumber].correct_answer)
      setCurrentQuestion(indexNumber + 1)
      setTotalQuestions(questions.length)
      setProgress(indexNumber*100/questions.length)
     
    }
    let difficulty = ()=>{
      if(questions[indexNumber].difficulty=="hard"){
        setValue(3)
      }else if(questions[indexNumber].difficulty=="medium"){
        setValue(2)
      }else{
          setValue(1)
      }
    
    }
    let nextQuestion=()=>{
      setSelectedOption()
       if(indexNumber + 1 == questions.length){
         setCorrect(false)
         setMistake(false)
       }else{
         setIndexNumber(indexNumber + 1)
        //  setIsChecked(false)
         setCorrect(false)
         setMistake(false)
       }
       setMinPer(score * 100 / totalQuestions)
       setCurrentPer(score * 100 / attemptedQuestions)
       setMaxPer((score + (totalQuestions- attemptedQuestions)) * 100 / totalQuestions)
       setAttemptedPer(attemptedQuestions * 100 / totalQuestions)
       setIsAttempt(false)
       setStopTimer(false)
    }
    let checkAnswer = (selectedOption)=>{
      setStopTimer(true)
      setSelectedOption(selectedOption)
      setIsAttempt(true)
      setAttemptedQuestions(attemptedQuestions + 1)
      if(selectedOption ==correctOption){
        setScore(score + 1);
        setCorrect(true)
       }else{
        setMistake(true)
       }
       if(indexNumber + 1 == questions.length){
        setShowResultButton(true)
       }
    }
    let check = (x)=>{
    if(isAttempt && questions[indexNumber].correct_answer== x ){
      return " greenButton"
    }else if(isAttempt && selectedOption==x && questions[indexNumber].correct_answer!=selectedOption){
      return " redButton"
    }else if(isAttempt){
  return  " diabledButton"
    }
   
    }
     let showQuizResult= ()=>{
      setMinPer(score * 100 / totalQuestions)
      setCurrentPer(score * 100 / attemptedQuestions)
      setMaxPer((score + (totalQuestions- attemptedQuestions)) * 100 / totalQuestions)
      setAttemptedPer(attemptedQuestions * 100 / totalQuestions)
      setShowResult(true)
      setShowQuiz(false)
    }
    let start= ()=>{
     setStartQuiz(false)
     setShowQuiz(true)
    }
    useEffect(()=>{
     reArrangeOptions()
     difficulty()
    },[indexNumber])
  
  return (
    <div className='parent'>
    {startQuiz? <div className='main' style={{display:"flex" , alignItems: "center" , justifyContent: "center"}}>
    <img onClick={start} src={img5}></img>
   </div>:null}


   {showQuiz?<div className='main'>
    <div className='progressBar' style={{width: `${progress}%`}}></div>

    <div style={{fontSize: "14px" , marginTop:"40px" , marginLeft:"25px" , color:"grey"}}>Entertainment Board Games</div>

    <div style={{position:"relative"}}>
    <span style={{fontSize: "30px",fontWeight:"bold" , marginLeft:"25px"}}>Question {currentQuestion} of {questions.length}</span>
    <span style={{position:"absolute" , right:"20px", top:"10px" , display:"flex"}}>
    <AccessAlarmsIcon size={10}/>
    <Timer stopTimer={stopTimer} func={checkAnswer}/> 
    </span>
    </div>

    <Rating
    style={{ marginLeft:"25px"}}
    readOnly={true}
    max={3}
    value={value}
    />
    <div  style={{ marginBottom:"10px", marginTop:"25px" , marginLeft:"25px", fontSize: "25px"}}>{questions[indexNumber].question}</div>

     <Grid sx={{padding:"30px"}} container spacing={2}>
    {allOptions.map((e,i)=>{
     return<Grid item xs={12}  sm={12} lg={6} xl={6}><div  className={'option ' + check(e)} onClick={()=>checkAnswer(e)} key={i}>{e}</div></Grid>
    })}
    </Grid>
    {mistake?<div className='false'>Sorry!</div>:null}
    {correct?<div className='true'>Correct!</div>:null}
    {isAttempt  && indexNumber + 1 != questions.length? <div style={{display:"flex" , alignItems: "center" , justifyContent: "center"}}>
    <div className='btn' onClick={nextQuestion}>Next Question</div>
   </div>:null}
   {showResultButton? <div style={{display:"flex" , alignItems: "center" , justifyContent: "center"}}>
    <div className='btn' onClick={showQuizResult} >Show Result</div>
   </div>:null}
   
    <div style={{display : "flex" ,flexDirection:"row",marginLeft :"25px",marginRight :"25px" , justifyContent:"space-between"}}>
     <span>Score : {Math.round(currentPer)}%</span>
     <span>Max Score : {Math.round(maxPer)}%</span>
     </div>
     <div style={{ width: '38vw', height: '50px', position: 'relative', marginLeft:"25px" }} >
        {data.map((x, i) => <div key={i} style={{ backgroundColor: `${x.color}`, width: `${x.val}%`, height: '20px' }} className='resultProgress' ></div>)}
      </div>
    </div>:null}


    {showResult?<div className='main'>
     {maxPer>= 80? <div className='position'> <img src={img2}></img><h1>Congratulations!</h1><p>You have attemped {attemptedQuestions } questions<br/>Your Score is {score}<br/>Your percentege is {maxPer}</p> </div> : maxPer<= 80 && maxPer >= 40? <div className='position'> <img src={img4}></img><h1>Passed!</h1><p>You have attemped {attemptedQuestions } questions<br/>Your Score is {score}<br/>Your percentege is {maxPer}</p> </div>:maxPer<= 40? <div className='passed'> <img src={img3}></img><h1>Failed!</h1><p>You have attemped {attemptedQuestions } questions<br/>Your Score is {score}<br/>Your percentege is {maxPer}</p> </div>:null}
    </div>:null} 
    
    </div>
  );
}

export default App;
