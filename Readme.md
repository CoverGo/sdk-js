# Usage

All query/mutation calls have a single parameter as an object that takes the following properties

```
{variables = {}, token = '', locale = "en", __debug = false, errorLocation = null}
```

The variables property must follow the inputTypes as defined in https://api.covergo.com/playground

<dl>
  <dt><strong>addLink</strong></dt>
  <dd></dd>
  <dt><strong>addFact</strong></dt>
  <dd></dd>
  <dt><strong>addOffer</strong></dt>
  <dd></dd>
  <dt><strong>benefitCategories</strong></dt>
  <dd></dd>
  <dt><strong>checkoutConfig</strong></dt>
  <dd></dd>
  <dt><strong>convertOffer</strong></dt>
  <dd></dd>
  <dt><strong>createIndividual</strong></dt>
  <dd></dd>
  <dt><strong>createObject</strong></dt>
  <dd></dd>
  <dt><strong>deleteEntity</strong></dt>
  <dd></dd>
  <dt><strong>getPrices</strong></dt>
  <dd></dd>
  <dt><strong>initializePayment</strong></dt>
  <dd></dd>
  <dt><strong>initializePolicy</strong></dt>
  <dd></dd>
  <dt><strong>login</strong></dt>
  <dd></dd>
  <dt><strong>processPaymentAndIssue</strong></dt>
  <dd></dd>
  <dt><strong>productListing</strong></dt>
  <dd>Returns a listing of available Products</dd>
  <dt><strong>singleProduct</strong></dt>
  <dd></dd>
  <dt><strong>upsertBenefitOption</strong></dt>
  <dd></dd>
  <dt><strong>validatePolicy</strong></dt>
  <dd></dd>
  <dt><strong>batchAddLinks</strong></dt>
  <dd></dd>
  <dt><strong>batchCreateAllEntities</strong></dt>
  <dd></dd>
  <dt><strong>batchInitializePolicy</strong></dt>
  <dd></dd>
  <dt><strong>createPolicy</strong></dt>
  <dd></dd>
  <dt><strong>createQuote</strong></dt>
  <dd></dd>

<dt><strong>gql</strong></dt>
<dd>

</dl>

# Contributing

### Commits

commit messages must follow our commit guidelines (based on Angular commit message conventions)

**Commit Message Format**

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

**Revert**

If the commit reverts a previous commit, it should begin with revert: , followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.

**Type**

Must be one of the following:

feat: A new feature (creates a MINOR (feature) RELEASE unless there is a breaking change)
fix: A bug fix (creates a PATCH RELEASE)
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
**Scope**

The scope could be anything specifying place of the commit change. For example products, insurers, etc...

You can use \* when the change affects more than a single scope.

**Subject**

The subject contains succinct description of the change:

use the imperative, present tense: "change" not "changed" nor "changes"
don't capitalize first letter
no dot (.) at the end
**Body**

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit closes.

Breaking Changes should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

Commits with breaking changes will automatically generate a MAJOR (breaking) RELEASE when pushed to master

### Releasing a new version

Simply push to master and the package will be built tested and released. Commit logs will automatically generate the new version, release notes and changelog.md
