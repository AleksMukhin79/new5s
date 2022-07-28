import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import ViolationData from "./pages/ViolationData.js";

//export const AppContext = React.createContext();

function App() {
  const currDate = new Date();
  const pastDate = new Date("2022-01-01");

  const [dateBegin, setDateBegin] = React.useState(
    pastDate.toLocaleDateString("en-CA")
  );
  const [dateEnd, setDateEnd] = React.useState(
    currDate.toLocaleDateString("en-CA")
  );

  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {/*       <AppContext.Provider value={{ dateBegin, dateEnd }}> */}
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              dateBegin={dateBegin}
              setDateBegin={setDateBegin}
              dateEnd={dateEnd}
              setDateEnd={setDateEnd}
            />
          }
        ></Route>

        <Route
          path="/violationData/:id"
          exact
          element={<ViolationData />}
        ></Route>
      </Routes>
      {/*       </AppContext.Provider> */}
    </div>
  );
}

export default App;
