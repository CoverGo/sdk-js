import { gql } from "../gql"
import { PricesFragment } from "./fragments/pricesOnProduct"
import { recursiveValues } from "../atomicQueries/helpers/recursiveValues"

const initializeCheckout = gql`
	query initializeCheckout(
		$where: productWhereInput
		$values: [keyValueInput]
		$discountCodes: [String]
		$benefitOptions: [benefitOptionInput]
		$hasAdvisorId: Boolean = false
		$typeIds: [String]
	) {
		products: products_2(where: $where, values: $values) {
			list {
				name
				productId {
					plan
					type
					version
				}
				benefits(typeIds: $typeIds) {
					name
					typeId
					optionKey
					formattedValue: value
					value: value2 {
						${recursiveValues()}
					}
				}
				...Prices
				insurer {
					id
					name
					detailedName
					logoUrls {
						typeA
						typeB
						typeC
						typeD
						typeE
					}
				}
			}
		}
	}
	${PricesFragment}
`
export { initializeCheckout }
