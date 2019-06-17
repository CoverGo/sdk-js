import { batchCreateAllEntities, batchInitializePolicy, batchAddLinks } from "../batchQueries";
import { addOffer, convertOffer } from "../atomicQueries";

const createPolicy = async ({
  variables,
  token,
  locale,
  needsOfflineUnderwriting
}) => {
  const payloadForQuote = JSON.parse(JSON.stringify(variables))
  if (
    payloadForQuote.policyParticulars.pricing !== undefined &&
    payloadForQuote.policyParticulars.productId !== undefined
  ) {
    delete payloadForQuote.policyParticulars.pricing
    delete payloadForQuote.policyParticulars.productId
  }

  // ------------------------------------------------------------
  // 1 Create all entities
  // ------------------------------------------------------------
  const createdEntities = await batchCreateAllEntities({
    payload: payloadForQuote,
    token,
    locale,
    __debug: false
  });
  if (createdEntities.errors)
    return Promise.resolve({ errors: createdEntities.errors });

  // ------------------------------------------------------------
  // 2 Initialize policy
  // ------------------------------------------------------------
  const policyId = await batchInitializePolicy({
    payload: payloadForQuote,
    createdEntities,
    token,
    locale
  });
  if (policyId.errors) return Promise.resolve({ errors: policyId.errors });

  // ------------------------------------------------------------
  // 3 Create facts and links
  // ------------------------------------------------------------
  const createdLinks = await batchAddLinks({
    payload: payloadForQuote,
    policyId,
    createdEntities,
    token,
    locale
  });
  if (createdLinks.errors)
    return Promise.resolve({ errors: createdLinks.errors });

  // ------------------------------------------------------------
  // 4 Add offer to that policy return policy Id if needsOfflineUnderwriting === true
  // ------------------------------------------------------------
  const { productId, pricing } = variables.policyParticulars;
  const offerInput = {
    productId,
    premium: pricing
    // ...pricing?.discountCodes && {premium: { discountCodes: pricing.discountCodes }} // pricing should be added to maptos from crm to allow overrides, but not from coverquote
  };
  const createdOffer = await addOffer({ variables: {policyId, offerInput}, token, locale });
  
  if (createdOffer.errors)
    return Promise.resolve({ errors: createdOffer.errors });

  const offerId = createdOffer.data.addOffer.createdStatus.id
  
  if (needsOfflineUnderwriting) return Promise.resolve({ policyId });

  // ------------------------------------------------------------
  // 5 convert offer to quote
  // ------------------------------------------------------------
  const convertedOffer = await convertOffer({
    variables: {
      policyId,
      offerId
    },
    token,
    locale
  });
  if (convertedOffer.errors)
    return Promise.resolve({ errors: convertedOffer.errors });

  // If all good, return policyId
  return Promise.resolve({ policyId });
}

export { createPolicy }