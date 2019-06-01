const PricesFragment = /* GraphQL */ `
  fragment Prices on product {
    pricing(values: $values benefitOptions: $benefitOptions discountCodes: $discountCodes) {
      formattedPrice
      originalPrice

      appliedDiscounts {
        code
        ratio
        originalPrice
        formattedOriginalPrice
      }

      indicativePrices @include(if: $hasAdvisorId) {
        type
        amount
        formattedPrice
      }

      amount
      currencyCode
    }
  }
`
export { PricesFragment }