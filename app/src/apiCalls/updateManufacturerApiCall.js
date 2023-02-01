const manufacturerBaseUrl = 'http://localhost:3000/api/manufacturer'

export function updateManufacturerApiCall(manId, man) {
    const url = `${manufacturerBaseUrl}/${manId}`
    const manString = JSON.stringify(man)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: manString
    }
    const promise = fetch(url, options);
    return promise;
}