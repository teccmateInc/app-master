import stateCodes from 'constants/stateCodes'

// value is a string
// this takes value and determines if it is a substring
// of either a state code or a state's fully name.
// For example, if the user typed "T" or "te",
// this will return ['TX','TN']
// but if the user types "tex", it will
// only return ['TX']

const getStateCodes = value => {
    const v = value.trim().toLowerCase()
    const matchedCodes = []

    if (v.length === 0) {
        return matchedCodes
    }

    // if the length is greater than 2, we know we're not dealing with a
    // state code. store this so we know if we can skip that or not.
    const checkStateCode = v.length <= 2

    // loop over the stateCodes map.
    // check for a match with both the state code and name
    Object.entries(stateCodes).forEach(([stateCode, stateName]) => {
        if (
            (checkStateCode && stateCode.toLowerCase().startsWith(v)) ||
            stateName.toLowerCase().startsWith(v)
        ) {
            matchedCodes.push(stateCode)
        }
    })

    return matchedCodes
}

export default getStateCodes
