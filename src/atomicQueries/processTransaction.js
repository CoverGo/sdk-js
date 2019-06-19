import { gql } from "../gql"

const processTransaction = gql`
	mutation processTransaction($transactionId: String!, $input: processTransactionInput!, $tryIssue: Boolean) {
		processTransaction(transactionId: $transactionId, input: $input, tryIssue: $tryIssue) {
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
