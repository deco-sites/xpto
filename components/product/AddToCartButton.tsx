import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

function AddToCartButton(
  { productId, price, discount, name }: UseAddToCartProps,
) {
  const props = useAddToCart({
    productId,
    price,
    discount,
    name,
  });

  return (
    <Button data-deco="add-to-cart" {...props} class="btn-primary">
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;
