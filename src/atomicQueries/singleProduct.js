import { gql } from "../gql"
import { PricesFragment } from "./fragments/pricesOnProduct"
/**
 * This should be used for product listing for single layout as well as for product detail
 * Will fetch products using benefitGraph field + will fetch benefitInfos
 * From this query client can compose benefitTree with naming coming from benefitInfos
 * BenefitGraph goes 3 layers down only
 */

const singleProduct = gql`
	query single(
		$where: productWhereInput
		$productTypes: [String]
		$values: [keyValueInput]
		$discountCodes: [String]
		$hasAdvisorId: Boolean = false
		# TODO: tenantID should be removed after we factor out benefitInfos
		$tenantId: String = "vhis_uat"
	) {
		products: products_2(where: $where, values: $values) {
			list {
				name
				productId {
					plan
					type
					version
				}
				...Prices
				insurer {
					name
					logoUrls {
						typeC
					}
				}
				majorExclusions
				importantNotes
				termsAndConditionsUrl
				applicationFormUrl
				enrollmentUrl
				brochureUrl
				premiumTableUrl
				benefitGraph {
					typeId
					value
					#TODO: 'name' should be removed name after refactoring of sinle product layout done
					# Single product layout component should accept prop benefitInfo so that it can compose the tree with naming
					name
					detailedValue
					isOptional
					options {
						name
						optionKey
						value
						typeId

						children {
							typeId
							value
							optionKey
							name
						}
					}
					children {
						typeId
						value
						detailedValue
						isOptional
						options {
							name
							optionKey
							value
							typeId
						}
						#TODO: 'name' should be removed name after refactoring of sinle product layout done
						# Single product layout component should accept prop benefitInfo so that it can compose the tree with naming
						name
						children {
							typeId
							value
							detailedValue
							isOptional
							options {
								name
								optionKey
								value
								typeId
							}
							#TODO: 'name' should be removed name after refactoring of sinle product layout done
							# Single product layout component should accept prop benefitInfo so that it can compose the tree with naming
							name
						}
					}
				}
			}
		}
		benefitInfos(tenantId: $tenantId, productTypes: $productTypes) {
			name
			description
			type
			typeId
		}
		benefitCategories(productTypes: $productTypes) {
			categories {
				name
				id
				description
				benefitTypeIds
			}
			productType
		}
	}
	${PricesFragment}
`
export { singleProduct }
