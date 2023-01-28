import { departmentList, departmentDetailsList } from './departmentApiMockData'

export function getDepartmentApiCall() {
    return departmentList;
}

export function getDepartmentByIdApiCall(depId) {
    const dep = departmentDetailsList.find(dep => dep._id === depId)
    return dep;
}