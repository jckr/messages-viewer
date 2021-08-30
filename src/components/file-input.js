import { useDispatch } from "react-redux";
import {loadDatabase} from '../store/actions';

const FileInput = ()  => {
    const dispatch = useDispatch();
    return (<div>
        <input type="file" onChange={e => {dispatch(loadDatabase(e))}}></input>
    </div>);
}
export default FileInput;
