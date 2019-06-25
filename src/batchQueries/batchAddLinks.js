import { addLink } from "../atomicQueries";

const batchAddLinks = async ({ payload, policyId, createdEntities, token, locale }) => {
  console.log('**************************')
  console.log(JSON.stringify(payload.insuredPeople))
  console.log('**************************')
  console.log(JSON.stringify(createdEntities))
  console.log('**************************')

  // const allInsuredPeople = payload.holder.isOneOfInsured ? [payload.holder, ...payload.insuredPeople] : payload.insuredPeople
  // Connect all objects to holder
  const connectObjectsToHolder = payload.insuredObjects?.map((obj, i) =>
    addLink({ variables: {linkInput: { sourceId: createdEntities.objectsIds[i], link: "owns", targetId: createdEntities.holderId }}, token, locale })
  )

  // Create links for relationships between individuals and holder
  const createRelationshipsBetweenHolderAndIndividual = payload.insuredPeople?.filter(people => people.relationshipsToHolder).reduce(
    (acc, person, i) => [
      ...acc,
      ...person.relationshipsToHolder.map(relationship =>
        addLink({ variables: {linkInput: { sourceId: createdEntities.individualsIds[i], link: relationship, targetId: createdEntities.holderId }}, token, locale })
      ),
    ],
    []
  )

  const holderArray = [connectObjectsToHolder, createRelationshipsBetweenHolderAndIndividual];
  console.log(holderArray)
  const connectionsToHolder = holderArray.filter(relationship => relationship !== undefined).reduce((acc, relationships) => [...acc, ...relationships], []);
  console.log(connectionsToHolder)
  const res = await Promise.all(connectionsToHolder)
  console.log(JSON.stringify(res))

  // If errors
  if (res.find(batch => batch.errors)) return Promise.resolve({ errors: [...res.filter(batch => batch.errors)] })
  return Promise.resolve(res)
}

export { batchAddLinks }