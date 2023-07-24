import Icon, {
  AvailableIcons,
  PaymentIcons,
  SocialIcons,
} from "$store/components/ui/Icon.tsx";

export interface Props {
  cards: {
    heading: {
      title: string;
      icon?: AvailableIcons | SocialIcons | PaymentIcons;
    };
    content: {
      subtitle?: string;
      paragraphs?: string[];
    };
    links: {
      label: string;
      url: string;
      icon?: AvailableIcons | SocialIcons | PaymentIcons;
    }[];
  }[];
}

function CardsContent({ cards }: Props) {
  return (
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-[30px] pb-12">
      {cards.map((card) => (
        <div class="card card-bordered border-2 border-neutral-100">
          <div class="card-body">
            <div class="flex items-center gap-[10px] h-6 text-emphasis">
              <Icon id={card.heading.icon ?? "MapPin"} width={24} height={24} />
              <h6 class="font-medium">{card.heading.title}</h6>
            </div>
            <div class="flex flex-col gap-[2px] text-sm text-base-300">
              <span class="font-bold">{card.content.subtitle}</span>
              {card.content.paragraphs &&
                card.content.paragraphs.map((paragraph) => <p>{paragraph}</p>)}
            </div>
            <div class="flex flex-col gap-[6px] items-start font-bold text-base-content">
              {card.links.map((link) => (
                <a href={link.url} class="flex items-center gap-[10px] text-sm">
                  <Icon
                    id={link.icon ?? "Phone"}
                    width={18}
                    height={18}
                    strokeWidth={2}
                  />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsContent;
