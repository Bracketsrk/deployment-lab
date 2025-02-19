import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Todo(props) {
    return (
        <li className="flex gap-8">
            <label>
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.onToggleCompletion(props.id)} htmlFor={props.id}/> {props.name}
            </label>
            <button><FontAwesomeIcon icon={faTrashCan} className="text-gray-500" title="Delete" onClick={() => props.onDeleteTask(props.id)} /></button>
        </li>
    );
}

  