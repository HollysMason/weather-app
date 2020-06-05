import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {CityList} from "./containers/CityList";
import {DetailWeatherInfo} from "./containers/DetailWeatherInfo";

const App = () => (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <CityList/>
          </Route>
          <Route path="/:cityName">
              <DetailWeatherInfo/>
          </Route>
        </Switch>
      </Router>
    </div>
);

export default App;
