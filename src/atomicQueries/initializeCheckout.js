import { gql } from "../gql"
import { PricesFragment } from "./fragments/pricesOnProduct"
import { TreeValuesFragment } from "./fragments/treeValuesOnScalarValue"

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
					typeId
					optionKey
					value2 {
						...TreeValues
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
	${TreeValuesFragment}
`
export { initializeCheckout }
