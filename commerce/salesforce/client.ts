import { Account } from "$store/accounts/salesforce.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import {
  ProductBaseSalesforce,
  TokenBaseSalesforce,
} from "$store/commerce/salesforce/types.ts";
import { encode } from "https://deno.land/std@0.195.0/encoding/base64.ts";

export interface FetcherProps {
  token?: string;
  grantType?:
    | "authorization_code"
    | "refresh_token"
    | "refresh_token"
    | "authorization_code_pkce"
    | "session_bridge"
    | "client_credentials";
  productId?: string;
}

export const createClient = (params: Account | undefined) => {
  if (!params) return;
  const { shortCode, siteId, organizationId, clientId, clientSecret } = params;
  const BASE_URL = `https://${shortCode}.api.commercecloud.salesforce.com`;

  const productFetcher = <T>(
    method: "GET",
    props: FetcherProps,
  ) => {
    try {
      const { token, productId } = props;
      const urlString =
        `${BASE_URL}/product/shopper-products/v1/organizations/${organizationId}/products?siteId=${siteId}&ids=${productId}`;

      return fetchAPI<T>(
        new URL(
          urlString,
          `${BASE_URL}/product/shopper-products/v1/organizations/${organizationId}/products`,
        ),
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const tokenFetcher = <T>(
    method: "POST",
    props: FetcherProps,
  ) => {
    try {
      const { grantType } = props;
      const urlString =
        `${BASE_URL}/shopper/auth/v1/organizations/${organizationId}/oauth2/token`;

      return fetchAPI<T>(
        new URL(
          urlString,
          `${BASE_URL}/shopper/auth/v1`,
        ),
        {
          body: new URLSearchParams({ grant_type: String(grantType) }),
          method,
          headers: {
            "Authorization": `Basic ${encode(clientId + ":" + clientSecret)}`,
            "content-type": "application/x-www-form-urlencoded",
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const getToken = (
    grantType:
      | "authorization_code"
      | "refresh_token"
      | "refresh_token"
      | "authorization_code_pkce"
      | "session_bridge"
      | "client_credentials",
  ) => {
    return tokenFetcher<TokenBaseSalesforce>("POST", {
      grantType,
    });
  };

  const getProduct = async (token: string, productId: string) => {
    const product = await productFetcher<ProductBaseSalesforce>("GET", {
      token,
      productId,
    });
    return product;
  };

  return {
    product: {
      token: getToken,
      product: getProduct,
    },
  };
};

//`${BASE_URL}/shopper/auth/v1/organizations/${organizationId}/oauth2/token`;
