import { gql } from "../gql"

const initializeTransaction = gql`
	mutation initializeTransaction($input: initializeTransactionInput!) {
		initializeTransaction(input: $input) {
			errors
			value {
				httpMethod
				token
				transactionId
				url
				parameters {
					objectValue {
						key
						value {
							stringValue
							numberValue
							booleanValue
							dateValue
						}
					}
				}
			}
		}
	}
`.withFieldErrorMapping()

export { initializeTransaction }
