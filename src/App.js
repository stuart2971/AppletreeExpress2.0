import { BrowserRouter, Route, Switch } from "react-router-dom"

import Main from "./Main"
import ItemPage from "./ItemPage"

import "./styles/css/normalize.css"
import "./styles/css/webflow.css"
import "./styles/css/appletreeexpress2-0.webflow.css"

function App() {

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/item/:itemName" component={ItemPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
