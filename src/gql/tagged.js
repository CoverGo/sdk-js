import fetch from 'cross-fetch'

const coverFetch = async ({query, variables = {}, token = '', locale = "en", __debug = false} ={}) => {
  try {
    const method = "POST"
    const url = "https://api.covergo.com/graphql"
    
    // if(!query) console.error("There was no query to send")

    let json = JSON.stringify({query, variables})

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
        "Authorization": `Bearer ${token}`
      },
      body: json
    }
    
    let res = await fetch(url, options)

    /* istanbul ignore next */
    // if (__debug) {
    //   console.group("%cCalling CoverGo API", "background: #03aeef; color: white; font-weight: bold; padding: 2px 4px; font-family: monospace;")
      
    //   console.log({ query })
    //   console.log({ variables })
    //   if (res.errors) console.log("%cThere is an error here!", "color: #CE0528; font-weight: bold;")

    //   // Stringified query and variables
    //   console.groupCollapsed("> Stringified")
    //   console.log(query + "\n" + JSON.stringify(variables))
    //   console.groupEnd()

    //   console.groupEnd()
    // }

    /* istanbul ignore next */
    if(res.status >= 400) {
      throw new Error('Network error from GQL')
    }

    return res.json()

  } catch(err) {
    return { errors: [{ message: err }]}
  }
}

function gql(strings, ...values) {
  let query = '';
  strings.forEach((string, i) => {
    query += string + (values[i] || '')
  })

  return ({variables, token, locale, __debug}) => coverFetch({query, variables, token, locale, __debug});
}

export { gql }