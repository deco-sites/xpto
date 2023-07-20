import type { SectionProps } from "$live/types.ts";

import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export type TextAlign = "Left" | "Center" | "Right" | "Justify";

export const TEXT_ALIGMENT: Record<TextAlign, string> = {
  "Left": "text-left",
  "Center": "text-center",
  "Right": "text-right",
  "Justify": "text-justify",
};

export interface Category {
  /** @description RegExp to enable this text category on the current URL. Use /feminino/* to display this text category on feminino category  */
  matcher: string;
  page: LoaderReturnType<ProductListingPage | null>;

  /**
   * @title Description
   * @format html
   */
  html?: string;
  textAlign?: TextAlign;
}

function CategoryText(
  { category }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!category) {
    return null;
  }

  const categoryText = category?.page?.breadcrumb
    ?.itemListElement[category?.page?.breadcrumb?.itemListElement.length - 1]
    ?.name;

  const { html, textAlign } = category;

  const textAlignment = TEXT_ALIGMENT[textAlign ? textAlign : "Center"];

  return (
    <div class={`container ${textAlignment}`}>
      <h3 class="text-secondary max-w-5xl m-auto font-normal text-2xl mb-5">
        {categoryText}
      </h3>
      {html
        ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            class="text-neutral font-normal text-sm max-w-5xl m-auto pb-12"
          />
        )
        : null}
    </div>
  );
}

export interface Props {
  categories?: Category[];
}

export const loader = ({ categories = [] }: Props, req: Request) => {
  const category = categories.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { category };
};

export default CategoryText;
