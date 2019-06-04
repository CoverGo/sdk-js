export {
  addLink,
  addFact,
  addOffer,
  benefitCategories,
  checkoutConfig,
  convertOffer,
  createIndividual,
  createObject,
  deleteEntity,
  getPrices,
  initializePayment,
  initializePolicy,
  login,
  processPaymentAndIssue,
  productListing,
  singleProduct,
  upsertBenefitOption,
  validatePolicy
} from './atomicQueries'

export { batchAddLinks, batchCreateAllEntities, batchInitializePolicy } from './batchQueries'

export { createPolicy, createQuote, payAndIssuePolicy } from './publicSDK'

import { gql } from './gql'

export default gql