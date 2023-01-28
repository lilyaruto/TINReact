import { Link } from "react-router-dom"
import { getManufacturerApiCall } from "../../apiCalls/manufacturerApiCalls"

function ModelForm() {
    const allMans = getManufacturerApiCall()

    return (
        <div className="main_content" id="main_content_add-manufacturer">
            <h2>New model</h2>
            <form id="form" className="add_row" method="post" action="<%= formAction %>">
                <input type="hidden" name="_id" value="" />
                <label for="add_model-name">
                    Name:<span className="mandatory_field">*</span>
                    <input name="name" className="add_model-name" type="text" placeholder="1-60 characters" value={this} onChange={this} />
                    <div id="name_error" className="error_msg">

                    </div>
                </label>
                <label for="add_model-manufacturer">
                    Manufacturer:<span className="mandatory_field">*</span>
                    <select name="man_id" id="add_manufacurer">
                    {allMans.map(man =>
                            (<option key={man._id} value={man._id} label={man.name}></option>)
                        )}
                    </select>
                    <div id="manufacturer-id_error" className="error_msg">
                    </div>
                </label>
                <label for="add_model-generation">
                    Generation:<span className="mandatory_field">*</span>
                    <input name="generation" className="add_model-generation" type={"number"} value={this} onChange={this} />
                    <div id="generation_error" className="error_msg">

                    </div>
                </label>
                <div class="form_buttons">
                    <input className="form_button" id="form_button_add" type="submit" value="Add" />
                    <Link to="/model" className="form-button_cancel">Cancel</Link>
                </div>
            </form>
            <div id="model-add-row_submit" className="submit_msg"></div>
        </div>
    )
}

export default ModelForm