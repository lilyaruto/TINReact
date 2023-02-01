import ManufacturerListTableRow from "./ManufacturerListTableRow"

function ManufacturerListTable(props) {
    const manufacturers = props.manList
    return (
        <table className="table_database table_database_manufacturer">
            <tr class="table_database-headers">
                <th className="table_database-header">Name</th>
                <th className="table_database-header">Logo</th>
                <th className="table_database-header">Action</th>
            </tr>
            {manufacturers.map(man =>
                        <ManufacturerListTableRow manData={man} key={man._id} />
                    )}
        </table>
    )
}

export default ManufacturerListTable