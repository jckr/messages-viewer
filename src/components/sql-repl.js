import {useDispatch, useSelector} from 'react-redux';
import {exec} from '../store/actions/';

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
 export default function SQLRepl({ db }) {
    
    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);
    const error = useSelector((state) => state.replError);
    console.log(error);
    return (
      <div className="App">
        <h1>React SQL interpreter</h1>
  
        <textarea
          onChange={(e) => dispatch(exec(e.target.value))}
          placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
        ></textarea>
  
        <pre className="error">{(error || "").toString()}</pre>
  
        {results && <pre>
          {
            // results contains one object per select statement in the query
            results.map(({ columns, values }, i) => (
              <ResultsTable key={i} columns={columns} values={values} />
            ))
          }
        </pre>}
      </div>
    );
  }
  
  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   * @param {import("sql.js").QueryExecResult} props
   */
  function ResultsTable({ columns, values }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((columnName, i) => (
              <td key={i}>{columnName}</td>
            ))}
          </tr>
        </thead>
  
        <tbody>
          {
            // values is an array of arrays representing the results of the query
            values.map((row, i) => (
              <tr key={i}>
                {row.map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
  