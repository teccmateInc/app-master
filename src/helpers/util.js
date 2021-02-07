import moment from 'moment'


export function emailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export function passwordValidation(password) {
    const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')
    return re.test(String(password))
}

export function phoneValidation(phone) {
    const newPhone = phone.replace(/[^0-9]/g, '')
    return newPhone.length === 10 ? true : false
}

export function zipValidation(zip) {
    const newZip = zip.replace(/[^0-9]/g, '')
    return newZip.length === 5 ? true : false
}

export function phoneFormatter(value) {
    if (value) {
        const newPhone = value.replace(/[^0-9]/g, '')
        if (newPhone.length <= 10) {
            if (newPhone.length === 10) {
                return newPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
            } else {
                return newPhone
            }
        }
    }
    return ''
}

export function currencyFlatFormatter(value) {
    let formatValue = value ? value : 0
    return `$${Number(formatValue).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export function percentageFormatter(value) {
    if (value) {
        const roundValue = Math.round(value * 100) / 100
        return `${roundValue}%`
    }
    return '0%'
}

export function dateFormatter(value) {
    if (value) {
        return moment(value, 'YYYY-MM-DD').format('MM-DD-YYYY')
    }
    return ''
}

export function nullFormatter(value) {
    if (value) {
        return value
    }
    return ''
}

export function percentageDecimalFilter(value) {
    const singleDecimalNumber = value.toString().replace(/[^0-9.]|\.(?=.*\.)/g, '')
    const x = parseFloat(singleDecimalNumber)
    let filterValue = ''
    if (singleDecimalNumber === '.' || singleDecimalNumber === '0.' ||
        singleDecimalNumber === '.0' || singleDecimalNumber === '0.0') {
        filterValue = singleDecimalNumber
    } else {
        if (isNaN(x)) {
            filterValue = ''
        } else {
            if (x <= 0) {
                filterValue = 0
            } else {
                if (x >= 150) {
                    filterValue = 150
                } else {
                    if (x % 1 != 0) {
                        filterValue = parseFloat(x.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0])
                    } else {
                        filterValue = singleDecimalNumber
                    }
                }
            }
        }
    }

    return filterValue
}
