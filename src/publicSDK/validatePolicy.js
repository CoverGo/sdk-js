const validatePolicy = async ({ policyId, token, locale }) => {
  const validator = await validatePolicyId({
    policyId,
    token,
    locale
  });

  if (validator.errors) return Promise.resolve({ errors: validator.errors });

  return Promise.resolve(true);
};