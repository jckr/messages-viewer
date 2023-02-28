import styles from '@/styles/Home.module.css'
import { useSelector } from "react-redux";
import { selectFiltersState } from "@/slices/filters-slice";

export default function Main() {
  const filterState = useSelector(selectFiltersState);
  return (
    <div className={styles.main}>
      <h1>Message viewer</h1>
      <div>Start date:</div>
      <div>{filterState.start}</div>
      <div>End date:</div>
      <div>{filterState.end}</div>
    </div>
  );
}
