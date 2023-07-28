import type { Context } from "$store/accounts/salesforce.ts";
import { createClient } from "$store/commerce/salesforce/client.ts";
import { ProductBaseSalesforce } from "$store/commerce/salesforce/types.ts";

export interface Props {
  productCode: string;
}

const loader = async (
  _props: Props,
  req: Request,
  ctx: Context,
): Promise<null | ProductBaseSalesforce> => {
  //get config from deco
  const { configSalesforce: config } = ctx;

  //get product id
  const { url: baseUrl } = req;
  const url = new URL(baseUrl);
  const ids = url.searchParams.get("ids");

  if (!ids) {
    return null;
  }

  //instace local client
  const client = createClient(config);

  //get the token
  const token = await client?.product.token("client_credentials");
  if (!token) {
    return null;
  }

  //get product
  const product = await client?.product.product(token.access_token, ids);

  if (!product) {
    return null;
  }

  return {
    ...product,
  };
};

export default loader;
