import { Redirect, Switch, Route, Router } from "react-router-dom";
import {useState } from "react";
import { createBrowserHistory } from 'history';
import Main from '../Main'; 
import Login from '../User/Login';
import Register from '../User/Register';

const history = createBrowserHistory();

function Routes() {

    const [login, setLogin] = useState(false);
    function setLog(value){
        setLogin(value);
        console.log("VALIDATE TOKEN:", value);
    };


    return(
    <Router history={history}>
        <Switch>
            <Route exact path='/'>
                <Main login={login} />
            </Route>
            <Route path= '/login'>
                <Login setLog={setLog} />
            </Route>
            <Route path= '/register'>
                <Register setLog={setLog}/>
            </Route>
        </Switch>
    </Router>)
}

export default Routes;