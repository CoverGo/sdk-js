const recursiveValues = (layers = 4) => {
	const scalarValues = `
    booleanValue
		dateValue
		stringValue
		numberValue`

	const recursion = (layers, run = 0) => {
		if (run > layers) return scalarValues

		run++
		let output = scalarValues
		output += ` arrayValue{`
		output += recursion(layers, run)
		output += `}`
		output += ` objectValue{ key value{`
		output += recursion(layers, run)
		output += `}}`

		return output
	}

	return recursion(layers)
}

export { recursiveValues }
