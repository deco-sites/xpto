import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

export type SemanticColors =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "base"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface BagdeItem {
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Color
   * @default secondary
   */
  color?: SemanticColors;
  /**
   * @description Text Color
   * @default secondary
   */
  textColor?: SemanticColors;
}

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  alt: string;
  href: string;
  /**
   * @default primary
   */
  textColor?: SemanticColors;
  label?: string;
  text?: {
    reverse?: boolean;
    verticalAlignment?: "Top" | "Middle" | "Bottom";
    horizontalAlignment?: "Left" | "Center" | "Right";
    badges?: BagdeItem[];
    textButton?: string;
    /**
     * @default primary
     */
    buttonColor?: SemanticColors;
  };
  /** @title placement column */
  columnStart?: number;
  /** @title placement row */
  rowStart?: number;
  rowSpan?: number;
  colSpan?: number;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  itemsPerLine: {
    /**
     * @default 2
     * @title Lines on mobile
     */
    mobile?: 1 | 2;
    /**
     * @default 4
     * @title Lines on desktop
     */
    desktop?: 1 | 2 | 3 | 4 | 6 | 8;
  };
  itemsPerColumn: {
    /**
     * @default 2
     * @title Columns on mobile
     */
    mobile?: 1 | 2;
    /**
     * @default 2
     * @title Columns on desktop
     */
    desktop?: 1 | 2 | 3 | 4 | 6 | 8;
  };
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  columnGap: {
    /**
     * @default 2
     * @title Column gap on mobile
     */
    mobile?: 1 | 2;
    /**
     * @default 4
     * @title Column gap on desktop
     */
    desktop?: 1 | 2 | 3 | 4 | 6;
  };
  /** @default primary */
  hoverBackgroundColor?: SemanticColors;
  banners: Banner[];
}

export const MOBILE_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

export const DESKTOP_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const GRID_ROWS: Record<number, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

const GRID_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const GRID_COL_START: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
};

const GRID_ROW_START: Record<number, string> = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
  4: "row-start-4",
  5: "row-start-5",
  6: "row-start-6",
};

const GRID_ROW_SPAN: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};

const GRID_COL_SPAN: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
};

const GRID_GAP: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
};

const RADIUS_MOBILE = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const RADIUS_DESKTOP = {
  none: "sm:rounded-none",
  sm: "sm:rounded-sm",
  md: "sm:rounded-md",
  lg: "sm:rounded-lg",
  xl: "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  full: "sm:rounded-full",
};

const CONTENT_COLORS_BACKGROUND = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  neutral: "bg-neutral",
  base: "bg-base",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const CONTENT_COLORS = {
  primary: "text-primary group-hover:text-primary-content",
  secondary: "text-secondary group-hover:text-secondary-content",
  accent: "text-accent group-hover:text-accent-content",
  neutral: "text-neutral group-hover:text-neutral-content",
  base: "text-base group-hover:text-base-content",
  info: "text-info group-hover:text-info-content",
  success: "text-success group-hover:text-success-content",
  warning: "text-warning group-hover:text-warning-content",
  error: "text-error group-hover:text-error-content",
};

const BTN_COLORS = {
  primary: "btn btn-primary border-primary-content",
  secondary: "btn btn-secondary border-secondary-content",
  accent: "btn btn-accent border-accent-content",
  neutral: "btn btn-neutral border-neutral-content",
  base: "btn btn-base border-base-content",
  info: "btn btn-info border-info-content",
  success: "btn btn-success border-success-content",
  warning: "btn btn-warning border-warning-content",
  error: "btn btn-error border-error-content",
};

