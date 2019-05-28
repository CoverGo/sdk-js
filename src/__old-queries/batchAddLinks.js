import addLink from "./addLink.js"

export default async ({ payload, policyId, createdEntities, token, locale }) => {
  // Connect all objects to holder
  const connectObjectsToHolder = payload.insuredObjects?.map((obj, i) =>
    addLink({ linkInput: { sourceId: createdEntities.objectsIds[i], link: "owns", targetId: createdEntities.holderId }, token, locale })
  )

  // Create links for relationships between individuals and holder
  const createRelationshipsBetweenHolderAndIndividual = payload.insuredPeople?.filter(people => people.relationshipsToHolder).reduce(
    (acc, person, i) => [
      ...acc,
      ...person.relationshipsToHolder.map(relationship =>
        addLink({ linkInput: { sourceId: createdEntities.individualsIds[i], link: relationship, targetId: createdEntities.holderId }, token, locale })
      ),
    ],
    []
  )

  const holderArray = [connectObjectsToHolder, createRelationshipsBetweenHolderAndIndividual];
  const connectionsToHolder = holderArray.filter(relationship => relationship !== undefined).reduce((acc, relationships) => [...acc, ...relationships], []);
  const res = await Promise.all(connectionsToHolder)

  // If errors
  if (res.find(batch => batch.errors)) return Promise.resolve({ errors: [{ message: "Unexpected error" }] })
  return Promise.resolve(res)
}