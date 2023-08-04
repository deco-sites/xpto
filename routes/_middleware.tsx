import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Resolvable } from "$live/engine/core/resolver.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import type { Account } from "deco-sites/std/packs/salesforce/accounts/salesforce.ts";
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

export const authApi = async (
  config: Account,
  grant_type: "client_credentials" | "refresh_token",
  refresh_token?: string,
): Promise<TokenBaseSalesforce | null> => {
  const body = new URLSearchParams({ grant_type });

  if (grant_type == "refresh_token" && refresh_token) {
    body.append("refresh_token", refresh_token);
  }
  const response: unknown = await fetchAPI(
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

  if (!response) {
    return null;
  }
  return response as TokenBaseSalesforce;
};

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<LiveConfig<MiddlewareConfig, LiveState>>,
) => {
  const res = await ctx.next();
  const global = ctx.state?.global as GlobalMiddleware;
  const configSalesforce = global?.configSalesforce;

  if (!configSalesforce) {
    return res;
  }

  const cookies = getCookies(req.headers);
  const tokenExists = "token" in cookies;

  if (tokenExists) {
    return res;
  }

  const cc_nxExists = "cc-nx" in cookies;
  const cc_nx_gExists = "cc-nx-g" in cookies;
  let response: TokenBaseSalesforce | null = null;

  if (cc_nxExists || cc_nx_gExists) {
    const refreshToken = cc_nxExists ? cookies["cc-nx"] : cookies["cc-nx-g"];
    response = await authApi(configSalesforce, "refresh_token", refreshToken);
  } else {
    response = await authApi(configSalesforce, "client_credentials");
  }

  if (!response) {
    return res;
  }

  res.headers.set("Set-Cookie", `token=${response.access_token}`);
  res.headers.append(
    "Set-Cookie",
    `${response.id_token ? "cc-nx" : "cc-nx-g"}=${response.refresh_token}`,
  );

  return res;
};
