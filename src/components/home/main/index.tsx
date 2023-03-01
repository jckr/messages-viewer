import styles from '@/styles/Home.module.css'
import Summary from './summary';

import { useSelector } from "react-redux";
import { selectFiltersState } from "@/slices/filters-slice";
import { Database } from 'sql.js';

export default function Main({db} : {db: Database | null}) {
  if (db) {console.log('db loaded.')} else {console.log('no db loaded.')}

  const filterState = useSelector(selectFiltersState);
  return (
    <div className={styles.main}>
      <Summary />
    </div>
  );
}
