import { createPolicy } from "./";

const createQuote = async ({ payload, token, locale }) => {
  // Create quote is actually create policy without pricing and product
  // And adding offer to that policy where we put product and pricing

  // ------------------------------------------------------------
  // 1 Create policy
  // ------------------------------------------------------------
  // Remove pricing and product from original payload if they are there
  const policyId = await createPolicy({
    payload,
    token,
    locale,
    needsOfflineUnderwriting: true,
    __debug = false
  });
  if (policyId.errors) return Promise.resolve({ errors: policyId.errors });

  // If all good, return true
  return Promise.resolve(true);
};

export { createQuote }