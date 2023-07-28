import type { ProductBaseSalesforce } from "$store/commerce/salesforce/types.ts";

export const toProduct = (
  product: ProductBaseSalesforce,
) => {
  const {
    primaryCategoryId,
    id,
    name,
    pageDescription,
    brand,
    imageGroups,
  } = product.data[0];

  /* const isVariantOf = level < 1 && masterProduct
    ? returnMasterToProduct(masterProduct)
    : undefined; */

  return {
    "@type": "Product",
    category: primaryCategoryId,
    productID: id,
    url: product.url,
    name: name,
    description: pageDescription,
    brand,
    sku: id,
    image: imageGroups.map(({ images }) => ({
      "@type": "ImageObject" as const,
      alternateName: images[0].alt ?? name,
      url: images[0].link,
    })),
  };
};
