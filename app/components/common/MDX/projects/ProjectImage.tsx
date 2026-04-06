const duotoneStyle = {
  filter: "grayscale(100%) contrast(1.2) brightness(0.85)",
};

const captionStyle = { fontSize: "10px", letterSpacing: "0.12em" };

export function ProjectImage({
  src,
  alt,
  caption,
  raw = false,
  contained = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  raw?: boolean;
  contained?: boolean;
}) {
  const outerClass = contained
    ? "mb-12 md:mb-16 max-w-2xl"
    : "mb-12 md:mb-16 -mx-margin-mob md:-mx-margin";

  return (
    <figure className={outerClass}>
      <div className="relative overflow-hidden bg-surface">
        <img
          src={src}
          alt={alt}
          className="w-full block"
          style={raw ? undefined : duotoneStyle}
        />
        {caption && (
          <figcaption
            className="absolute bottom-3 right-4 font-body font-medium uppercase text-accent pointer-events-none"
            style={captionStyle}
          >
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
