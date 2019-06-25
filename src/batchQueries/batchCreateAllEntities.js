import { createIndividual } from "../atomicQueries"
import { createObject } from "../atomicQueries"

const batchCreateAllEntities = async ({ payload, token, locale }) => {
  const { insuredPeople = [], insuredObjects = [], additionalPolicyHolder = null, holder } = payload;

  var holderIsOneOfInsured = holder.isOneOfInsured
  const holderCopy = JSON.parse(JSON.stringify(holder))
  delete holderCopy.isOneOfInsured
  delete holderCopy.relationshipToHolder

  const insuredPeopleCopy = JSON.parse(JSON.stringify(insuredPeople))

  insuredPeopleCopy.forEach(person => {
    delete person.relationshipToHolder
  });

  const res = await Promise.all([
    createIndividual({ variables: {createIndividualInput: holderCopy}, token, locale }),
    ...insuredPeopleCopy.map(item => createIndividual({ variables: {createIndividualInput: item}, token, locale })),
    ...insuredObjects.map(item => createObject({ variables: {createObjectInput: item}, token, locale })),
  ])
  
  // Check for errors
  if (res.find(batch => batch.errors)) return Promise.resolve({ errors: [...res.filter(batch => batch.errors)] })

  // Return object with created entities ids
  const individualsAndObjects = res.splice(1, res.length)
  const individuals = individualsAndObjects.filter(item => {
    return item.data.createIndividual
  })
  const objects = individualsAndObjects.filter(item => item.data.createObject)
  let individualsIds = individuals.map(item => item.data.createIndividual.createdStatus.id)
  const objectsIds = objects.map(item => item.data.createObject.createdStatus.id)
  const holderId = res[0].data.createIndividual.createdStatus.id
  if(holderIsOneOfInsured) {
    individualsIds = [holderId, ...individualsIds]
  }

  if (additionalPolicyHolder === null) {
    
    return Promise.resolve({
      holderId,
      individualsIds,
      objectsIds,
      otherHolderIds: null,
    })
  }

  // create otherHolders
  const createOtherHoldersResponse = await Promise.all([
    ...additionalPolicyHolder.map(item => createIndividual({ variables: {createIndividualInput: item}, token, locale }))
  ])

  // Check for errors
  if (createOtherHoldersResponse.find(batch => batch.errors)) return Promise.resolve({ errors: [...createOtherHoldersResponse.filter(batch => batch.errors)] })

  const otherHolders   = createOtherHoldersResponse.filter(item => item.data.createIndividual);
  const otherHolderIds = otherHolders.map(item => item.data.createIndividual.createdStatus.id);
  
  return Promise.resolve({
    holderId,
    individualsIds,
    objectsIds,
    otherHolderIds,
  })
}

export { batchCreateAllEntities }