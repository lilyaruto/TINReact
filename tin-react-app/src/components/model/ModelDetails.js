import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getModelByIdApiCall } from '../../apiCalls/modelApiCalls'

function ModelDetails() {
    let { modId } = useParams()
    modId = parseInt(modId)
    const mod = getModelByIdApiCall(modId)

    return (
        <main>
            <h2>Model details</h2>
            <form className="form" method="post" action="<%= formAction %>">
                <input type="hidden" name="_id" value="" />
                <label for="details_model-id">
                    ID:
                    <input disabled name="_id" className="details_model-id" type="text" value={`${mod._id}`} />
                </label>
                <label for="details_model-name">
                    Name:
                    <input disabled name="name" className="details_model-name" type="text" value={`${mod.name}`} />
                </label>
                <label for="details_model-manufacturer">
                    Manufacturer:
                    <select disabled name="man_id" id="add_manufacurer">
                        <option value={`${mod.manufacturer._id}`}>{mod.manufacturer.name}</option>
                    </select>
                </label>
                <label for="details_model-generation">
                    Generation:
                    <input disabled name="generation" className="details_model-generation" type="number" value={`${mod.generation}`} />
                </label>
            </form>
        </main>
    )
}
export default ModelDetails