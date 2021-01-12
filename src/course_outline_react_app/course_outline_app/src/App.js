import "bulma/css/bulma.css";
import React, { useEffect } from 'react';
import { useState } from "react";
import { Button } from '@material-ui/core';

const LearningOutcomeTableComponent = () => {
  return (
    <table className="table is-striped is-hoverable" id="learningOutcomesTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Learning Outcome</th>
        </tr>
      </thead>
      <tbody>
        <tr>

        </tr>
      </tbody>
    </table>
  );
};

const GradeBreakdownTableComponent = () => {
  return (
    <table className="table is-striped is-hoverable" id="gradeBreakdownTable">
      <thead>
        <tr>
          <th>Grading Component</th>
          <th>Learning Outcome(s) Evaluated</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th><input className="input" type="text" placeholder="Assignment/Exam/Project" id="newGradeCompName" />  </th>
          <td><input className="input" type="text" placeholder="Learning Outcome *" id="newGradeLOutcome" />  </td>
          <td><input className="input" type="text" placeholder="Percentage" id="newGradeCompWeight" />  </td>
        </tr>
      </tbody>
    </table>
  );
};


const LearningOutcomesComponent = () => {
  function addLearningOutcomeClickHandler(){
    let table = document.getElementById('learningOutcomesTable');
    let ID = table.rows.length-1;
    let text = document.getElementById('newLearningOutcome');
    if(text.value !== ''){
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = ID;
      cell2.innerHTML = text.value;
      text.value = '';
    }
  }

  function deleteLearningOutcomeClickHandler(){
    let table = document.getElementById('learningOutcomesTable');
    let ID = table.rows.length - 2;
    if(ID > 0){
      document.getElementById('learningOutcomesTable').getElementsByTagName('tbody')[0].deleteRow(ID)
    }
  }

  return (
    <div>
      <h1 className="title">Learning Outcomes</h1>  
      <input className="input" type="text" placeholder="Learning Outcome *" id="newLearningOutcome" />  
      <Button variant="contained" color="primary" onClick={addLearningOutcomeClickHandler}>Add learning Outcome</Button>
      <Button variant="contained" color="secondary" onClick={deleteLearningOutcomeClickHandler}>Delete Learning Outcome</Button>
      <LearningOutcomeTableComponent />  
    </div>
  );
};

const GradeBreakdownComponent = () => {
  let tWeight = 0; //total weight

  function addButtonClickHandler(){
    let table = document.getElementById('gradeBreakdownTable').getElementsByTagName('tbody')[0];
    // let ID = table.rows.length - 1;
    let compName = document.getElementById('newGradeCompName')
    let compLOutcome = document.getElementById('newGradeLOutcome')
    let compWeight = document.getElementById('newGradeCompWeight')

    // do not let exceeding %100

    if (compName.value === "") {
      console.log("component cannot be an empty string!");
    } else if (compLOutcome.value === "") {
      console.log("outcome cannot be an empty string");
    } else if (isNaN((compWeight.value))) {
      console.log("weight needs to be a number!");
    } else if (tWeight + Number(compWeight.value) > 100) {
      console.log("weight cannot exceed %100");
    } else {
      let row = table.insertRow(-1);
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      cell0.innerHTML = compName.value;
      cell1.innerHTML = compLOutcome.value;
      cell2.innerHTML = compWeight.value;

      tWeight += Number(compWeight.value);
      document.getElementById("total-weight").value = tWeight;
    }
  }
  
  function deleteButtonClickHandler(){
    let table = document.getElementById('gradeBreakdownTable').getElementsByTagName('tbody')[0];
    let ID = table.rows.length - 1;
    if (ID === 0) {
      tWeight = 0;
      document.getElementById("total-weight").value = tWeight;
    } else {
      var weightToReduce = document.getElementById("gradeBreakdownTable").rows[ID+1].cells[2].innerText;
      tWeight -= Number(weightToReduce);
      if (tWeight < 0) {
        tWeight = 0;
      }
      document.getElementById("total-weight").value = tWeight;
      table.deleteRow(-1);
    }

  }

  return (
    <div>
      <h1 className="title">Final Grade Breakdown</h1> 
      <div className="buttons has-addons">
        <Button variant="contained" color="primary" onClick={addButtonClickHandler}>Add Grade Component</Button>
        <Button variant="contained" color="secondary" onClick={deleteButtonClickHandler}>Delete Grade Component</Button>
      </div>
      <GradeBreakdownTableComponent />  
      <label> Total Weight: % 
        <input className="output" 
          type="text" 
          id="total-weight"
          style={{ width:"50px", height:"30px" }}
          readOnly />
      </label>
    </div>
  );
};


