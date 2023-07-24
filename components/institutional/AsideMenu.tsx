import type { SectionProps } from "$live/mod.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  menuItems: {
    label: string;
    href: string;
  }[];
}

export function loader(ctx: Props, req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  return {
    ...ctx,
    pathname,
  };
}

function AsideMenu(
  { menuItems, pathname: currentUrl }: SectionProps<typeof loader>,
) {
  const currentRoute = menuItems.find((item) => item.href === currentUrl);

  return (
    <aside class="md:min-w-[20%] font-medium text-secondary-focus flex md:justify-end">
      <ul class="md:join join-vertical gap-[10px] w-full hidden">
        {menuItems.map(
          (item, index) => (
            <li key={index}>
              <a
                class={`
                  ${
                  currentUrl === item.href
                    ? "bg-secondary-focus text-base-100 border-none"
                    : ""
                }
                  btn btn-ghost btn-block border-2 border-neutral-100 hover:bg-secondary-focus hover:text-base-100
                `}
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
      <div class="md:hidden w-full pb-5">
        <div class="dropdown w-full text-sm font-normal">
          <label
            tabIndex={0}
            class="btn btn-secondary btn-block bg-base-content justify-between border-none"
          >
            {currentRoute?.label ?? "Menu"}
            <Icon id="ChevronDown" width={26} height={26} />
          </label>
          <ul class="shadow menu dropdown-content z-10 bg-base-100 mt-5 rounded-box w-full gap-2">
            {menuItems.map(
              (item, index) => (
                <li key={index}>
                  <a
                    class={`
                      ${
                      currentUrl === item.href
                        ? "bg-base-content text-base-100 border-none"
                        : ""
                    }
                      hover:bg-base-content hover:text-base-100
                    `}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
