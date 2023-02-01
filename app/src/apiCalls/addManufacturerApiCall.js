const manufacturerBaseUrl = 'http://localhost:3000/api/manufacturer'

export function addManufacturerApiCall(man) {
    const manString = JSON.stringify(man)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: manString
    }
    const promise = fetch(manufacturerBaseUrl, options);
    return promise;
}