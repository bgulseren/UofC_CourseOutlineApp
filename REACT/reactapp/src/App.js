import "bulma/css/bulma.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-full">
            <div className="notification">
              <div className="columns">
                <div className="column is-half">
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input"
                        type="text"
                        placeholder="Enter a number"
                      />
                    </div>
                    <div className="control">
                      <a className="button is-info">Assign</a>
                    </div>
                  </div>
                  <div className="buttons has-addons">
                    <button className="button is-primary">Increase</button>
                    <button className="button is-warning">Decrease</button>
                  </div>
                </div>
                <div className="column is-half">
                  <h1 className="title">value</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
