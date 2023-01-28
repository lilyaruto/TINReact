import { Link } from "react-router-dom"

function AddressForm() {

    return (
        <div className="main_content" id="main_content_add-manufacturer">
            <h2>New address</h2>
            <form id="form" className="add_row" method="post" action="<%= formAction %>" novalidate>
                <input type="hidden" name="_id" value={this} onChange={this} />
                <label for="add_address-city">
                    City:<span className="mandatory_field">*</span>
                    <input name="city" className="add_address-city" type="text" placeholder="2-60 characters" value={this} onChange={this} />
                    <div id="city_error" className="error_msg">

                    </div>
                </label>
                <label for="add_address-street">
                    Street:<span className="mandatory_field">*</span>
                    <input name="street" className="add_address-street" type="text" placeholder="2-100 characters" value={this} onChange={this} />
                    <div id="street_error" className="error_msg">

                    </div>
                </label>
                <label for="add_address-building">
                    Building:<span className="mandatory_field">*</span>
                    <input name="building" className="add_address-building" type="text" placeholder="1-10 characters" value={this} onChange={this} />
                    <div id="building_error" className="error_msg">

                    </div>
                </label>
                <label for="add_address-postcode">
                    Postcode:<span className="mandatory_field">*</span>
                    <input name="index" className="add_address-postcode" type="text" placeholder="1-10 characters" value={this} onChange={this} />
                    <div id="postcode_error" className="error_msg">

                    </div>
                </label>
                <div class="form_buttons">
                    <input className="form_button" id="form_button_add" type="submit" value="Add" />
                    <Link to="/address" className="form-button_cancel">Cancel</Link>
                </div>
            </form>
            <div id="address-add-row_submit" className="submit_msg"></div>
        </div>
    )
}

export default AddressForm