import { gql } from '../gql'

const benefitCategories = gql`
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

export { benefitCategories }