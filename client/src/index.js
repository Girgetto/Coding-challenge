import React from "react";
import ReactDOM from "react-dom";
import List from "./components/list";
import { list, listItems } from "./fake-data/index";
import './style.css';
// import 'bulma/css/bulma.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
