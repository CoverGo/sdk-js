import { initializePolicy } from "../atomicQueries"

const batchInitializePolicy = async ({ payload, createdEntities, token, locale, __debug = false }) => {
  const { holderId, individualsIds, otherHolderIds = null,  objectsIds } = createdEntities

  // If policyHolder is one of insurers, add it to InsuredIds
  const insuredIds = [...individualsIds, ...objectsIds]
  if (payload?.holder.isOneOfInsured) insuredIds.push(holderId);

  // Construct benefit options arrays
  // Go through policyHolder.facts, insuredPeople.facts, inuredObjects.facts
  // and when fact has typeId, create benefit option
  //
  // Also go through policyParticulars.benefitOptions
  const benefitOptionsOfHolder = payload.holder.facts?.filter(fact => fact.benefitTypeId)
    .map(fact => { return { key: fact.type, typeId: fact.benefitTypeId, value: fact.value }})


  const benefitOptionsOfInsuredPeople = payload.insuredPeople?.filter(person => person.facts).reduce(
    (acc, person, i) => [
      ...acc,
      ...person.facts.filter(fact => fact.benefitTypeId).map(fact => {
        if (fact.benefitTypeId) return { key: fact.type, typeId: fact.benefitTypeId, value: fact.value }
      }),
    ],
    []
  )

  const benefitOptionsOfInsuredObjects = payload.insuredObjects?.filter(object => object.facts).reduce(
    (acc, obj, i) => [
      ...acc,
      ...obj.facts.filter(fact => fact.benefitTypeId).map(fact => {
        if (fact.benefitTypeId) return { key: fact.type, typeId: fact.benefitTypeId, value: fact.value }
      }),
    ],
    []
  )

  const benefitOptionsOfPolicyParticulars = payload.policyParticulars?.benefitOptions.map(option => {
    return  {
      key: option.type,
      typeId: option.benefitTypeId,
      value: option.value,
    }
  })


  const benefitOptionsArray = [benefitOptionsOfHolder, benefitOptionsOfInsuredPeople, benefitOptionsOfInsuredObjects, benefitOptionsOfPolicyParticulars];
  const benefitOptions = benefitOptionsArray.filter(option => option !== undefined).reduce((acc, options) => [...acc, ...options], []);

  // We are also passing these
  const { startDate, endDate, productId, pricing, referralCode, source, values } = payload.policyParticulars


  const initializePolicyInput = {
    holderId,
    insuredIds,
    // benefitOptions, 
    startDate, 
    endDate, 
    productId, 
    pricing, 
    referralCode, 
    source, 
    values, 
    otherHolderIds
  }
  
  // Initialize policy
  const res = await initializePolicy({
    variables: {initializePolicyInput},
    token,
    locale,
    __debug
  })

  if (res.errors) return Promise.resolve({ errors: res.errors })

  const policyId = res.data.initializePolicy.policyStatus.id

  return Promise.resolve(policyId)

}

export { batchInitializePolicy }