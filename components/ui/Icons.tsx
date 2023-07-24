import Icon, {
  AvailableIcons,
  IconsAvaliable,
} from "$store/components/ui/Icon.tsx";

function Icons() {
  const iconsList: AvailableIcons[] = Object.values(IconsAvaliable);

  return (
    <div className="grid p-10 w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-10 p-4 sm:p-6 md:p-8 lg:p-40rem bg-gray-100 rounded-lg">
      {iconsList.map((icon) => (
        <div
          key={icon}
          className="text-center"
        >
          <div>
            <Icon
              class="block mx-auto"
              id={icon}
              strokeWidth={2}
              size={50}
            />
            {icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Icons;
