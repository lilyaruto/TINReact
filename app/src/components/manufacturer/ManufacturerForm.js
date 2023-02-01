import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getManufacturerApiCall, getManufacturerByIdApiCall } from "../../apiCalls/manufacturerApiCalls"
import FormMode from "../../helpers/formHelper"
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import { checkRequired, checkTextLengthRange } from "../../helpers/validateCommon"
import { addManufacturerApiCall } from "../../apiCalls/addManufacturerApiCall"
import { updateManufacturerApiCall } from "../../apiCalls/updateManufacturerApiCall"

function ManufacturerForm() {
    const [man, setMan] = useState({
        'name': '',
        'parentCompany': '',
        'logo': ''
    })
    const [errors, setErrors] = useState({
        'name': '',
        'parentCompany': '',
        'logo': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { manId } = useParams()
    const currentFormMode = manId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    const allMans = getManufacturerApiCall()

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
        if (currentFormMode === FormMode.EDIT) {
          fetchManufacturerDetails()
        }
        if (redirect) {
          navigate('/manufacturer')
        }
      }, [redirect])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setMan({
            ...man,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Filed should contain from 2 to 60 characters.'
            }
        }
        if (fieldName === 'parentCompany') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Field should contain from 2 to 60 characters.'
            }
        }
        if (fieldName === 'logo') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Field is required.";
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = "Field should contain from 5 to 60 characters.";
            }
        }
        return errorMessage;
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addManufacturerApiCall(man)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateManufacturerApiCall(manId, man)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(man).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    const errorsSummary = hasErrors() ? 'Form contains errors.' : ''
    const fetchError = error ? `Error: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? 'New manufacturer' : 'Edit manufacturer'

    return (
        <div class="main_content" id="main_content_add-manufacturer">
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={ handleSubmit }>
            <FormInput
                type="text"
                label="Name"
                required
                error={errors['name']}
                name="name"
                placeholder="2-60 characters"
                onChange={handleChange}
                value={man['name']}
            />
            <FormInput
                type="text"
                label="Parent company"
                required
                error={errors['parentCompany']}
                name="parentCompany"
                placeholder="2-60 characters"
                onChange={handleChange}
                value={man['parentCompany']}
            />
            <FormInput
                type="text"
                label="Logo"
                required
                error={errors['logo']}
                name="logo"
                placeholder="300 characters"
                onChange={handleChange}
                value={man['logo']}
            />
            <FormButtons
                formMode={currentFormMode}
                error={globalErrorMessage}
                cancelPath="/manufacturer"
            />
            </form>
            <div id="manufacturer-add-row_submit" class="submit_msg"></div>
        </div>
    )
}

export default ManufacturerForm