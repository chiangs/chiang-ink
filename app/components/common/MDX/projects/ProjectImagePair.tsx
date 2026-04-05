const duotoneStyle = {
  filter: "grayscale(100%) contrast(1.2) brightness(0.85)",
};

const captionStyle = { fontSize: "10px", letterSpacing: "0.12em" };

export function ProjectImagePair({
  images,
}: {
  images: Array<{ src: string; alt: string; caption?: string; raw?: boolean }>;
}) {
  return (
    <div className="mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-4 -mx-margin-mob md:-mx-margin">
      {images.slice(0, 2).map((img) => (
        <figure key={img.src} className="relative overflow-hidden bg-surface">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full block max-h-80"
            style={img.raw ? undefined : duotoneStyle}
          />
          {img.caption && (
            <figcaption
              className="absolute bottom-3 right-4 font-body font-medium uppercase text-accent pointer-events-none"
              style={captionStyle}
            >
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
