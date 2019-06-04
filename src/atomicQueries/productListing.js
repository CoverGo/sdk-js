import { gql } from '../gql'
import { ProductFragment } from './fragments/productOnProduct'
/**
 * This should be used for product listing page where there is more products
 * Will fetch product with benefitGraph - only one layer
 */

const productListing = gql`
  query listing(
    # TODO: tenantID should be removed after we factor out benefitInfos
    $tenantId: String = "vhis_uat"
    
    $where: productWhereInput
    $productTypes: [String]
    $values:[keyValueInput]
    $benefitOptions:[benefitOptionInput]
    $discountCodes: [String] = [""]
    $benefitTypeIds: [String] = [""]

    $productIds: productWhereInput
    $hasAdvisorId: Boolean = false
    $advisorId: String = ""
    ) {
    comparison: products_2 (
      where: $productIds
    ) {
      list {
        ...Product
      }
    }
    products: products_2 (
      where: $where
      values: $values
    ) {
      list {
        ...Product
      }
    }
    benefitInfos (tenantId: $tenantId productTypes: $productTypes){
      name
      type
      typeId
    }
    insurers (productTypes: $productTypes) {
      name
      detailedName
      id
    }
  }
  ${ProductFragment}
`

export { productListing }