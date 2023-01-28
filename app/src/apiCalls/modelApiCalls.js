import { modelList, modelDetailsList } from './modelApiMockData'

export function getModelApiCall() {
    return modelList;
}

export function getModelByIdApiCall(modId) {
    const mod = modelDetailsList.find(mod => mod._id === modId)
    return mod;
}