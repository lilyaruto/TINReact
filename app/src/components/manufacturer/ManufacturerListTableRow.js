import { Link } from 'react-router-dom';

function ManufacturerListTableRow(props) {
    const man = props.manData
    return (
        <tr className="table_database-row">
            <td className="table_database-data">{man.name}</td>
            <td className="table_database-data">
                <img className="table_database-data-logo" src={`${man.logo}`} alt="" />
            </td>
            <td className="table_database-data table_buttons">
                <ul className="list-actions">
                    <Link to={`/manufacturer/details/${man._id}`} className="details_button link_button">Details</Link>
                    <Link to={`/manufacturer/modify/${man._id}`} className="modify_button link_button">Modify</Link>
                    <Link to={`/manufacturer/delete/${man._id}`} className="remove_button link_button">Remove</Link>
                </ul>
            </td>
        </tr>
    )
}

export default ManufacturerListTableRow