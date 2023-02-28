import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectFiltersState, setStart, setEnd, setMax } from "@/slices/filters-slice";
export default function Filters() {
  const filterState = useSelector(selectFiltersState);
  const dispatch = useDispatch();
  useEffect(() => {
    if(filterState.max === '9999-12-31') {
        dispatch(setMax(new Date().toISOString().slice(0, 10)))
    }
  })
  return (
    <div className={styles["filter-column"]}>
      <h1>Filters</h1>
      <h2>Dates:</h2>
      <label htmlFor="start">Start date:</label>
      <input
        type="date"
        id="start"
        value={filterState.start}
        onChange={(e) => {
          dispatch(setStart(e.target.value));
        }}
      />
      <label htmlFor="end">End date:</label>
      <input
        type="date"
        id="end"
        value={filterState.end}
        onChange={(e) => {
          dispatch(setEnd(e.target.value));
        }}
      />
    </div>
  );
}
