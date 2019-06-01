import gql from '../gql'

const query = /* GraphQL */ `
  query benefitCategories($productTypes: [String]){
    benefitCategories(productTypes: $productTypes){
      categories{
        name
        id
        description
        benefitTypeIds
      }
    }
  }
`

export const benefitCategories = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})