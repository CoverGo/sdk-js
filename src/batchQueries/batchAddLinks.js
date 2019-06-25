import { addLink } from "../atomicQueries";

const batchAddLinks = async ({ payload, policyId, createdEntities, token, locale }) => {

  const allInsuredPeople = payload.holder.isOneOfInsured ? [payload.holder, ...payload.insuredPeople] : payload.insuredPeople
  // Connect all objects to holder
  const connectObjectsToHolder = payload.insuredObjects?.map((obj, i) =>
    addLink({ variables: {linkInput: { sourceId: createdEntities.objectsIds[i], link: "owns", targetId: createdEntities.holderId }}, token, locale })
  )

  // Create links for relationships between individuals and holder
  const createRelationshipsBetweenHolderAndIndividual = allInsuredPeople?.filter(people => people.relationshipsToHolder).reduce(
    (acc, person, i) => [
      ...acc,
      ...person.relationshipsToHolder.map(relationship =>
        addLink({ variables: {linkInput: { sourceId: createdEntities.individualsIds[i], link: relationship, targetId: createdEntities.holderId }}, token, locale })
      ),
    ],
    []
  )

  const holderArray = [connectObjectsToHolder, createRelationshipsBetweenHolderAndIndividual];
  const connectionsToHolder = holderArray.filter(relationship => relationship !== undefined).reduce((acc, relationships) => [...acc, ...relationships], []);
  const res = await Promise.all(connectionsToHolder)

  // If errors
  if (res.find(batch => batch.errors)) return Promise.resolve({ errors: [...res.filter(batch => batch.errors)] })
  return Promise.resolve(res)
}

export { batchAddLinks }