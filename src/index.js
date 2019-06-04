// import { benefitCategories, addFact, login, singleProduct } from './queries/'
// import * as covergoSDK from './queries/'
// console.log(covergoSDK)
// export { benefitCategories, addFact, login, singleProduct }
// export default {...covergoSDK}
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

export default covergoSDK