const BADGE_COLORS = {
  primary: "bg-primary text-primary-content group-hover:bg-primary-focus",
  secondary:
    "bg-secondary text-secondary-content group-hover:bg-secondary-focus",
  accent: "bg-accent text-accent-content group-hover:bg-accent-focus",
  neutral: "bg-neutral text-neutral-content group-hover:bg-neutral-focus",
  base: "bg-base text-base-content group-hover:bg-base-focus",
  info: "bg-info text-info-content group-hover:bg-info-focus",
  success: "bg-success text-success-content group-hover:bg-success-focus",
  warning: "bg-warning text-warning-content group-hover:bg-warning-focus",
  error: "bg-error text-error-content group-hover:bg-error-focus",
};

const VERTICAL_ALIGNMENT: Record<string, string> = {
  Top: "top-0",
  Middle: "top-1/2 -translate-y-1/2",
  Bottom: "bottom-0",
};

const HORIZONTAL_ALIGNMENT: Record<string, string> = {
  Left: "items-left",
  Center: "items-center",
  Right: "items-end",
};

export default function BannnerGrid({
  itemsPerColumn: itemsColumn,
  itemsPerLine,
  columnGap,
  borderRadius,
  hoverBackgroundColor,
  banners = [],
}: Props) {
  return (
    <section class="w-full md:px-0 mx-auto py-24">
      <div
        class={`flex flex-col grid-cols-auto lg:grid  ${
          GRID_GAP[columnGap?.desktop ?? 2]
        } ${GRID_COLUMNS[itemsColumn?.desktop ?? 2]} ${
          GRID_ROWS[itemsPerLine?.desktop ?? 1]
        }`}
      >
        {banners.map(
          (
            {
              href,
              srcMobile,
              alt,
              text,
              columnStart,
              rowStart,
              rowSpan,
              colSpan,
              label,
              textColor,
            },
            index,
          ) => (
            <div
              key={index}
              class={`group overflow-hidden relative
              ${GRID_ROW_START[rowStart ?? 0]}
              ${GRID_COL_START[columnStart ?? 0]}
              ${GRID_ROW_SPAN[rowSpan ?? 0]}
              ${GRID_COL_SPAN[colSpan ?? 0]}
              ${RADIUS_MOBILE[borderRadius.mobile ?? "none"]}
              ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]}
           `}
            >
              <a class="block relative h-full" href={href}>
                {text
                  ? (
                    <div
                      class={`w-full absolute flex z-20 md:p-10 p-5  ${
                        VERTICAL_ALIGNMENT[text.verticalAlignment ?? "Top"]
                      } ${text.reverse ? "flex-col-reverse" : "flex-col"} ${
                        HORIZONTAL_ALIGNMENT[text.horizontalAlignment ?? "Left"]
                      }`}
                    >
                      <span
                        class={`text-[40px]  md:text-7xl my-2 md:my-4 font-medium ${
                          CONTENT_COLORS[textColor ?? "primary"]
                        }`}
                      >
                        {label}
                      </span>
                      <ul class="flex flex-wrap gap-2 items-center justify-start">
                        {text?.badges?.length
                          ? text.badges.map((item) => (
                            <li
                              class={`${
                                BADGE_COLORS[item.textColor ?? "primary"]
                              } p-2 rounded-lg text-[10px] md:text-xs uppercase`}
                            >
                              {item.title}
                            </li>
                          ))
                          : null}
                      </ul>
                    </div>
                  )
                  : null}
                <img
                  class="w-full h-full"
                  src={srcMobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                  preload=""
                />
                <div
                  class={`max-lg:hidden transition-opacity duration-200 ease w-full h-full z-10 absolute top-0 left-0 opacity-0 group-hover:opacity-60 
                 ${
                    CONTENT_COLORS_BACKGROUND[
                      hoverBackgroundColor ?? "primary"
                    ]
                  }`}
                >
                  {text?.textButton
                    ? (
                      <button
                        class={`${
                          BTN_COLORS[text?.buttonColor ?? "primary"]
                        } border-[1px] px-8 bottom-10 right-10 absolute`}
                      >
                        {text?.textButton}
                        <Icon id="ArrowRight" width="22" height="22" />
                      </button>
                    )
                    : null}
                </div>
              </a>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
