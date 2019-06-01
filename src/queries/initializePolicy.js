const query = /* GraphQL */ `
mutation initializePolicy($policy: initializePolicyInput){
  initializePolicy(policy: $policy){
    status
    errors
    policyStatus{
      id
    }
  }
}`