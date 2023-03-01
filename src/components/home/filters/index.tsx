import styles from '@/styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectFiltersState,
  setStart,
  setEnd,
  setMin,
  setMax,
} from '@/slices/filters-slice';
import { Database } from 'sql.js';

export default function Filters({ db }: { db: Database | null }) {
  if (db) {
    console.log('db loaded.');
  } else {
    console.log('no db loaded.');
  }
  const filterState = useSelector(selectFiltersState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (db && filterState.max === '9999-12-31') {
      const results = db.exec(
        `
          SELECT strftime('%Y-%m-%d', CASE 
            WHEN date < 1000000000 THEN datetime(date + 946684800, 'unixepoch', 'localtime')
            WHEN date > 1000000000 THEN datetime(date / 1000000000 + 946684800, 'unixepoch', 'localtime')
          END) FROM message ORDER BY date DESC limit 1;
          SELECT strftime('%Y-%m-%d', CASE 
            WHEN date < 1000000000 THEN datetime(date + 946684800, 'unixepoch', 'localtime')
            WHEN date > 1000000000 THEN datetime(date / 1000000000 + 946684800, 'unixepoch', 'localtime')
          END) FROM message ORDER BY date ASC limit 1;
        `
      );
      const max = String(results[0].values[0][0]);
      const min = String(results[1].values[0][0]);
      dispatch(setMax(max));
      dispatch(setMin(min));
    }
  }, [db, dispatch, filterState]);
  return (
    <div className={styles['filter-column']}>
      <h1>Filters</h1>
      {db && (
        <>
          <h2>Dates:</h2>
          <label htmlFor='start'>Start date:</label>
          <input
            type='date'
            id='start'
            value={filterState.start}
            onChange={(e) => {
              dispatch(setStart(e.target.value));
            }}
          />
          <label htmlFor='end'>End date:</label>
          <input
            type='date'
            id='end'
            value={filterState.end}
            onChange={(e) => {
              dispatch(setEnd(e.target.value));
            }}
          />
        </>
      )}
    </div>
  );
}
