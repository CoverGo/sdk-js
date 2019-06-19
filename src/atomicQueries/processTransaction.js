import { gql } from "../gql"

const processTransaction = gql`
	mutation processTransaction($transactionId: String!, $input: processTransactionInput!) {
		processTransaction(transactionId: $transactionId, input: $input) {
			errors
			status
			policyStatus {
				id
				status
			}
		}
	}
`.withFieldErrorMapping()

export { processTransaction }
