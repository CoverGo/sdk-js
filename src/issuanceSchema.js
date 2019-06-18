// TODO:
// - Better error handling - network errors, graphql errors: https://itnext.io/the-definitive-guide-to-handling-graphql-errors-e0c58b52b5e1
// - Treeshakeable architecture
// x Easier structure to comprehend - have just atomic mutations and then big calls that combine more atomic mutations together
// x How to solve company is holder?
// x How to solve insuredCompanies?
// x New policy creation flows - create quote with converted offer or create quote with offer that is not converted - option what to do - Return proper ids etc...
// x We are assuming that objects belong to policy holder, is it a mistake? Probably yes, we should define somewhere which object belongs to whom - probably have objects field on entities itself
// x When creating people who are not customers - e.g. insureds - createIndividual with UNDEFINED to not polute clients
// x Facts, benefitOptions, values mess -> it's separated now, has to be populated twice for facts and benefit options - safer choice as we don't know what's coming for data in future
// x Add paymentInfo

// NOTE: problem with relationships - how to define it? If e.g. second insured is sister of holder, first insured is holder, third insured is brother of other holders one - do we need it?
// - for now enough is relationshipsToHolder and that will cover it, later on we can add more comprehensive relationship situation - you will have to define it in arrays based on indexes

// NOTE: Should we handle transactional things? If something fails, delete everything?
// - not now I guess, it can get rather tedious and increases complexity

export default {
  policyParticulars: {
    startDate: null,
    endDate: null,
    productId: {
      plan: "vhis_standard",
      version: null,
      type: "medical"
    },
    pricing: {
      amount: null,
      grossAmount: null,
      currencyCode: null,
      discountCodes: []
    },
    issuerNumber: null,
    source: null,
    referralCode: null,

    // When there are some benefit options, we pass them here
    // It follows API schema for benefitOptions on initializePolicy
    benefitOptions: [
      {
        benefitTypeId: "someBenfitTypeId",
        type: "keyHere",
        value: {
          stringValue: "stringValueHere"
        }
      }
    ],

    // It follows API schema for values on initializePolicy
    values: [],

    paymentInfos: [
      {
        // It follows API schema for addPaymentInfos except payorId
        name: null,
        startDate: null,
        endDate: null,
        comment: null,
        frequency: null,
        method: null,
        amount: null,
        currencyCode: null
        // payorId: null, this is not possible to have here as we would have to handle differently - e.g. belongsToHolder: true / belongsToOtherHolders: []...
      }
    ]
  },

  holder: {
    // This tells SDK if holder is also one of insured.
    // If so, it will create an individual whose id will be added to policyHolder and into insured array on initializePolicy mutation
    isOneOfInsured: true,

    // Partially Follows API addLink mutation - omitting targetId and sourceId, they will be figured out automatically by SDK
    // Sometimes we need to define "self" relationship, that's why we have relationshipsToHolder here
    relationshipsToHolder: [
      {
        link: null, // name of the link
        values: null // some additional info about the relationship
      }
    ],
    /**
     * Follows API schema
     */
    type: null, // UNDEFINED, CUSTOMER, LEAD ...
    englishFirstName: null,
    englishLastName: null,
    chineseFirstName: null,
    chineseLastName: null,
    dateOfBirth: null,
    gender: null,
    occupation: null,
    maritalStatus: null,
    employmentStatus: null,
    salutation: null,
    preferredCommunicationChannel: null,
    preferredLanguage: null,
    countryOfResidency: null,
    incomeRange: null,
    acceptsMarketing: null,
    nameFormat: null,
    photoUrl: null,
    source: null,
    internalCode: null,
    internalCodeLength: null,
    contacts: [
      { type: "email", value: "valustik@gmail.com" },
      { type: "telephoneNumber", value: "adasasd" }
    ],
    identities: [
      { type: "hkid", value: "1321231" },
      { type: "passport", value: "123123" }
    ],
    facts: [
      {
        type: "idOfFact",
        value: {
          stringValue: "test"
        }
      }
    ],
    addresses: [
      {
        type: "homeAddress",
        fields: [{ type: "adddress1", value: "Tuen Kueng Len 15" }]
      }
    ]
  },

  // If policy has some other policy holders, list it here
  otherHolders: [
    {
      // The same schema as policy holder above
    }
  ],

  // When polcyHolder is actually a company, use this
  // When policyHolder and policyHolderAsCompany are both populated, policyHolderAsCompany will be ignored
  holderAsCompany: {
    isOneOfInsured: true,
    /**
     * Follows API schema
     */
    type: null,
    registrationNumber: null,
    natureOfBusiness: null,
    acceptsMarketing: null,
    nameFormat: null,
    photoUrl: null,
    source: null,
    internalCode: null,
    internalCodeLength: null,
    addresses: [],
    facts: [],
    identities: [],
    contacts: []
  },

  otherHoldersAsCompany: [
    {
      // The same schema as policyHolderAsCompany
    }
  ],

  insuredPeople: [
    {
      relationshipsToHolder: [
        {
          link: null, // name of the link
          values: null // some additional info about the relationship
        }
      ],
      /**
       * Follows API schema
       */
      type: null,
      englishFirstName: null,
      englishLastName: null,
      chineseFirstName: null,
      chineseLastName: null,
      dateOfBirth: null,
      gender: null,
      occupation: null,
      maritalStatus: null,
      employmentStatus: null,
      salutation: null,
      preferredCommunicationChannel: null,
      preferredLanguage: null,
      countryOfResidency: null,
      incomeRange: null,
      acceptsMarketing: null,
      nameFormat: null,
      photoUrl: null,
      source: null,
      internalCode: null,
      internalCodeLength: null,
      contacts: [],
      identities: [],
      facts: [],
      addresses: []
    }
  ],

  insuredCompanies: [
    {
      /**
       * Follows API schema
       */
      type: null,
      registrationNumber: null,
      natureOfBusiness: null,
      acceptsMarketing: null,
      nameFormat: null,
      photoUrl: null,
      source: null,
      internalCode: null,
      internalCodeLength: null,
      addresses: [],
      facts: [],
      identities: [],
      contacts: []
    }
  ],

  // It will create these objects and they will be added in insured array on initializePolicy mutation
  insuredObjects: [
    {
      // It will addLink "owns" between created object and entity that owns this object
      // Object could technically belong to nobody so these would be unpopulated
      belongsToHolder: false,
      // indexes of other holder whose object it is; One object can belong to more people; if empty or null it will do nothing
      // E.g. belongsToOtherHolders: [0,1,4] = this object belongs to other holders on index 0,1,4 in the array otherHolders
      belongsToOtherHolders: [],
      belongsToHolderAsCompany: false,
      belongsToOtherHoldersAsCompany: [], // works the same as belongsToOtherHolders
      belongsToInsuredPeople: [], // works the same as belongsToOtherHolders
      belongsToInsuredCompanies: [], // works the same as belongsToOtherHolders

      // It follows API schema for createObject mutation
      typeId: null,
      nameFormat: null,
      photoUrl: null,
      source: null,
      internalCode: null,
      internalCodeLength: null,
      addresses: null,
      facts: null, // NOTE: values key of sub key must be 
      identities: null,
      contacts: null
    }
  ]
};
