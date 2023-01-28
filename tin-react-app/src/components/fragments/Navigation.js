import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <div class="menu">
                <ul class="list">
                    <li class="list_main" id="<%= navLocation == 'main' ? 'link_main-main' : ''%>">
                        <Link to="/" className='link_main'>Main page</Link>
                    </li>
                    <li class="list_manufacturer" id="<%= navLocation == 'man' ? 'link_manufacturer-main' : ''%>">
                        <Link to="/manufacturer" className='link_manufacturer'>Manufacturers</Link>
                    </li>
                    <li class="list_model" id="<%= navLocation == 'mod' ? 'link_model-main' : ''%>">
                        <Link to="/model" className='link_model'>Models</Link>
                    </li>
                    <li class="list_department" id="<%= navLocation == 'dep' ? 'link_department-main' : ''%>">
                        <Link to="/department" className='link_department'>Departments</Link>
                    </li>
                    <li class="list_address" id="<%= navLocation == 'adrs' ? 'link_address-main' : ''%>">
                        <Link to="/address" className='link_address'>Addresses</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation