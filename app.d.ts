/// <reference types="nativewind/types" />

interface ContactPoints {
  contactPointsEmail: {
    contactType: "PRO_EMAIL" | "TELE_EMAIL";
    email: string;
  }[];
  contactPointsPhone: {
    contactType: "PRO_MOB_PHONE" | "TELE_MOB_PHONE";
    telephone: string;
  }[];
}
interface Contact {
  id: string;
  contactPoints: ContactPoints;
  decisionLevel: [];
  endDate: string;
  influenceLevel: string;
  interactionLevel: string;
  isArchived: boolean;
  jobProfile: [];
  jobTitle: string;
  startDate: string;
  status: string;
  createdOn: string;
  isAnonymized: boolean;
  modifiedOn: string;

  organization: {
    individualType: string;
    legalName: string;
    organizationType: string;
    address: {
      addressCountryRdmId: string;
      addressLocality: string;
      addressRegionRdmId: string;
      addressCountryGroupRdmId: string;
      addressGeoGroupRdmId: string;
      addressGeoRdmId: string;
    };
    legalEntity: {
      id: string;
      registeredName: string;
    };
  };
  person: {
    id: string;
    familyName: string;
    givenName: string;
    lastActivityDate: string;
    localFamilyName: [];
    localGivenName: [];
    title: string;
  };
}
