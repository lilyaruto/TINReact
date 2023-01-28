import { Link } from 'react-router-dom'
import { getModelApiCall } from '../../apiCalls/modelApiCalls'

function ModelList() {
    const modelList = getModelApiCall();
    return (
        <div className="main_content">
            <div id="model-add-row_submit" className="submit_msg"></div>
            <div className="main_content_buttons">
                <Link to="/model/add" className="add-element_button">Add element</Link>
            </div>
            <div class="database">
                <table className="table_database" id="table_database_model">
                    <tr className="table_database-headers">
                        <th className="table_database-header">Manufacturer</th>
                        <th className="table_database-header">Name</th>
                        <th className="table_database-header">Generation</th>
                        <th className="table_database-header">Action</th>
                    </tr>
                    {
                        modelList.map(mod => (
                            <tr className="table_database-row">
                                <td className="table_database-data">{mod.manufacturer.name}</td>
                                <td className="table_database-data">{mod.name}</td>
                                <td className="table_database-data">{mod.generation}</td>
                                <td className="table_database-data table_buttons">
                                    <ul className="list-actions">
                                        <Link to={`/model/details/${mod._id}`} className="details_button link_button">Details</Link>
                                        <Link to={`/model/modify/${mod._id}`} className="modify_button link_button">Modify</Link>
                                        <Link to={`/model/delete/${mod._id}`} className="remove_button link_button">Remove</Link>
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

export default ModelList