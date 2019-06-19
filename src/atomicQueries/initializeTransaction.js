import { gql } from "../gql"

const initializeTransaction = gql`
	mutation initializeTransaction($initializeTransactionInput: initializeTransactionInput!) {
		initializeTransaction {
			errors
			value {
				token
				transactionId
				url
			}
		}
	}
`.withFieldErrorMapping()

export { initializeTransaction }
