import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Filters from '@/components/home/filters';
import Main from '@/components/home/main';

import initSqlJs, { Database } from 'sql.js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [db, setDb] = useState<Database | null>(null);
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => {
        setSql(SQL);
        fetch('chat.db')
          .then((response) => response.arrayBuffer())
          .then((buffer) => {
            const typedArray = new Uint8Array(buffer);
            const db = new SQL.Database(typedArray);
            setDb(db);
          });
      })
      .catch((err) => {
        setError(String(err));
      });
  }, []);

  return (
    <div className={styles.app}>
      <Filters db={db}/>
      <Main db={db} />
    </div>
  );
}
