import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getManufacturerByIdApiCall } from '../../apiCalls/manufacturerApiCalls'
import ManufacturerDetailsData from './ManufacturerDetailsData'

function ManufacturerDetails() {
        // let { manId } = useParams()
        // manId = parseInt(manId)
        // const man = getManufacturerByIdApiCall(manId)

    const [man, setMan] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    let content;

    let { manId } = useParams()
    manId = parseInt(manId)

    function fetchManufacturerDetails() {
        getManufacturerByIdApiCall(manId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMan(null)
                        setMessage(data.message)
                    } else {
                        setMan(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchManufacturerDetails()
      }, [])

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading manufacturer data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <ManufacturerDetailsData manData={man} />
    }

    return (
        <main>
            <h2>Manufacturer details</h2>
            { content }
        </main>
    )
}
export default ManufacturerDetails