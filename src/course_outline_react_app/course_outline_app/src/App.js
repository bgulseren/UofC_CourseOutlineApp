import "bulma/css/bulma.css";
import{ useState } from "react";
import React from 'react';

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
          <th>Assignments</th>
          <td>1,2,5</td>
          <td>80%</td>
        </tr>
      </tbody>
    </table>
  );
};


const AddGradeComponentModal = () => {
  return (
    <div className="modal" id="addGradeModal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <h1 className="title">TEST</h1>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}


const LearningOutcomesComponent = () => {
  function addLearningOutcomeClickHandler(){
    document.getElementById('learningOutcomesTable').getElementsByTagName('tbody')[0].insertRow(0)
  }

  function deleteLearningOutcomeClickHandler(){
    document.getElementById('learningOutcomesTable').getElementsByTagName('tbody')[0].deleteRow(0)
  }

  return (
    <div>
      <h1 className="title">Learning Outcomes</h1>
      <LearningOutcomeTableComponent />      
      <div className="buttons has-addons">
        <button className="button is-primary" onClick={addLearningOutcomeClickHandler}>Add learning Outcome</button>
        <button className="button is-danger" onClick={deleteLearningOutcomeClickHandler}>Delete Learning Outcome</button>
      </div>
    </div>
  );
};


const GradeBreakdownComponent = () => {
  function addButtonClickHandler(){
    console.log("Open modal")
  }
  function deleteButtonClickHandler(){
    document.getElementById('learningOutcomesTable').getElementsByTagName('tbody')[0].deleteRow(0)
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