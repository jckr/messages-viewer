import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import "./styles.css";
import SQLRepl from './components/sql-repl';
import FileInput from "./components/file-input";
import {initSQL} from './store/actions';
// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

export default function App() {
  const dispatch = useDispatch();
  const ready = useSelector((state) => state.ready);
  const error = useSelector((state) => state.error);
  useEffect(async () => {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    dispatch(initSQL());
  }, []);

  if (error) return <pre>{error.toString()}</pre>;
  if (!ready) return <pre>Loading...</pre>;
  return (<>
    <FileInput />
    <SQLRepl />
  </>);
}

