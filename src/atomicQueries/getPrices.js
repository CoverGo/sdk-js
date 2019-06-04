import { gql } from '../gql'
import { PricesFragment } from './fragments/pricesOnProduct'
/**
 * This should be used for product listing for single layout as well as for product detail
 * Will fetch products using benefitGraph field + will fetch benefitInfos
 * From this query client can compose benefitTree with naming coming from benefitInfos
 * BenefitGraph goes 3 layers down only
 */

const getPrices = gql`
  query single(
    $where: productWhereInput
    $values:[keyValueInput]
    $discountCodes: [String]
    $benefitOptions: [benefitOptionInput]

    $hasAdvisorId: Boolean = false
    ) {
    products: products_2(where:$where values:$values) {
      list {
        name
        productId{
          plan
          type
          version
        }
        ...Prices
        insurer {
          name
          logoUrls{
            typeC
          }
        }
      }
    }
  }
  ${PricesFragment}
`
export { getPrices }