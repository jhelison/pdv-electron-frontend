import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import Home from "./components/Home/Home"
import Users from "./components/Users/Users"
import Terminal from "./components/Terminal/Terminal"
import AcessLog from "./components/AcessLog/AcessLog"
import Configuration from "./components/Configuration/Configuration"
import About from "./components/About/About"

export default (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/terminal" component={Terminal} />
            <Route path="/acesslog" component={AcessLog} />
            <Route path="/configuration" component={Configuration} />
            <Route path="/about" component={About} />
            <Redirect from="*" to="/" />
        </Switch>
    )
}