function App() {

  const [outline, setOutline] = useState([{"text":"", "courseHours":"", "courseCredits":"", "calenderLink":""}]);
  // const [courseHours, setCourseHours] = useState("");
  // const [courseCredits, setCourseCredits] = useState("");
  // const [calendarLink, setCalendarLink] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState("");
  // const [gradingComponents, setGradingComponents] = useState("");
  // const [gradingWeights, setGradingWeights] = useState("");

   // fetch course outlines from django api
  async function fetchOutlines(){
    const outlinesData = await fetch('http://127.0.0.1:8000/api/view-outlines/');
    outlinesData.json().then(outlinesData => setOutline((outlinesData)));
 }

    // fetch learning outcomes from django api
  async function fetchLearningOutcomes(){
    const learningOutcomesData = await fetch('http://127.0.0.1:8000/api/view-learningoutcomes/');
    learningOutcomesData.json().then(learningOutcomesData => setLearningOutcomes((learningOutcomesData)));
  }

  async function fetchData(){
    fetchOutlines();
    fetchLearningOutcomes();
  }

  return (
    <div>
      <div className="container" style={{ width:"800px"}}>
      <h1 className="title">Course Outline Generator</h1>
    </div>

      <section className = "saved course selection">
        <div className="container" style={{ width:"800px"}}>
          <h1 className="title">Select Course</h1>
          <label >Edit Existing Course:</label>
            <select name="courses" id="courses">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <button className="button is-primary" onClick={fetchData}>Import Data</button>
        </div>
      </section>

      <section className="outline section">
        <div className="container" style={{ width:"800px"}}>
          <h1 className="title">Course Outline</h1>
            <textarea className="textarea" placeholder="Enter Text" value={outline[0]["text"]} onChange={(e)=>setOutline(e.target.value)}></textarea>
            <label> Course Hours: 
              <input className="input" 
                type="text" 
                placeholder="Enter course hours  *" 
                id="course-hours"
                value={outline[0]["courseHours"]} 
                onChange={(e)=>setOutline(e.target.value)}
                style={{ width:"155px", height:"30px" }} />  
            </label>
            <label> Academic Credits: 
              <input className="input" 
                type="text" 
                placeholder="# of Credits*" 
                id="acemedic-credits"
                value={outline[0]["courseCredits"]} 
                onChange={(e)=>setOutline(e.target.value)}
                style={{ width:"100px", height:"30px" }} />  
            </label>
            <label> Course Calendar: 
              <input className="input" 
                type="text" 
                placeholder="Enter calendar link  *" 
                id="course-calendar"
                value={outline[0]["calenderLink"]} 
                onChange={(e)=>setOutline(e.target.value)}
                style={{ width:"155px", height:"30px" }} />  
            </label>
            <button className="button is-primary">Save</button>
        </div>
      </section>

      <section className="learning outcomes section">
        <div className="container" style={{ width:"800px"}}>
          <LearningOutcomesComponent />  
        </div>
      </section>

      <section className="grade breakdown section">
        <div className="container" style={{ width:"800px"}}>
          <GradeBreakdownComponent />
        </div>
      </section>

    </div>
  );
}



export default App;