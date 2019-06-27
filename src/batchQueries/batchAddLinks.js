import { addLink } from "../atomicQueries";

const batchAddLinks = async ({ createdEntities, token, locale, __debug = false }) => {
  
  // process and add links
  const addLinksResults = await Promise.all(createdEntities.reduce((acc, {systemId, links = []}) => {
      if(!links.length) return acc
      return [...acc, ...links.map(currentLink => {
        return addLink({
          variables: {
            linkInput: {
              sourceId: systemId,
              link: currentLink.link,
              targetId: createdEntities.find(e => e.tempId === currentLink.tempTargetId).systemId
            }
          },
          token,
          locale,
          __debug
        })
      })]
    }, []))
  

  
  if(__debug) console.log('addLinksResults', JSON.stringify(addLinksResults))

  // If errors
  if (addLinksResults.find(batch => batch.errors)) return Promise.resolve({ errors: [...addLinksResults.filter(batch => batch.errors)] })
  return Promise.resolve(addLinksResults)
}

export { batchAddLinks }