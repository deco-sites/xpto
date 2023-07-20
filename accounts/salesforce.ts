import type { FnContext } from "$live/types.ts";

export interface Account {
  /**
   **@title Salesforce short code.
   * @description Salesforce account short code. For more info, read here: https://developer.salesforce.com/docs/commerce/commerce-api/guide/authorization-for-shopper-apis.html.
   */
  shortCode: string;

  /**
   * @title Site ID.
   * @description Identification of site in Salesforce.
   */
  siteId: string;

  /**
   * @title Organization ID.
   * @description Identification of the organization in Salesforce.
   */
  organizationId: string;

  /**
   * @title Client ID.
   * @description Identification of the client in Salesforce.
   */
  clientId: string;

  /**
   * @title Client Secret.
   * @description Password of the client.
   */
  clientSecret: string;
}

export type Context = FnContext<{
  configSalesforce?: Account;
}>;

function account(acc: Account) {
  return acc;
}

export default account;
