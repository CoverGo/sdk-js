const InsurerFragment = /* GraphQL */ `
  fragment Insurer on product {
    insurer {
      name
      id
      logoUrls{
        typeC
      }
    }
  }
`

export { InsurerFragment }