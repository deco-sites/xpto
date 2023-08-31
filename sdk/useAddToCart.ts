import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "salesforce-integration/hooks/useCart.ts";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";

export interface Options {
  productId: string;
  price: number;
  discount: number;
  /**
   * sku name
   */
  name: string;
}

export const useAddToCart = (
  { productId, price, discount, name }: Options,
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      isAddingToCart.value = true;
      await addItems({
        orderItems: [{ productId, quantity: 1 }],
      });

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            item_id: productId,
            quantity: 1,
            price,
            discount,
            item_name: name,
            item_variant: productId,
          }],
        },
      });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [productId]);

  return { onClick, loading: isAddingToCart.value };
};
