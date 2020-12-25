import React from 'react'
import {
  apiRoot,
  STATUS_ERROR,
  STATUS_FAILURE,
  STATUS_SUCCESS,
} from '../constants'

const headers = {
  'Content-Type': 'application/json',
}

const authHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
}

// assigns the authorization token to the API Headers
export const updateHeaderToken = (token) => {
  headers.Authorization = token
}

const configDELETE = {
  headers,
  method: 'DELETE',
}

const configGET = {
  headers,
  method: 'GET',
}

const configPATCH = {
  headers,
  method: 'PATCH',
}

const configPOST = {
  headers,
  method: 'POST',
}

const configPUT = {
  headers,
  method: 'PUT',
}

const configAuthPOST = {
  headers: authHeaders,
  method: 'POST',
}

// handles the fetch promise resolution whether successful or not.
// if it's not successful, it will throw an error with
// the APIs given error message.
const fetchResponse = async (res) => {
  if (res.status == 302) {
    console.log('GOT A 302!!!')
    location.replace(res.headers.get('Location'))
    return
  }

  if (res.ok) {
    try {
      console.log('OK')
      return await res.json()
    } catch (err) {
      // no JSON
      return JSON.parse('[]')
    }
  }

  // 401 response - user was not authorized
  // 403 response - user is forbidden from the action they just tried.
  // A 403 should never happen in the UI so if the UI gets this response status,
  // it means the user's trying to do something sneaky. log them out!
  if (res.status === 401 || res.status === 403 || res.status === 504) {
    localStorage.removeItem('user')
    location.reload()
    return
  }

  // 504 - Gateway Timeout - server might be down
  // if (res.status === 504) {
  //     toastr.error('Unable to reach server. Please try again in a few minutes.')
  //     return
  // }

  const json = await res.json()
  const err = json.message || res.statusText
  const error = new Error(err)
  throw Object.assign(error, { res, json })
}

const fetchAuthResponse = async (res) => {
  if (res.status.toString().startsWith('5')) {
    console.error('Could not fetch auth response.')
    console.error(res)
    return {
      status: STATUS_ERROR,
      data: null,
    }
  }

  // 401 response - user was not authorized
  // 403 response - user is forbidden from the action they just tried.
  // a 403 should never happen in the UI so if the UI gets this response status,
  // it means the user's trying to do something sneaky. log them out!
  if (res.status === 401 || res.status === 403) {
    console.warn('in if 401 or 403')
    console.warn(res)
    // logout();
    localStorage.removeItem('user')
    return {
      status: STATUS_FAILURE,
      data: null,
    }
  }

  if (res.ok) {
    // request was successful
    const json = await res.json()
    return {
      status: STATUS_SUCCESS,
      data: json,
    }
  }

  // const json = await res.json()
  // const err = json.message || res.statusText
  // const error = new Error(err)
  // throw Object.assign(error, {res, json})
  // return
}

export const fetchWrapper = async (url, config = configGET, body) => {
  const res = await fetch(`${apiRoot}${url}`)
  console.log(res)
  return fetchResponse(res)
}

export const deleteWrapper = (url) => fetchWrapper(url, configDELETE)

export const patchWrapper = (url, body = '') =>
  fetchWrapper(url, configPATCH, JSON.stringify(body))

export const postWrapper = (url, body = '') =>
  fetchWrapper(url, configPOST, JSON.stringify(body))

export const putWrapper = (url, body) =>
  fetchWrapper(url, configPUT, JSON.stringify(body))

export const fetchAuthWrapper = async (url, body) => {
  try {
    const res = await fetch(`${apiRoot}${url}`, {
      ...configAuthPOST,
      body,
    })

    return fetchAuthResponse(res)
  } catch (err) {
    console.log('hello2')
    console.log('could not do auth fetch', err.message || 'uncaught error')
  }
}

export const postAuthWrapper = (url, body) => {
  console.log('Login Body', body)
  return fetchAuthWrapper(url, body)
}

// NOTE - The API will expect arrays in two different ways:
// ?foo=[1,2,3]
// and
// ?foo=1,2,3
// This depends on how that param is configured in the back end!
// If you need to convert an array and pass it as a comma spaced string of values,
// you can arr.join(',')
export const makeQueryString = (s) => {
  const t = typeof s !== 'string' ? JSON.stringify(s) : s
  return encodeURIComponent(t)
}

// when using the 2d search array in query params,
// use this method to quickly build the search criteria.
export const makeSearchObject = (
  field = null,
  value = null,
  operator = 'LIKE'
) =>
  value !== null && field !== null
    ? {
        field,
        operator,
        value,
      }
    : null

// builds a query string from the array of flags passed to it.
// this also adds an 'expires' query to prevent any sort of caching.
// this is because IE11 gets real clingy with the original responses
// despite the fetch headers telling it explicitly NOT to.
// eg of passing this a 2d "search" array:
// a = [{
//   field: 'search',
//   value: [{
//     field: 'companyId',
//     operator: 'EQ',
//     value: 3,
//   }]
// }]
export const assembleQuery = (a = []) => {
  a.push({
    field: 'expires',
    value: Date.now(),
  })

  return a.reduce((q, d, i) => {
    // separated for readability
    const s = !i ? '?' : '&'
    const f = d.field
    const v = makeQueryString(d.value)
    q += `${s}${f}=${v}`
    return q
  }, '')
}
