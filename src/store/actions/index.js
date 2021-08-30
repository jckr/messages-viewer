import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import initSqlJs from 'sql.js';
// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

// we can't put non-serializable data in the store, so instead we will keep them as variables here
// so that actions can access them. 

let SQL = null;
let db = null;

export const setDatabase = createAction('setDatabase')

export const initSQL = createAsyncThunk('initSQL',
    async () => {
        SQL = await initSqlJs({ locateFile: () => sqlWasm });
        db = new SQL.Database();
        return db.filename;
    }
)
export const loadDatabase = createAsyncThunk('loadDatabase', 
    e => {
        const file = e.target.files[0];
        const r = new FileReader();
        r.onload = function() {
            const Uints = new Uint8Array(r.result);
            db = new SQL.Database(Uints);
        }
        r.readAsArrayBuffer(file);
        return true;
    }
);

export const exec = createAsyncThunk('exec',
 (sql) => {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
      return db.exec(sql); // an array of objects is returned;
    }
);
