function ManufacturerDetailsData(props) {
    const man = props.man
    return (
        <>
            <form className="form" method="post" action="<%= formAction %>">
                <input type="hidden" name="_id" value="" />
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
        </>
    )
}

export default ManufacturerDetailsData