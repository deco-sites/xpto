import Icon from "$store/components/ui/Icon.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { SocialItem } from "$store/components/footer/SocialNetWorks.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Button from "$store/components/ui/Button.tsx";

export interface Props {
  serviceInfo?: {
    title: string;
    /**
     * @description Email for company contact
     */
    email: string;
    /**
     * @description Phone number for company contact
     */
    phone: string;
    /**
     * @description Schedule for company contact
     */
    schedule: string[];
  };
  /**
   * @description Banner image that stays on top of the contact form
   */
  image: LiveImage;
  /**
   * @description Alternative text description for the image
   */
  alt: string;
  socialNetworks?: SocialItem[];
}

const defaultSocialNetworks: SocialItem[] = [
  {
    href: "https://www.facebook.com/agencian1",
    icon: "Facebook",
    label: "Facebook",
  },
  {
    href: "https://twitter.com/agencian1",
    icon: "Twitter",
    label: "Twitter",
  },
  {
    href: "https://www.instagram.com/agencian1",
    icon: "Instagram",
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/channel/agencian1",
    icon: "Youtube",
    label: "Youtube",
  },
  {
    href: "https://www.tiktok.com/@agencian1",
    icon: "Tiktok",
    label: "TikTok",
  },
];

const defaultServiceInfo = {
  title: "Atendimento",
  email: "contato@agencian1.com.br",
  phone: "11 99999-9999",
  schedule: [
    "Seg. à Sex. das 09:00h às 18:00h",
    "Sábado das 10:00h às 14:00h",
  ],
};

function ContactForm({
  image,
  alt,
  serviceInfo = defaultServiceInfo,
  socialNetworks = defaultSocialNetworks,
}: Props) {
  return (
    <div class="pb-12 lg:pb-20">
      <div class="flex flex-col">
        <div class="lg:flex lg:gap-[10px]">
          <div class="lg:py-10 lg:px-[30px] lg:w-full">
            {/* Contact info */}
            <div class="flex flex-col gap-5 py-5 border-b border-neutral-100">
              <h6 class="font-medium">{serviceInfo.title}</h6>
              <div class="flex flex-col gap-[10px] text-sm font-bold text-emphasis">
                <div class="flex">
                  <Icon id="Phone" class="w-5 h-5 mr-[10px]" />
                  <span>{serviceInfo.phone}</span>
                </div>
                <div class="flex">
                  <Icon id="Mail" class="w-5 h-5 mr-[10px]" />
                  <span>{serviceInfo.email}</span>
                </div>
                <div class="text-base-300 font-normal">
                  {serviceInfo.schedule.map((schedule) => <p>{schedule}</p>)}
                </div>
              </div>
            </div>

            {/* Social networks */}
            <div class="flex flex-col py-5 gap-5">
              <h6 class="font-medium">Redes sociais</h6>
              <ul class="flex gap-3">
                {socialNetworks.map((social) => (
                  <li
                    key={social.icon}
                    class="bg-base-300 w-8 h-8 rounded-full hover:bg-emphasis transition-all duration-500"
                  >
                    <a
                      href="#"
                      class="flex items-center justify-center w-full h-full text-white"
                      target="_blank"
                      aria-label={social.label}
                    >
                      <Icon id={social.icon} size={20} strokeWidth={1} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact image */}
          <div>
            <Picture>
              <Source
                media="(max-width: 1023px)"
                fetchPriority="auto"
                src={image}
                width={280}
                height={187}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority="auto"
                src={image}
                width={430}
                height={328}
              />
              <img
                class="object-cover rounded-[20px] w-full max-w-sm lg:w-auto lg:max-w-md"
                loading="lazy"
                src={image}
                alt={alt}
              />
            </Picture>
          </div>
        </div>

        {/* Contact form */}
        <div class="mt-[30px] flex flex-col gap-5">
          <h6 class="font-medium">Formulário de atendimento</h6>
          <form class="text-sm flex flex-col gap-5">
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-300" htmlFor="nome">
                  Nome completo
                </label>
                <input
                  placeholder="Digite aqui"
                  name="nome"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-base-200"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-300" htmlFor="email">
                  E-mail
                </label>
                <input
                  placeholder="Digite aqui"
                  name="email"
                  type="email"
                  class="input input-bordered input-xs h-[34px] border-2 border-base-200"
                />
              </div>
            </div>
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-300" htmlFor="ddd">
                  Telefone
                </label>
                <div class="flex gap-[10px]">
                  <input
                    placeholder="DDD"
                    name="ddd"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-16 border-2 border-base-200"
                  />
                  <input
                    placeholder="00000-000"
                    name="phonenumber"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-base-200"
                  />
                </div>
              </div>
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-300" htmlFor="subject">
                  Assunto
                </label>
                <div class="flex gap-[10px]">
                  <select
                    name="subject"
                    class="select select-bordered select-xs h-[34px] w-1/2 border-2 border-base-200 text-base-300 font-normal"
                  >
                    <option disabled selected>Selecione</option>
                    <option value="1">Contato</option>
                  </select>
                  <input
                    placeholder="Digite aqui"
                    name="subject"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-base-200"
                  />
                </div>
              </div>
            </div>
            <div class="form-control gap-[10px]">
              <label class="font-medium text-base-300" htmlFor="description">
                Descrição
              </label>
              <textarea
                placeholder="Digite aqui"
                name="description"
                type="text"
                class="textarea h-28 textarea-bordered resize-none rounded-box w-full border-2 border-base-200"
              />
            </div>
          </form>
          <div>
            <Button class="btn btn-sm btn-primary hover:text-base-100 w-24 h-[34px]">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
