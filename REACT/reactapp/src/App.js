import "bulma/css/bulma.css";
import{ useState } from "react";
function App() {

  // initializing the counter with 0
  const [counter, setCounter] = useState(0); 
  const [inputValue, setInputValue] = useState("");

  // for setting the counter using input value when pressing enter key
  const handleKeyDown=(e)=>{
    if(e.key=="Enter"){
      setCounter(parseInt(inputValue))
    }
  };

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
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <div className="control">
                      <a className="button is-info" onClick={()=>setCounter(parseInt(inputValue))}>Assign</a>
                    </div>
                  </div>
                  <div className="buttons has-addons">
                    <button className="button is-primary" onClick={()=>setCounter(counter+1)}>Increase</button>
                    <button className="button is-warning"onClick={()=>setCounter(counter-1)}>Decrease</button>
                  </div>
                </div>
                <div className="column is-half">
                  <h1 className="title">{counter}</h1>
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
