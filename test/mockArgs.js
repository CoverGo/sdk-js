/* istanbul ignore next */
const singleProductVariables = {
  advisorId: 'myVhis',
  hasAdvisorId: true,
  productTypes: ["medical"],
  values:[
        {key: 'paymentFrequency', value: {stringValue: 'annual'}}, 
        {key: 'currencyCode', value: {stringValue: 'HKD'}}, 
        {key: 'insureds', value: {
          arrayValue: [{objectValue: [
            {key: 'age', value: {numberValue: 65}},
            {key: 'isSmoking', value: {booleanValue: false}},
            {key: 'gender', value: {stringValue: 'male'}}
          ]}]
        }}],
  where: {and: [{
    productId: {type: 'medical'}
  },{
    productId: {plan: 'S00018-01-000-01'}
  }]}
}

/* istanbul ignore next */
const multiproductvariables = {
  where: {and: [{productId: {type: 'medical'}}]},
  productTypes: ['medical'],
  values:[
    {key: 'paymentFrequency', value: {stringValue: 'annual'}}, 
    {key: 'currencyCode', value: {stringValue: 'HKD'}}, 
    {key: 'insureds', value: {
      arrayValue: [{objectValue: [
        {key: 'age', value: {numberValue: 65}},
        {key: 'isSmoking', value: {booleanValue: false}},
        {key: 'gender', value: {stringValue: 'male'}}
      ]}]
    }}]
}

const mockIssuanceObject = {
  policyParticulars: {
    startDate: null,
    endDate: null,
    productId: {
      plan: "vhis_standard",
      version: "null",
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
    benefitOptions: [
      {
        benefitTypeId: "someBenefitTypeId",
        type: "keyHere",
        value: {
          stringValue: "stringValueHere"
        }
      }
    ],
    values: [],
    paymentInfos: [
      {
        name: null,
        startDate: null,
        endDate: null,
        comment: null,
        frequency: null,
        method: null,
        amount: null,
        currencyCode: null
      }
    ]
  }, 
  holder: {
    isOneOfInsured: true,
    relationshipsToHolder: [
      {
        link: null,
        values: null
      }
    ],
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
    contacts: [
      { type: "email", value: "alex@covergo.com"},
      { type: "telephoneNumber", value: "12345678"}
    ],
    identities: [
      { type: "hkid", value: "1234563" },
      { type: "passport", value: "123456789"}
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
        fields: [{ type: "address1", value: "Flat 7, 27/f Block C" }]
      }
    ]
  },
  otherHolders: [
    {same: "as above"}
  ],
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
      facts: null,
      identities: null,
      contacts: null
    }
  ]
}

const batchInitializePolicyVariables = {
  policyParticulars: {
    startDate: "2019-06-14T00:00:00.000Z",
    endDate: "2020-06-13T00:00:00.000Z",
    productId: {
      plan: "chubb_myhomeguard_occupier_plana",
      type: "home",
      version: null
    },
    // pricing: {
    //   amount: 665.4,
    //   currencyCode: "HKD",
    //   grossAmount: 665
    // },
    //  pricing should only be added if user has permission for overrideOffers (i.e. for crm, but not for coverQuote)
    referralCode: null,
    source: "COMPARISON",
    benefitOptions: [],
    values: [
      {
        key: "isOwner",
        value: {
          booleanValue: false
        }
      },
      {
        key: "isOccupier",
        value: {
          booleanValue: true
        }
      },
      {
        key: "insureds",
        value: {
          arrayValue: [
            {
              objectValue: [
                {
                  key: "ageOfBuilding",
                  value: {
                    numberValue: 17
                  }
                },
                {
                  key: "grossAreaInSqFt",
                  value: {
                    numberValue: 500
                  }
                },
                {
                  key: "buildingType",
                  value: {
                    stringValue: "multiStoreyBuilding"
                  }
                },
                {
                  key: "numberOfFloors",
                  value: {
                    numberValue: 4
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  },
  holder: {
    englishFirstName: "John",
    englishLastName: "Val",
    gender: "female",
    dateOfBirth: "1986-08-07",
    contacts: [
      {
        type: "email",
        value: "valustik@gmail.com"
      },
      {
        type: "telephoneNumber",
        value: "12345678"
      }
    ],
    identities: [
      {
        type: "hkid",
        value: "A1234563"
      }
    ],
    addresses: [
      {
        type: "address1",
        fields: [
          {
            type: "address1",
            value: "asdas asdasd"
          },
          {
            type: "address2",
            value: "asdasd"
          },
          {
            type: "address3",
            value: "9 Tong Chun St,"
          },
          {
            type: "district",
            value: "centralAndWestern"
          },
          {
            type: "territory",
            value: "kowloon"
          }
        ]
      }
    ]
  },
  insuredObjects: [
    {
      addresses: [
        {
          type: "address1",
          fields: [
            {
              type: "address1",
              value: "asdas asdasd"
            },
            {
              type: "address2",
              value: "asdasd"
            },
            {
              type: "address3",
              value: "9 Tong Chun St,"
            },
            {
              type: "district",
              value: "centralAndWestern"
            },
            {
              type: "territory",
              value: "kowloon"
            }
          ]
        }
      ],
      facts: [
        {
          type: "buildingType",
          values: {
            stringValue: "multiStoreyBuilding"
          }
        },
        {
          type: "grossAreaInSqFt",
          values: {
            numberValue: 500
          }
        },
        {
          type: "yearBuilt",
          values: {
            numberValue: 17
          }
        }
      ]
    }
  ]
}

const initalizeCheckoutVariables = {
    "discountCodes": [],
    "where": {
      "and": [
        {
          "productId": {
            "type": "home"
          }
        },
        {
          "productId": {
            "plan": "asia_superior_home_occupier_excellence"
          }
        },
        {
          "productId": {
            "version": null
          }
        }
      ]
    },
    "values": [
      {
        "key": "isOwner",
        "value": {
          "booleanValue": false
        }
      },
      {
        "key": "isOccupier",
        "value": {
          "booleanValue": true
        }
      },
      {
        "key": "insureds",
        "value": {
          "arrayValue": [
            {
              "objectValue": [
                {
                  "key": "ageOfBuilding",
                  "value": {
                    "numberValue": 17
                  }
                },
                {
                  "key": "grossAreaInSqFt",
                  "value": {
                    "numberValue": 500
                  }
                },
                {
                  "key": "buildingType",
                  "value": {
                    "stringValue": "multiStoreyBuilding"
                  }
                },
                {
                  "key": "numberOfFloors",
                  "value": {
                    "numberValue": 4
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "key": "home_worldwide_personal_belongings",
        "value": {
          "stringValue": "option_1"
        }
      },
      {
        "key": "home_domestic_helper",
        "value": {
          "stringValue": "option_1"
        }
      }
    ],
    "typeIds": [
      "home_worldwide_personal_belongings",
      "home_domestic_helper"
    ]
}

/* istanbul ignore next */
export { singleProductVariables, multiproductvariables, mockIssuanceObject, batchInitializePolicyVariables,initalizeCheckoutVariables }