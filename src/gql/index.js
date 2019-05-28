export default ({ query, variables = null, token = null, locale = "en", __debug = true }) => {
  const method = "POST"
  // TODO: should come from class probably as configuration
  const url = "https://api.covergo.com/graphql"

  // If no query, return
  if (!query) console.error("There was no query to send")

  let json = JSON.stringify({ query, variables })

  return new Promise(function(resolve) {
    let r = new XMLHttpRequest()
    r.open(method, url)
    r.onreadystatechange = function() {
      if (r.readyState === XMLHttpRequest.DONE) {
        if (r.status >= 200 && r.status <= 404) {
          const res = JSON.parse(r.responseText)

          if (__debug) {
            console.group("%cCalling CoverGo API", "background: #03aeef; color: white; font-weight: bold; padding: 2px 4px; font-family: monospace;")

            console.log({ query })
            console.log({ variables })
            console.log(res)
            if (res.errors) console.log("%cThere is an error here!", "color: #CE0528; font-weight: bold;")

            // Stringified query and variables
            console.groupCollapsed("> Stringified")
            console.log(query + "\n" + JSON.stringify(variables))
            console.groupEnd()

            console.groupEnd()
          }
          // Resolve
          resolve(res)
        } else resolve({ errors: [{ message: "Network error from GQL" }] })
      }
    }

    // Set headers
    r.setRequestHeader("Content-type", "application/json")
    r.setRequestHeader("Accept-Language", `${locale}`)
    if (token) r.setRequestHeader("Authorization", `Bearer ${token}`)

    // Run
    r.send(json)
  })
}
