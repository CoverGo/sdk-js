/* istanbul ignore next */
const singleProductVariables = {
  advisorId: 'myVhis',
  hasAdvisorId: true,
  productTypes: ["medical"],
  values:[
        {key: 'paymentFrequency', value: {stringValue: 'annual'}}, 
        {key: 'currencyCode', value: {stringValue: 'HKD'}}, 
        {key: 'insureds', value: {
          arrayValue: [{objectValue: [
            {key: 'age', value: {numberValue: 65}},
            {key: 'isSmoking', value: {booleanValue: false}},
            {key: 'gender', value: {stringValue: 'male'}}
          ]}]
        }}],
  where: {and: [{
    productId: {type: 'medical'}
  },{
    productId: {plan: 'S00018-01-000-01'}
  }]}
}

/* istanbul ignore next */
const multiproductvariables = {
  where: {and: [{productId: {type: 'medical'}}]},
  productTypes: ['medical'],
  values:[
    {key: 'paymentFrequency', value: {stringValue: 'annual'}}, 
    {key: 'currencyCode', value: {stringValue: 'HKD'}}, 
    {key: 'insureds', value: {
      arrayValue: [{objectValue: [
        {key: 'age', value: {numberValue: 65}},
        {key: 'isSmoking', value: {booleanValue: false}},
        {key: 'gender', value: {stringValue: 'male'}}
      ]}]
    }}]
}

/* istanbul ignore next */
export { singleProductVariables, multiproductvariables }