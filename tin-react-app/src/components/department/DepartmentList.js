import { Link } from 'react-router-dom'
import { getDepartmentApiCall } from '../../apiCalls/departmentApiCalls'
import { getFormattedDate } from '../../helpers/dateHelper'

function DepartmentList() {
    const departmentList = getDepartmentApiCall();
    return (
        <div className="main_content">
            <div id="department-add-row_submit" className="submit_msg"></div>
            <div className="main_content_buttons">
                <Link to="/department/add" className="add-element_button">Add element</Link>
            </div>
            <div className="database">
                <table className="table_database" id="table_database_department">
                    <tr className="table_database-headers">
                        <th className="table_database-header">Manufacturer</th>
                        <th className="table_database-header">Number of employees</th>
                        <th className="table_database-header">Manager name</th>
                        <th className="table_database-header">Foundation date</th>
                        <th className="table_database-header">Action</th>
                    </tr>
                    {
                        departmentList.map(dep => (
                            <tr className="table_database-row">
                                <td className="table_database-data">{dep.manufacturer.name}</td>
                                <td className="table_database-data">{dep.employeesNumber}</td>
                                <td className="table_database-data">{dep.managerName}</td>
                                <td className="table_database-data">{dep.foundationDate ? getFormattedDate(dep.foundationDate) : ""}</td>
                                <td className="table_database-data table_buttons">
                                    <ul className="list-actions">
                                        <Link to={`/department/details/${dep._id}`} className="details_button link_button">Details</Link>
                                        <Link to={`/department/modify/${dep._id}`} className="modify_button link_button">Modify</Link>
                                        <Link to={`/department/delete/${dep._id}`} className="remove_button link_button">Remove</Link>
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

export default DepartmentList