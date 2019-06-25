import { addLink } from "../atomicQueries";

const batchAddLinks = async ({ payload, policyId, createdEntities, token, locale, __debug = false }) => {
  
  // Connect all objects to holder
  const connectObjectsToHolder = payload.insuredObjects?.map((obj, i) =>
    addLink({ variables: {linkInput: { sourceId: createdEntities.objectsIds[i], link: "owns", targetId: createdEntities.holderId }}, token, locale, __debug })
  )

  // Create links for relationships between individuals and holder
  const createRelationshipsBetweenHolderAndIndividual = payload.insuredPeople?.filter(people => people.relationshipsToHolder).reduce(
    (acc, person, i) => [
      ...acc,
      ...person.relationshipsToHolder.map(relationship =>
        addLink({ variables: {linkInput: { sourceId: createdEntities.individualsIds[i], link: relationship, targetId: createdEntities.holderId }}, token, locale, __debug })
      ),
    ],
    []
  )

  const holderArray = [connectObjectsToHolder, createRelationshipsBetweenHolderAndIndividual];
  const connectionsToHolder = holderArray.filter(relationship => relationship !== undefined).reduce((acc, relationships) => [...acc, ...relationships], []);
  const res = await Promise.all(connectionsToHolder)
  if(__debug) console.log('connectionsToHolder', JSON.stringify(res))

  // If errors
  if (res.find(batch => batch.errors)) return Promise.resolve({ errors: [...res.filter(batch => batch.errors)] })
  return Promise.resolve(res)
}

export { batchAddLinks }