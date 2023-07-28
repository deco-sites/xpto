import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createClient } from "$store/commerce/salesforce/client.ts";
import { getCookies } from "std/http/mod.ts";
import { Resolvable } from "$live/engine/core/resolver.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import type { Account } from "$store/accounts/salesforce.ts";

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
  const salesforceToken = cookies["SALESFORCE_TOKEN"];
  const client = createClient(configSalesforce);

  if (salesforceToken) {
    return res;
  }
  const token = await client?.product.token("client_credentials");

  res.headers.set("Set-Cookie", `SALESFORCE_TOKEN=${token?.access_token}`);
  return res;
};
