import { Link } from "react-router-dom"
import { getManufacturerApiCall } from "../../apiCalls/manufacturerApiCalls"
import { getAddressApiCall } from "../../apiCalls/addressApiCalls"

function DepartmentForm() {
    const allMans = getManufacturerApiCall()
    const allAdrs = getAddressApiCall()

    return (
        <div className="main_content" id="main_content_add-manufacturer">
            <h2>New department</h2>
            <form id="form" className="add_row" method="post" action="" novalidate>
                <input type="hidden" name="_id" value="<%= mainDep._id %>" />
                <label for="add_department-manufacturer">
                    Manufacturer:<span className="mandatory_field">*</span>
                    <select name="man_id" id="add_department-manufacturer">
                    {allMans.map(man =>
                            (<option key={man._id} value={man._id} label={man.name}></option>)
                        )}
                    </select>
                    <div id="manufacturer_error" className="error_msg"></div>
                </label>
                <label for="add_department-address">
                    Address:<span className="mandatory_field">*</span>
                    <select name="adrs_id" id="add_department-address">
                    {allAdrs.map(adr =>
                            (<option key={adr._id} value={adr._id} label={adr.city + " " + adr.street + " " + adr.building}></option>)
                        )}
                    </select>
                    <div id="address_error" className="error_msg"></div>
                </label>
                <label for="add_department-employees-number">
                    Number of employees:<span className="mandatory_field">*</span>
                    <input name="employeesNumber" className="add_department-employees-number" type="number" value={this} onChange={this} />
                    <div id="employees-number_error" className="error_msg">

                    </div>
                </label>
                <label for="add_department-manager-name">
                    Manager's name and surname:<span className="mandatory_field">*</span>
                    <input name="managerName" className="add_department-manager-name" type="text" placeholder="Name Surname" value={this} onChange={this} />
                    <div id="manager-name_error" className="error_msg">

                    </div>
                </label>
                <label for="add_department-foundation-date">
                    Foundation date:<span className="mandatory_field">*</span>
                    <input name="foundationDate" className="add_department-foundation-date" type="date" value={this} onChange={this} />
                    <div id="foundation-date_error" className="error_msg">

                    </div>
                </label>
                <label for="add_department-info">
                    Info:
                    <textarea name="info" className="add_department-info" rows="6" cols="50" value={this} onChange={this}></textarea>
                </label>
                <div className="form_buttons">
                    <input className="form_button" id="form_button_add" type="submit" value="Add" />
                    <Link to="/department" className="form-button_cancel">Cancel</Link>
                </div>
            </form>
            <div id="department-add-row_submit" className="submit_msg"></div>
        </div>
    )
}

export default DepartmentForm