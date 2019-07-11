const PricesFragment = /* GraphQL */ `
	fragment Prices on product {
		pricing(values: $values, benefitOptions: $benefitOptions, discountCodes: $discountCodes) {
			formattedPrice
			originalPrice
			formattedOriginalPrice
			amount
			currencyCode

			appliedDiscounts {
				calculationLogic
				code
				ratio
				flat
				order
				originalPrice
				formattedOriginalPrice
				formattedFlat
			}

			appliedTaxes {
				code
				name
				ratio
				flat
				order
				originalPrice
				formattedOriginalPrice
				formattedFlat
			}

			indicativePrices @include(if: $hasAdvisorId) {
				type
				amount
				currencyCode
				formattedOriginalPrice
				formattedPrice
				originalPrice

				appliedDiscounts {
					calculationLogic
					code
					ratio
					flat
					order
					originalPrice
					formattedOriginalPrice
					formattedFlat
				}

				appliedTaxes {
					code
					name
					ratio
					flat
					order
					originalPrice
					formattedOriginalPrice
					formattedFlat
				}
			}
		}
	}
`
export { PricesFragment }
