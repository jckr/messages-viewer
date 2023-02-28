import styles from '@/styles/Charts.module.css'
import { useSelector } from "react-redux";
import { selectFiltersState } from "@/slices/filters-slice";
import SummaryTimeRow from './summary-time-row';

export default function Summary() {
  const filterState = useSelector(selectFiltersState);
  return (

    <div className={styles.summary}>
        <SummaryTimeRow />
        <h2>Min</h2>
        <div>{filterState.min}</div>
        <h2>Max</h2>
        <div>{filterState.max}</div>
        <h2>Start</h2>
        <div>{filterState.start}</div>
        <h2>End</h2>
        <div>{filterState.end}</div>                        
        
    </div>
  );
}
