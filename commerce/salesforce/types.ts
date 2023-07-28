export interface ProductBaseSalesforce {
  limit: number;
  data: [
    {
      currency: "USD" | "BRL";
      id: string;
      brand?: string;
      imageGroups: ImageGroups[];
      inventory: Inventory;
      longDescription: string;
      master?: Master;
      minOrderQuantity: number;
      name: string;
      pageDescription?: string;
      pageTitle?: string;
      price: number;
      pricePerUnit: number;
      primaryCategoryId: string;
      shortDescription?: string;
      slugUrl: string;
      stepQuantity: number;
      type: Type;
      validFrom?: ValidFrom;
      variants?: Variants[];
      variationAttributes?: VariationAttributes[];
      c_isNewtest?: boolean;
      c_isSale?: boolean;
    },
  ];
  total: number;
  url: string;
}

export interface TokenBaseSalesforce {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_token_expires_in?: number;
  token_type?: "BEARER";
  usid?: string;
  customer_id?: string;
  enc_user_id?: string;
  idp_access_token?: string;
  idp_refresh_token?: string;
}

export interface Images {
  alt: string;
  disBaseLink: string;
  link: string;
  title: string;
}

export interface ImageGroups {
  images: Images[];
  viewType: "large" | "medium" | "small" | "swatch";
}

export interface Inventory {
  ats: number;
  backorderable: boolean;
  id: string;
  orderable: boolean;
  preorderable: boolean;
  stockLevel: number;
}

export interface Master {
  masterId: string;
  orderable: boolean;
  price: number;
}

export interface Type {
  master?: boolean;
  bundle?: boolean;
  variant?: boolean;
  item?: boolean;
  option?: boolean;
}

export interface ValidFrom {
  default: string;
}

export interface Variants {
  orderable: boolean;
  price: number;
  productId: string;
  variationValues: {
    color: string;
    size: string;
  };
}

export interface VariationAttributes {
  id: string;
  name: string;
  values: VariationAttributesValues[];
}

export interface VariationAttributesValues {
  name: string;
  orderable: boolean;
  value: string;
}
