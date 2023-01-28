import { Link } from 'react-router-dom'
import { getAddressApiCall } from '../../apiCalls/addressApiCalls'

function AddressList() {
    const addressList = getAddressApiCall();
    return (
        <div className="main_content">
            <div id="address-add-row_submit" className="submit_msg"></div>
            <div className="main_content_buttons">
                <a href="/address/add-address">
                    <Link to="/address/add" className="add-element_button">Add element</Link>
                </a>
            </div>
            <div className="database">
                <table className="table_database" id="table_database_address">
                    <tr className="table_database-headers">
                        <th className="table_database-header">City</th>
                        <th className="table_database-header">Street</th>
                        <th className="table_database-header">Building</th>
                        <th className="table_database-header">Action</th>
                    </tr>
                    {
                        addressList.map(adr => (
                            <tr className="table_database-row">
                                <td className="table_database-data">{adr.city}</td>
                                <td className="table_database-data">{adr.street}</td>
                                <td className="table_database-data">{adr.building}</td>
                                <td className="table_database-data table_buttons">
                                    <ul className="list-actions">
                                        <Link to={`/address/details/${adr._id}`} className="details_button link_button">Details</Link>
                                        <Link to={`/address/modify/${adr._id}`} className="modify_button link_button">Modify</Link>
                                        <Link to={`/address/delete/${adr._id}`} className="remove_button link_button">Remove</Link>
                                    </ul>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>                 
        </div>
    )
}

export default AddressList