import { manufacturerList, manufacturerDetailsList } from './manufacturerApiMockData'

export function getManufacturerApiCall() {
    return manufacturerList;
}

export function getManufacturerByIdApiCall(manId) {
    const man = manufacturerDetailsList.find(man => man._id === manId)
    return man;
}