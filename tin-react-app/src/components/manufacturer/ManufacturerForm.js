import { Link } from "react-router-dom"
import { getManufacturerApiCall } from "../../apiCalls/manufacturerApiCalls"

function ManufacturerForm() {
    const allMans = getManufacturerApiCall()

    return (
        <div class="main_content" id="main_content_add-manufacturer">
            <h2>New manufacturer</h2>
            <form id="form" class="add_row" method="post" action="<%= formAction %>" novalidate>
                <input type="hidden" name="_id" value="" />
                <label for="add_manufacurer-name">
                    Name:<span class="mandatory_field">*</span>
                    <input class="add_manufacurer-name" name="name" type="text" placeholder="2-60 characters" value="" />
                    <div id="name_error" class="error_msg">

                    </div>
                </label>
                <label for="add_manufacurer-child-company">
                    Parent company:
                    <select name="parentCompany" id="add_manufacurer-child-company">
                        <option value="0">---NULL---</option>
                        {allMans.map(man =>
                            (<option key={man._id} value={man._id} label={man.name}></option>)
                        )}
                    </select>
                </label>
                <label for="add_manufacurer-logo">
                    Logo link:<span class="mandatory_field">*</span>
                    <input name="logo" class="add_manufacurer-logo" type="text" placeholder="300 characters" value="" />
                    <div id="logo_error" class="error_msg">

                    </div>
                </label>
                <div class="form_buttons">
                    <input class="form_button" id="form_button_add" type="submit" value="Add" />
                    <Link to="/manufacturer" className="form-button_cancel">Cancel</Link>
                </div>
            </form>
            <div id="manufacturer-add-row_submit" class="submit_msg"></div>
        </div>
    )
}

export default ManufacturerForm