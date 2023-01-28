import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAddressByIdApiCall } from '../../apiCalls/addressApiCalls'

function AddressDetails() {
    let { adrId } = useParams()
    adrId = parseInt(adrId)
    const adr = getAddressByIdApiCall(adrId)

    return (
        <main>
            <h2>Address details</h2>
            <form className="form" method="post" action="">
                <input type="hidden" name="_id" value="<%= adr._id %>" />
                <label for="details_address-city">
                    ID:
                    <input disabled name="_id" className="details_address-city" type="text" value={`${adr._id}`} />
                </label>
                <label for="details_address-city">
                    City:
                    <input disabled name="city" className="details_address-city" type="text" value={`${adr.city}`} />
                </label>
                <label for="details_address-street">
                    Street:
                    <input disabled name="street" className="details_address-street" type="text" value={`${adr.street}`} />
                </label>
                <label for="details_address-building">
                    Building:
                    <input disabled name="building" className="details_address-building" type="text" value={`${adr.building}`} />
                </label>
                <label for="details_address-postcode">
                    Postcode:
                    <input disabled name="index" className="details_address-postcode" type="text" value={`${adr.postcode}`} />
                </label>
            </form>
        </main>
    )
}
export default AddressDetails