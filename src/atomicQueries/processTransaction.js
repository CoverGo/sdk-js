import { gql } from "../gql"

const processTransaction = gql`
	mutation processTransaction($transactionId: transactionId, $processTransactionInput: processTransactionInput!) {
		processTransaction {
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
