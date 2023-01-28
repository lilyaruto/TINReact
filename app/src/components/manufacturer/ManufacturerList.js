import { Link } from 'react-router-dom'
import { getManufacturerApiCall } from '../../apiCalls/manufacturerApiCalls'

function ManufacturerList() {
    const manufacturerList = getManufacturerApiCall();
    return (
        <main>
            <div className="main_content">
                <div className="submit_msg"></div>
                <div className="main_content_buttons">
                    <Link to="/manufacturer/add" className="add-element_button">Add element</Link>
                </div>
                <div className="database">
                    <table className="table_database table_database_manufacturer">
                        <tr class="table_database-headers">
                            <th className="table_database-header">Name</th>
                            <th className="table_database-header">Logo</th>
                            <th className="table_database-header">Action</th>
                        </tr>
                        {
                            manufacturerList.map(man => (
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
                            ))
                        }
                    </table>
                </div>
            </div>
        </main>
    )
}

export default ManufacturerList