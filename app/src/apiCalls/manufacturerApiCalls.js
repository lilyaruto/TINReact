import { manufacturerDetailsList } from './manufacturerApiMockData'

const manufacturerBaseUrl = 'http://localhost:3000/api/manufacturer'

export function getManufacturerApiCall() {
    const promise = fetch(manufacturerBaseUrl)
    return promise;
}

export function getManufacturerByIdApiCall(manId) {
    const url = `${manufacturerBaseUrl}/${manId}`;
    const promise = fetch(url);
    return promise;
}