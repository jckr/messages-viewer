import styles from '@/styles/Charts.module.css'
import { useSelector, useDispatch } from "react-redux";
import { reset, selectFiltersState, setStartEnd } from "@/slices/filters-slice";
import SummaryTimeButton from './summary-time-button';
import { subtract } from '@/lib/utils/time-operations';


export default function SummaryTimeRow() {
    const filterState = useSelector(selectFiltersState);
    const dispatch = useDispatch();

    const {max, min} = filterState;

    return (<div className={styles['summary-time-row']}>
        <SummaryTimeButton label={'ALL'}
        onClick={e => dispatch(reset)
        } />
        <SummaryTimeButton label={'10Y'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 10, 'year'), end: max}))
        } />
        <SummaryTimeButton label={'5Y'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 5, 'year'), end: max}))
        } />
         <SummaryTimeButton label={'1Y'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 1, 'year'), end: max}))
        } />
         <SummaryTimeButton label={'1Q'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 3, 'month'), end: max}))
        } />
          <SummaryTimeButton label={'1M'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 1, 'month'), end: max}))
        } />
          <SummaryTimeButton label={'1W'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 1, 'week'), end: max}))
        } />
        <SummaryTimeButton label={'1D'}
        onClick={e => dispatch(setStartEnd({start: subtract(max, 1, 'day'), end: max}))
        } />
    </div>);
}