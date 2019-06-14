import { createIndividual } from "../atomicQueries"
import { createObject } from "../atomicQueries"

const batchCreateAllEntities = async ({ payload, token, locale }) => {
  const { insuredPeople = [], insuredObjects = [], additionalPolicyHolder = null, holder } = payload;
  // console.log(payload, insuredObjects); 
  const res = await Promise.all([
    createIndividual({ variables: {individualInput: holder}, token, locale }),
    ...insuredPeople.map(item => createIndividual({ variables: {individualInput: item}, token, locale })),
    ...insuredObjects.map(item => createObject({ variables: {createObjectInput: item}, token, locale })),
  ])

  // Check for errors
  if (res.find(batch => batch.errors)) return Promise.resolve({ errors: [{ message: "Unexpected error" }] })

  // Return object with created entities ids
  const individualsAndObjects = res.splice(1, res.length)
  const individuals = individualsAndObjects.filter(item => item.data.createIndividual)
  const objects = individualsAndObjects.filter(item => item.data.createObject)
  const individualsIds = individuals.map(item => item.data.createIndividual.createdStatus.id)
  const objectsIds = objects.map(item => item.data.createObject.createdStatus.id)

  if (additionalPolicyHolder === null) {
    // TODO: testing remove
    console.log({
      holderId: res[0].data.createIndividual.createdStatus.id,
      individualsIds,
      objectsIds,
      otherHolderIds: null,
    })
    
    return Promise.resolve({
      holderId: res[0].data.createIndividual.createdStatus.id,
      individualsIds,
      objectsIds,
      otherHolderIds: null,
    })
  }

  // create otherHolders
  const createOtherHoldersResponse = await Promise.all([
    ...additionalPolicyHolder.map(item => createIndividual({ variables: {individualInput: item}, token, locale }))
  ])

  if (createOtherHoldersResponse.find(batch => batch.errors)) return Promise.resolve({ errors: [{ message: "Unexpected error" }] })

  const otherHolders   = createOtherHoldersResponse.filter(item => item.data.createIndividual);
  const otherHolderIds = otherHolders.map(item => item.data.createIndividual.createdStatus.id);
  
  // TODO: testing remove
  console.log({
    holderId: res[0].data.createIndividual.createdStatus.id,
    individualsIds,
    objectsIds,
    otherHolderIds,
  })
  
  return Promise.resolve({
    holderId: res[0].data.createIndividual.createdStatus.id,
    individualsIds,
    objectsIds,
    otherHolderIds,
  })
}

export { batchCreateAllEntities }