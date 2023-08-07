import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Resolvable } from "$live/engine/core/resolver.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import { getCookies } from "std/http/mod.ts";
import { paths } from "deco-sites/std/packs/salesforce/utils/paths.ts";
import { TokenBaseSalesforce } from "deco-sites/std/packs/salesforce/types.ts";
import { encode } from "https://deno.land/std@0.195.0/encoding/base64.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

export interface MiddlewareConfig {
  /**
   * @description Configure your loaders global state.
   */
  state: Record<string, Resolvable>;
}

export interface GlobalMiddleware {
  configSalesforce?: Account;
  [key: string]: unknown;
}

export interface AuthAPIProps {
  config: Account;
  grantType: "client_credentials" | "refresh_token";
  refreshToken?: string;
}

export interface Account {
  siteId: string;
  organizationId: string;
  shortCode: string;
  clientId: string;
  clientSecret: string;
  publicStoreUrl: string;
  currency: string;
  locale: string;
}

const authApi = async (props: AuthAPIProps): Promise<TokenBaseSalesforce> => {
  const { config, grantType, refreshToken } = props;

  const body = new URLSearchParams({ "grant_type": grantType });

  if (grantType == "refresh_token" && refreshToken) {
    body.append("refresh_token", refreshToken);
  }
  const response: TokenBaseSalesforce = await fetchAPI(
    `${
      paths(config).shopper.auth.v1.organizations._organizationId.oauth2.token
    }`,
    {
      method: "POST",
      body: body,
      headers: {
        "Authorization": `Basic ${
          encode(config.clientId + ":" + config.clientSecret)
        }`,
        "content-type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response;
};

const setCookie = (
  token: TokenBaseSalesforce,
  res: Response,
  siteId: string,
) => {
  const {
    access_token,
    expires_in,
    refresh_token,
    usid,
    refresh_token_expires_in,
    id_token,
  } = token;

  const expireTokenDate = convertSecondsToDate(expires_in)
    .toUTCString();
  const expireRefTokenDate = convertSecondsToDate(refresh_token_expires_in)
    .toUTCString();

  res.headers.set(
    "Set-Cookie",
    `token_${siteId}=${access_token}; Expires=${expireTokenDate}; Path=/; Secure; HttpOnly;`,
  );

  res.headers.append(
    "Set-Cookie",
    `${
      id_token ? "cc-nx" : "cc-nx-g"
    }_${siteId}=${refresh_token}; Expires=${expireRefTokenDate}; Path=/; Secure; HttpOnly;`,
  );

  res.headers.append(
    "Set-Cookie",
    `usid_${siteId}=${usid}; Path=/; Secure; HttpOnly;`,
  );
};

const convertSecondsToDate = (seconds: number): Date => {
  const actualDate = new Date();
  return new Date(actualDate.getTime() + seconds * 1000);
};

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<LiveConfig<MiddlewareConfig, LiveState>>,
) => {
  const res = await ctx.next();
  const config: Account = {
    siteId: "RefArch",
    organizationId: "f_ecom_zzte_053",
    shortCode: "kv7kzm78",
    clientId: "da422690-7800-41d1-8ee4-3ce983961078",
    clientSecret: "D*HHUrgO2%qADp2JTIUi",
    publicStoreUrl:
      "https://zzte-053.dx.commercecloud.salesforce.com/s/RefArch",

    currency: "USD",
    locale: "en-US",
  };
  const cookies = getCookies(req.headers);
  const siteId = String(config?.siteId);

  if (`token_${siteId}` in cookies || !config) {
    return res;
  }

  const cc_nxCookie = cookies[`cc-nx_${siteId}`];
  const cc_nx_gCookie = cookies[`cc-nx-g_${siteId}`];

  if (cc_nxCookie || cc_nx_gCookie) {
    const refreshToken = cc_nxCookie ?? cc_nx_gCookie;

    const token = await authApi({
      config,
      grantType: "refresh_token",
      refreshToken,
    });
    setCookie(token, res, siteId);
    return res;
  }
  const token = await authApi({ config, grantType: "client_credentials" });
  setCookie(token, res, siteId);

  return res;
};
