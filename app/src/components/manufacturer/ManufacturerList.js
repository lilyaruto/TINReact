import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ManufacturerListTable from './ManufacturerListTable'
import { getManufacturerApiCall } from '../../apiCalls/manufacturerApiCalls'

function ManufacturerList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [manufacturer, setManufacturers] = useState([])

    let content;

    function fetchManufacturerList() {
        getManufacturerApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setManufacturers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchManufacturerList()
      }, [])

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading employees data...</p>
    } else {
        content = <ManufacturerListTable manList={manufacturer} />
    }

    return (
        <main>
            <h2>Manufacturers list</h2>
            { content }
            <div className="main_content">
                <div className="submit_msg"></div>
                <div className="main_content_buttons">
                    <Link to="/manufacturer/add" className="add-element_button">Add element</Link>
                </div>
            </div>
        </main>
    )
}

export default ManufacturerList