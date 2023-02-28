import { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import {Database, QueryExecResult, SqlValue} from "sql.js";

import styles from "../../styles/Home.module.css";

export default function SqlJsPage() {
  const [db, setDb] = useState<Database | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [execResults, setExecResults] = useState<QueryExecResult[] | null>(null);

  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => setDb(new SQL.Database()))
      .catch((err) => setError(err));
  }, []);

  const exec = (sql: string) => {
    try {
      if (db === null) {throw ('no database')}
      const results = db.exec(sql);
      setExecResults(results);
      setError(null);
    } catch (err) {
      console.log(err);
      setExecResults(null);
    }
  };

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  type ResultTableProps = {
    columns: string[];
    values: SqlValue[][];
  }
  const ResultTable = ({ columns, values }: ResultTableProps) => {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((columnName) => (
              <td key={columnName}>{columnName}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {values.map(
            (
              row, // values is an array of arrays representing the results of the query
              rowIndex
            ) => (
              <tr key={rowIndex}>
                {row.map((value, cellIndex) => (
                  <td key={cellIndex}>{value}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };

  return db ? (
    <div className={styles.container}>
      <h1>Next.js SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        className={styles.codeBox}
      />

      <pre className={styles.error}>{(error || "").toString()}</pre>

      <pre>
        {execResults
          ? execResults.map((execResult, rIndex) => (
              <ResultTable
                key={rIndex}
                columns={execResult.columns}
                values={execResult.values}
              />
            ))
          : ""}
      </pre>
    </div>
  ) : (
    <pre>Loading...</pre>
  );
}