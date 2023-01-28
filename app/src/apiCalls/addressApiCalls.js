import { addressList, addressDetailsList } from './addressApiMockData'

export function getAddressApiCall() {
    return addressList;
}

export function getAddressByIdApiCall(adrId) {
    const adr = addressDetailsList.find(adr => adr._id === adrId)
    return adr;
}