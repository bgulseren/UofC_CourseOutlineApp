import "bulma/css/bulma.css";
import React from 'react';
import{ useState } from "react";

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
          <th>1</th>
          <td>Have a deep understanding, and practical knowledge of object oriented analysis, design, and development.</td>
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
    let ID = table.rows.length;
    let text = document.getElementById('newLearningOutcome').value
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = ID;
    cell2.innerHTML = text;
  }

  function deleteLearningOutcomeClickHandler(){
    let table = document.getElementById('learningOutcomesTable');
    let ID = table.rows.length - 2;
    document.getElementById('learningOutcomesTable').getElementsByTagName('tbody')[0].deleteRow(ID)
    console.log(ID)
  }

  return (
    <div>
      <h1 className="title">Learning Outcomes</h1>  
      <input className="input" type="text" placeholder="Learning Outcome *" id="newLearningOutcome" />  
      <button className="button is-primary" onClick={addLearningOutcomeClickHandler}>Add learning Outcome</button>
      <button className="button is-danger" onClick={deleteLearningOutcomeClickHandler}>Delete Learning Outcome</button>
      <LearningOutcomeTableComponent />  
    </div>
  );
};

const GradeBreakdownComponent = () => {
  function addButtonClickHandler(){
    let table = document.getElementById('gradeBreakdownTable').getElementsByTagName('tbody')[0];
    let ID = table.rows.length - 1;
    let compName = document.getElementById('newGradeCompName')
    let compLOutcome = document.getElementById('newGradeLOutcome')
    let compWeight = document.getElementById('newGradeCompWeight')
    let row = table.insertRow(-1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    cell0.innerHTML = compName.value;
    cell1.innerHTML = compLOutcome.value;
    cell2.innerHTML = compWeight.value;    // table.innerHTML += table.innerHTML;
  }
  
  function deleteButtonClickHandler(){
    let table = document.getElementById('gradeBreakdownTable').getElementsByTagName('tbody')[0];
    let ID = table.rows.length - 1;
    if (ID === 0) {
      return <p>There are no grades</p>;
    }
    table.deleteRow(ID);
  }
  return (
    <div>
      <h1 className="title">Final Grade Breakdown</h1>
      <GradeBreakdownTableComponent />   
      <div className="buttons has-addons">
        <button className="button is-primary" onClick={addButtonClickHandler}>Add Grade Component</button>
        <button className="button is-danger" onClick={deleteButtonClickHandler}>Delete Grade Component</button>
      </div>
      <textarea className="textarea" readOnly>100%</textarea>
    </div>
  );
};


function App() {
  return (
    <div>
    <h1 className="title">Course Outline Generator</h1>
      <section className="outline section">
        <div className="container">
          <h1 className="title">Course Outline</h1>
            <textarea className="textarea" placeholder="Enter Text"></textarea>
              <button className="button is-primary">Save</button>
        </div>
      </section>

      <section className="learning outcomes section">
        <div className="container">
          <LearningOutcomesComponent />  
        </div>
      </section>

      <section className="grade breakdown section">
        <div className="container">
          <GradeBreakdownComponent />
        </div>
      </section>

    </div>
  );
}



export default App;