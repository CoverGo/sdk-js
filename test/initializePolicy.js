/**
 * @name initializePolicy
 * @description This will intialize policy.
 * It means it will create entities and all things first. After that it will create a quote with an offer on it.
 * There are 2 possible flows after that:
 *  1 Policy doesn't have manual underwriting thus we can convert offer
 *  2 Policy has manual underwriting thus we can't convert offer
 * @param {Object} input - defined input schema for initializePolicy
 * @param {Boolean} shouldConvertOffer - defines which flow to run
 */

import addLink from "./atomicQueries";

export default ({ input, shouldConvertOffer = true, token, locale }) => {
  return;

  // Based on input, it does lots of things:
  // 1 Traverse input object and create all entities (individuals, companies, objects) at once
  // 2 Create all links between entities - handle owns for objects as well
  // 3 Initialize policy - should create a quote with offer on it
  // 4 If shouldConvertOffer === true convert offer
  // 5 add paymentInfos

  // Should return some payload with created policyId and possible errors if any?
};
