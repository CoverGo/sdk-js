import { TagsFragment } from './tagsOnProduct'
import { ScoresFragment } from './scoresOnProduct'
import { PricesFragment } from './pricesOnProduct'
import { BenefitsFragment } from './benefitsOnProduct'
import { InsurerFragment } from './insurerOnProduct'

const ProductFragment = /* GraphQL */ `
  fragment Product on product {
    name
    productId {
      plan
      type
      version
    }

    ...Tags
    ...Scores
    ...Prices
    ...Benefits
    ...Insurer

    enrollmentUrl
  }
  ${
    `
    ${TagsFragment}
    ${ScoresFragment}
    ${PricesFragment}
    ${BenefitsFragment}
    ${InsurerFragment}
    `
  }
`

export { ProductFragment }