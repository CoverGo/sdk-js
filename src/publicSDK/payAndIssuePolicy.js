import { processPaymentAndIssue } from "../atomicQueries";

const payAndIssuePolicy = async ({
  payload,
  paymentToken,
  policyId,
  token,
  locale
}) => {
  // ------------------------------------------------------------
  // 1 Process payment and issue
  // ------------------------------------------------------------
  const issuedPolicy = await processPaymentAndIssue({
    paymentInput: {
      policyId,
      amount: payload.policyParticulars.pricing.amount,
      currencyCode: payload.policyParticulars.pricing.currencyCode,
      userToken: paymentToken
    },
    token,
    locale
  });
  if (issuedPolicy.errors)
    return Promise.resolve({ errors: issuedPolicy.errors });

  // If all good, return policyStatus object
  return Promise.resolve(true);
};

export { payAndIssuePolicy }