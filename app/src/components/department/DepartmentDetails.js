import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDepartmentByIdApiCall } from '../../apiCalls/departmentApiCalls'
import { getFormattedDate } from '../../helpers/dateHelper'


function DepartmentDetails() {
    let { depId } = useParams()
    depId = parseInt(depId)
    const dep = getDepartmentByIdApiCall(depId)

    return (
        <main>
            <h2>Department details</h2>
            <form className="form" method="post" action="">
                <input type="hidden" name="_id" value="<%= mainDep._id %>" />
                <label for="details_department-employees-number">
                    ID:
                    <input disabled name="_id" className="details_department-employees-number" type="number" value={`${dep._id}`} />
                </label>
                <label for="details_department-manufacturer">
                    Manufacturer:
                    <select disabled name="man_id" id="details_department-manufacturer">
                    <option value={`${dep.manufacturer._id}`}>{dep.manufacturer.name}</option>
                    </select>
                </label>
                <label for="details_department-address">
                    Address:
                    <select disabled name="adrs_id" id="details_department-address">
                        <option value={`${dep.address._id}`}>{dep.address.city + " " + dep.address.street + " " + dep.address.building}</option>
                    </select>
                </label>
                <label for="details_department-employees-number">
                    Number of employees:
                    <input disabled name="employeesNumber" className="details_department-employees-number" type="number" value={`${dep.employeesNumber}`} />
                </label>
                <label for="details_department-manager-name">
                    Manager's name and surname:
                    <input disabled name="managerName" className="details_department-manager-name" type="text" value={`${dep.managerName}`} />
                </label>
                <label for="details_department-foundation-date">
                    Foundation date:
                    <input disabled name="foundationDate" className="details_department-foundation-date" type="date" value={`${dep.foundationDate ? getFormattedDate(dep.foundationDate) : ""}`} />
                </label>
                <label for="details_department-info">
                    Info:
                    <textarea  disabled name="info" className="details_department-info" rows="6" cols="50">{`${dep.info}`}</textarea>
                </label>
            </form>
        </main>
    )
}
export default DepartmentDetails