import gql from '../gql'

const query = /* GraphQL */ `
  query checkout(
    $where: productWhereInput
    $values:[keyValueInput]
    $discountCodes: [String]
    $benefitOptions: [benefitOptionInput]

    $hasAdvisorId: Boolean = false
    ) {
    products_2(where:$where values:$values) {
      list {
        name
        productId{
          plan
          type
          version
        }
        pricing(values: $values discountCodes: $discountCodes benefitOptions: $benefitOptions){
          formattedPrice
          originalPrice
          appliedDiscounts {
            code
            originalPrice
            formattedOriginalPrice
          }
          amount
          currencyCode

          indicativePrices @include(if: $hasAdvisorId) {
            type
            amount
            formattedPrice
          }
        }
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
            options{
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
              options{
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
        checkoutConfig {
          meta
          fields {
            actions {
              on
              payload
              targetId
              type
              values
            }
            autocomplete
            cssClass
            id
            mapTos {
              defaultValue
              key
              mapTo
            }
            options {
              name
              value
            }
            props
            text {
              headline
              subheadline
              placeholder
            }
            type
            validation
            initialValue
          }
          sections {
            fieldIds
            id
          }
        }
      }
    }
  }
`

export const checkoutConfig = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})