import { useEffect } from "preact/compat";

interface Props {
  sliderId: string;
  imageContainerClass: string;
  normalImageClass: string;
  zoomedImageClass: string;
}

const setup = (
  { sliderId, imageContainerClass, normalImageClass, zoomedImageClass }: Props,
) => {
  const root = document.getElementById(sliderId);

  if (!root) {
    console.warn(
      "Missing necessary zoom attributes. It will not work as intended. Necessary elements:",
      { root },
    );

    return;
  }

  const handleMouseMove = (event: MouseEvent) => {
    const container = event.currentTarget as HTMLDivElement;
    const rect = root.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const image = container.querySelector(
      `.${zoomedImageClass}`,
    ) as HTMLImageElement;

    if (!image) return;

    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;
    const moveX = ((mouseX / containerWidth) *
      (imageWidth - containerWidth)) *
      -1;
    const moveY = ((mouseY / containerHeight) *
      (imageHeight - containerHeight)) * -1;

    image.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (event: MouseEvent) => {
    const image = (event.currentTarget as HTMLDivElement).querySelector(
      `.${zoomedImageClass}`,
    ) as HTMLImageElement;

    if (!image) return;

    setTimeout(() => {
      image.style.transform = "translate(0, 0)";
    }, 200);
  };

  const handleMobileTouch = (event: TouchEvent) => {
    const container = event.currentTarget as HTMLDivElement;
    const normalImage = container.querySelector(
      `.${normalImageClass}`,
    ) as HTMLImageElement;
    const zoomedImage = container.querySelector(
      `.${zoomedImageClass}`,
    ) as HTMLImageElement;

    if (!(container && normalImage && zoomedImage)) return;

    normalImage.style.opacity = normalImage?.style?.opacity !== "0" ? "0" : "1";
    zoomedImage.style.opacity = normalImage?.style?.opacity === "0" ? "1" : "0";
  };

  const addImageZoomEvents = () => {
    const imageContainers = Array.from(
      document.querySelectorAll(
        `#${sliderId} .${imageContainerClass}`,
      ),
    ) as HTMLDivElement[];

    imageContainers.forEach((container) => {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("touchend", handleMobileTouch);
    });

    return () => {
      imageContainers.forEach((container) => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchend", handleMobileTouch);
      });
    };
  };

  return addImageZoomEvents();
};

function ImageZoomJS(
  { sliderId, imageContainerClass, normalImageClass, zoomedImageClass }: Props,
) {
  useEffect(
    () =>
      setup({
        sliderId,
        imageContainerClass,
        normalImageClass,
        zoomedImageClass,
      }),
    [
      sliderId,
      imageContainerClass,
      normalImageClass,
      zoomedImageClass,
    ],
  );

  return <div zoom-image-controller-js />;
}

export default ImageZoomJS;
