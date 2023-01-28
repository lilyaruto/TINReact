import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getManufacturerByIdApiCall } from '../../apiCalls/manufacturerApiCalls'

function ManufacturerDetails() {
    let { manId } = useParams()
    manId = parseInt(manId)
    const man = getManufacturerByIdApiCall(manId)

    return (
        <main>
            <h2>Manufacturer details</h2>
            <form className="form" method="post" action="<%= formAction %>">
                <input type="hidden" name="_id" value="<%= mainMan._id %>" />
                <label for="details_manufacurer-id">
                    ID:
                    <input disabled className="details_manufacurer-id" type="text" value={`${man._id}`} />
                </label>
                <label for="details_manufacurer-name">
                    Name:
                    <input disabled className="details_manufacurer-name" type="text" value={`${man.name}`} />
                </label>
                <label for="details_manufacurer-child-company">
                    Parent company:
                    <select name="" id="details_manufacurer-child-company" disabled>
                        <option value={`${man._id}`}>{man.parentCompany}</option>
                    </select>
                </label>
                <label for="details_manufacurer-logo">
                    Logo link:
                    <input disabled className="details_manufacurer-logo" type="text" value={`${man.logo}`} />
                </label>
            </form>
        </main>
    )
}
export default ManufacturerDetails