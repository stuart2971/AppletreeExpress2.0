import { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Main from "./Main"
import ItemPage from "./ItemPage"
import PaymentComplete from "./PaymentComplete"
import Dashboard from "./Dashboard"

import "./styles/css/normalize.css"
import "./styles/css/webflow.css"
import "./styles/css/appletreeexpress2-0.webflow.css"
import Cart from "./Cart"

function App() {
  console.log(process.env.PASSWORD)
  useEffect(async () => {
    const specialCosts = await (await fetch("https://appletree-express2.herokuapp.com/item/specialCosts")).json()
    Cart.setSpecialCosts(specialCosts)
  }, [])

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/item/:itemName" component={ItemPage} />
          <Route path="/payment_complete" component={PaymentComplete} />
          <Route path="/ADMIN_DASHBOARD/:password" component={Dashboard} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
