import Image from "next/image";
import type { ApprovedImage } from "@/content/media";

/** Renders an approved image, or nothing at all. No placeholder boxes in public UI. */
export function MediaSlot({
  image,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  image?: ApprovedImage;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (!image) return null;
  return (
    <figure className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
      {image.caption && (
        <figcaption className="eyebrow mt-3 text-muted">{image.caption}</figcaption>
      )}
    </figure>
  );
}
