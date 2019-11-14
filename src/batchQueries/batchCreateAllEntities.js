import { createIndividual } from "../atomicQueries"
import { createObject } from "../atomicQueries"


const inputTypeMappingForType = {
  individual: 'createIndividualInput',
  object: 'createObjectInput',
  company: 'createCompanyInput'
}

const functionMappingForType = {
  individual: createIndividual,
  object: createObject
}

const dataKeyMappingForType = {
  individual: 'createIndividual',
  object: 'createObject',
  company: 'createCompany'
}

const createEntityByType = async (entity, token, locale, options, __debug) => {
  const apiParams = {token, locale, options, __debug}
  const {entityType, tempId, isHolder, isOtherHolder, isInsured, links, ...baseEntity } = entity
  apiParams.variables = { [inputTypeMappingForType[entityType]]: baseEntity }
  const res = await functionMappingForType[entityType]({...apiParams})
  if(res.errors && res.errors.length) return { errors: res.errors, ...baseEntity }
  const systemId = await res.data[dataKeyMappingForType[entityType]].createdStatus.id
  return { systemId, ...entity }
}

const batchCreateAllEntities = async ({ payload, token, locale, options = { url: "https://api.covergo.com/graphql"}, __debug=false }) => {
  const createdEntities = await Promise.all(payload.entities
    .map(entity => createEntityByType(entity, token, locale, options, __debug))
  )

  // return top level errors if any created entity has errors
  if (createdEntities.find(entity => entity.errors && entity.errors.length)) {
    return Promise.resolve({ errors: [...createdEntities.reduce((acc, cur) => [...acc, ...cur.errors], [])]})
  }

  return Promise.resolve(createdEntities)
}

export { batchCreateAllEntities }