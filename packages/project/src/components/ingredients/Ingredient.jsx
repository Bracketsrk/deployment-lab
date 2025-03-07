import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export function Ingredient(props) {
    return (
        <tr>
            <td className="p-2">{props.name}</td>
            <td className="p-2">{props.num}</td>
            <td className="p-2">
                <button>
                    <FontAwesomeIcon icon={faTrashCan} className="text-gray-500 cursor-pointer" title="Delete" onClick={() => props.onDeleteIngr(props.id)} />
                </button>
            </td>
        </tr>
        // <li className="flex gap-8">
        //     <label>
        //         <p id={props.id} htmlFor={props.id}/> {props.name}
        //     </label>
        //     <label>
        //         <p id={props.id} htmlFor={props.id}/> {props.num}
        //     </label>
        //     <button><FontAwesomeIcon icon={faTrashCan} className="text-gray-500 cursor-pointer" title="Delete" onClick={() => props.onDeleteIngr(props.id)} /></button>
        // </li>
    );
}

  