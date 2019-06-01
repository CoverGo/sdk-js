const BenefitsFragment = /* GraphQL */ `
  fragment Benefits on product {
    benefits(typeIds: $benefitTypeIds) {
      options {
        benefitTypeId
        key
        detailedValue
      }
      parentTypeId
      rawData
      typeId
      value
      detailedValue
    }
  }
`

export {BenefitsFragment}