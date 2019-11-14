import { fetch } from 'cross-fetch'
// fix module dependencies

const coverFetch = async ({query, variables = {}, token = '', locale = "en", options = { url: "https://api.covergo.com/graphql"},  __debug = false, errorLocation = null} ={}) => {
  try {
    const method = "POST"
    const url = "https://api.covergo.com/graphql"
    
    if(!query) console.error("There was no query to send")

    let json = JSON.stringify({query, variables})

    const opts = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
        "Authorization": `Bearer ${token}`,
        ...options.headers && options.headers
      },
      body: json
    }
    
    let res = await fetch(options.url, opts)

    /* istanbul ignore next */
    if (__debug) {
      console.group("%cCalling CoverGo API", "background: #03aeef; color: white; font-weight: bold; padding: 2px 4px; font-family: monospace;")
      
      console.log({ query })
      console.log({ variables })
      if (res.errors) console.log("%cThere is an error here!", "color: #CE0528; font-weight: bold;")

      // Stringified query and variables
      console.groupCollapsed("> Stringified")
      console.log(query + "\n" + JSON.stringify(variables))
      console.groupEnd()

      console.groupEnd()
    }

    /* istanbul ignore next */
    if(res.status >= 400) {
      throw new Error('Network error from GQL')
    }

    let resData = await res.json()
    let errors = []
    if(errorLocation && typeof errorLocation === 'string') {  // resolve errors by following the given dotobject path (only simple paths, no arrays or bracket notation)
      errors = [...errorLocation.split(".").reduce((acc, cur) => acc[cur] || null, {...resData})]
    } else if(errorLocation && typeof errorLocation === 'function') {  // resolve errors through custom function
      errors =  [...errorLocation(resData)]
    } else if(!errorLocation && resData.data) { // resolve errors from top level results type of data object
      errors = [ ...Object.keys(resData.data).map(key => resData.data[key].errors || []).reduce((acc, cur) => [...acc, ...cur], []) ]
    }
    return Promise.resolve({
      ...resData,
      ...errors.length && {errors}, // conditionally replace the errors property if we found new errors at the field level
      ...errors.length && { otherErrors: resData.errors } // if we are replacing the errors array we move other errors to otherErrors property
    })

  } catch(err) {
    return { errors: [{ message: err }]}
  }
}

function gql(strings, ...values) {
  let query = '';
  strings.forEach((string, i) => {
    query += string + (values[i] || '')
  })

  const returnFn = ({variables, token, locale, options, __debug}) => coverFetch.call(this, {query, variables, token, locale, options, __debug});
  returnFn.withFieldErrorMapping = (errorLocation) => ({variables, token, locale, options, __debug}) => coverFetch({query, variables, token, locale, options, __debug, errorLocation: errorLocation || true})
  return returnFn
}

export { gql }