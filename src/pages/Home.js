import React from "react";
import StickyHeadTable from "./Violation.js";

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  dateBegin,
  setDateBegin,
  dateEnd,
  setDateEnd,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по участку: "${searchValue}"` : "Все нарушения"}
        </h1>

        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}

          <input
            type="text"
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск по участку... "
          />
        </div>

        <div>
          <input className="input_0" type="text" readOnly value=" с " />
          <input
            type="date"
            value={dateBegin}
            onChange={(e) => setDateBegin(e.target.value)}
          />
          <input className="input_0" type="text" readOnly value=" по " />
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>
      </div>
      <div className="card">
        {StickyHeadTable(searchValue, dateBegin, dateEnd)}
      </div>
    </div>
  );
}
export default Home;
