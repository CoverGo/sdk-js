const ScoresFragment = /* GraphQL */ `
fragment Scores on product {
  scores(advisorId: $advisorId values: $values) @include(if: $hasAdvisorId)  {
    id
    value
    name
  }
}
`

export { ScoresFragment }