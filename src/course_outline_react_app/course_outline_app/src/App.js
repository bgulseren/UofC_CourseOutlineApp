import "bulma/css/bulma.css";
import React from 'react';

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
          <h1 className="title">Learning Outcomes</h1>
            <textarea className="textarea" placeholder="Enter Text"></textarea>
              <div className="buttons has-addons">
                <button className="button is-primary">Add learning Outcome</button>
                <button className="button is-danger">Delete Learning Outcome</button>
            </div>
        </div>
      </section>

      <section className="grade breakdown section">
        <div className="container">
          <h1 className="title">Final Grade Breakdown</h1>
            <textarea className="textarea" placeholder="Enter Text"></textarea>
              <div className="buttons has-addons">
                <button className="button is-primary">Add Grade Component</button>
                <button className="button is-danger">Delete Grade Component</button>
              </div>
        </div>
      </section>

    </div>
  );
}



export default App;