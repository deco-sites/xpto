import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type PaymentIcons =
  | "Visa"
  | "Elo"
  | "Mastercard"
  | "Visa"
  | "Pix"
  | "AmericanExpress"
  | "Boleto";

export type SocialIcons =
  | "Twitter"
  | "Linkedin"
  | "Pinterest"
  | "Youtube"
  | "Tiktok"
  | "WhatsApp"
  | "Instagram"
  | "Facebook"
  | "YouTubeOutline"
  | "WhatsAppOutline"
  | "InstagramOutline"
  | "FacebookOutline";

export type AvailableIcons =
  | "Apple"
  | "ArrowsPointingOut"
  | "ArrowRight"
  | "Bars3"
  | "BigCommerce"
  | "BuildingStore"
  | "Cart"
  | "Check"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ClockHour4"
  | "Cookie"
  | "CreditCard"
  | "Deco"
  | "DecoLogo"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Edit"
  | "Elo"
  | "Email"
  | "Equal"
  | "Eye"
  | "FilterList"
  | "Flame"
  | "Gift"
  | "Google"
  | "Hanger"
  | "HandPinch"
  | "Headset"
  | "Heart"
  | "Heart2"
  | "LayoutGrid1"
  | "LayoutGrid2"
  | "LayoutGrid3"
  | "LayoutGrid4"
  | "Link"
  | "List"
  | "Logo"
  | "Magento"
  | "Mail"
  | "MapPin"
  | "Mastercard"
  | "Message"
  | "Minus"
  | "Oracle"
  | "Phone"
  | "Photo"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Refresh"
  | "Reload"
  | "Return"
  | "Ruler"
  | "Salesforce"
  | "Search"
  | "Send"
  | "Share"
  | "Shopify"
  | "ShoppingCart"
  | "SocialLinkedin"
  | "SocialTwitter"
  | "Star"
  | "Star1"
  | "Tag"
  | "ThumbDown"
  | "ThumbUp"
  | "Trash"
  | "Truck"
  | "User"
  | "Visa"
  | "VTEX"
  | "XMark"
  | "Zoom";

export const IconsAvaliable = {
  Apple: "Apple",
  ArrowsPointingOut: "ArrowsPointingOut",
  ArrowRight: "ArrowRight",
  Bars3: "Bars3",
  BigCommerce: "BigCommerce",
  BuildingStore: "BuildingStore",
  Cart: "Cart",
  Check: "Check",
  ChevronDown: "ChevronDown",
  ChevronLeft: "ChevronLeft",
  ChevronRight: "ChevronRight",
  ChevronUp: "ChevronUp",
  ClockHour4: "ClockHour4",
  Cookie: "Cookie",
  CreditCard: "CreditCard",
  Deco: "Deco",
  DecoLogo: "DecoLogo",
  Diners: "Diners",
  Discord: "Discord",
  Discount: "Discount",
  Edit: "Edit",
  Elo: "Elo",
  Equal: "Equal",
  Eye: "Eye",
  Facebook: "Facebook",
  FilterList: "FilterList",
  Flame: "Flame",
  Gift: "Gift",
  Google: "Google",
  Hanger: "Hanger",
  HandPinch: "HandPinch",
  Headset: "Headset",
  Heart: "Heart",
  Heart2: "Heart2",
  Instagram: "Instagram",
  LayoutGrid1: "LayoutGrid1",
  LayoutGrid2: "LayoutGrid2",
  LayoutGrid3: "LayoutGrid3",
  LayoutGrid4: "LayoutGrid4",
  Link: "Link",
  Linkedin: "Linkedin",
  List: "List",
  Logo: "Logo",
  Magento: "Magento",
  Mail: "Mail",
  MapPin: "MapPin",
  Mastercard: "Mastercard",
  Message: "Message",
  Minus: "Minus",
  Oracle: "Oracle",
  Phone: "Phone",
  Photo: "Photo",
  Pix: "Pix",
  Plus: "Plus",
  QuestionMarkCircle: "QuestionMarkCircle",
  Refresh: "Refresh",
  Reload: "Reload",
  Return: "Return",
  Ruler: "Ruler",
  Salesforce: "Salesforce",
  Search: "Search",
  Send: "Send",
  Share: "Share",
  Shopify: "Shopify",
  ShoppingCart: "ShoppingCart",
  SocialLinkedin: "SocialLinkedin",
  SocialTwitter: "SocialTwitter",
  Star: "Star",
  Star1: "Star1",
  Tag: "Tag",
  ThumbDown: "ThumbDown",
  ThumbUp: "ThumbUp",
  Tiktok: "Tiktok",
  Trash: "Trash",
  Truck: "Truck",
  Twitter: "Twitter",
  User: "User",
  Visa: "Visa",
  VTEX: "VTEX",
  WhatsApp: "WhatsApp",
  XMark: "XMark",
  YouTube: "Youtube",
  Zoom: "Zoom",
  YouTubeOutline: "YouTubeOutline",
  WhatsAppOutline: "WhatsAppOutline",
  InstagramOutline: "InstagramOutline",
  FacebookOutline: "FacebookOutline",
  Email: "Email",
} as const;

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons | SocialIcons | PaymentIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
