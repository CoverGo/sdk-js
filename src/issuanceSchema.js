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

    // When there are some policy level benefit options, we pass them here
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


   // entities includes individuals, companies and objects
   // includes type specific fields for all entities
  entities: [
    {
      tempId: 'holder1', // this is a schema only id to allow linking
      systemId: '1643251adf654sadf', // system generated entity id. only fill if updating individual
      entityType: 'individual', // company, object, individual
      isHolder: true, // bool
      isOtherHolder: false,// bool
      isInsured: true,// bool
      links: [
        {
          tempTargetId: 'holder2',
          link: 'owns', // 'spouse'
          values: [ // optional used to describe relationships
            { key: 'string', value: 'string' }
          ]
        }
      ],
      /**
       * Follows API schema for individual, object or company (check the schema!)
       */
      registrationNumber: null, // ONLY FOR COMPANIES
      natureOfBusiness: null, // ONLY FOR COMPANIES
      typeId: null, // ONLY FOR OBJECTS
      type: null, // sales pipeline status CUSTOMER, LEAD // ONLY FOR COMPANIES AND INDIVIDUALS
      englishFirstName: null, // individuals only
      englishLastName: null, // individuals only
      chineseFirstName: null, // individuals only
      chineseLastName: null, // individuals only
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
      acceptsMarketing: null, // ONLY FOR COMPANIES & INDIVIDUALS
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
    }
  ]
};
