import { TagsFragment, ScoresFragment, PricesFragment, BenefitsFragment, InsurerFragment } from "./";

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