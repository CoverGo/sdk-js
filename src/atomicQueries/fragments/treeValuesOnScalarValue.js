const treeValuesFragment = /* GraphQL */ `
	fragment Value on scalarValue {
		booleanValue
		dateValue
		stringValue
		numberValue
	}

	fragment TreeValues on scalarValue {
		...Value
		arrayValue {
			...Value
			objectValue {
				key
				value {
					...Value
					arrayValue {
						...Value
						objectValue {
							key
							value {
								...Value
							}
						}
					}
				}
			}
		}
	}
`

export { treeValuesFragment }
