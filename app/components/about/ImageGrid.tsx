// ImageGrid — Images section for About page

export type ImageGridImage = {
  src: string;
  alt: string;
  caption: string;
};

type ImageGridProps = {
  intro: string;
  intro2: string;
  large: ImageGridImage;
  small1: ImageGridImage;
  small2: ImageGridImage;
};

const imgCaptionStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "12px",
  right: "12px",
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  opacity: 0.5,
  zIndex: 5,
  pointerEvents: "none",
};

const largeImgObjectPositionStyle: React.CSSProperties = {
  objectPosition: "center 38%",
};

const smallImgClass = "w-full h-full object-cover block";
const smallContainerClass = "relative overflow-hidden bg-surface max-h-78";
const largeContainerClass = "relative overflow-hidden bg-surface";

export function ImageGrid({
  intro,
  intro2,
  large,
  small1,
  small2,
}: ImageGridProps) {
  return (
    <>
      <p className="font-body text-base text-text-muted leading-[1.7] mb-2.5 max-w-120">
        {intro}
      </p>
      <p className="font-body text-base text-text-muted mb-10 leading-[1.7] max-w-120">
        {intro2}
      </p>

      {/* Desktop grid: large left spanning 2 rows, two small right */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "59% 39%",
          gridTemplateRows: "1fr 1fr",
          gap: "16px",
          height: "640px",
        }}
      >
        {/* Large */}
        <div className={largeContainerClass} style={{ gridRow: "1 / 3" }}>
          <img
            src={large.src}
            alt={large.alt}
            className="w-full h-full object-cover block"
            style={largeImgObjectPositionStyle}
          />
          <p className="text-sm text-text-primary" style={imgCaptionStyle}>
            {large.caption}
          </p>
        </div>
        {/* Small 1 */}
        <div className={smallContainerClass}>
          <img src={small1.src} alt={small1.alt} className={smallImgClass} />
          <p className="text-sm text-text-primary" style={imgCaptionStyle}>
            {small1.caption}
          </p>
        </div>
        {/* Small 2 */}
        <div className={smallContainerClass}>
          <img src={small2.src} alt={small2.alt} className={smallImgClass} />
          <p className="text-sm text-text-primary" style={imgCaptionStyle}>
            {small2.caption}
          </p>
        </div>
      </div>

      {/* Mobile: single column stack */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className={`${largeContainerClass} h-[56vw]`}>
          <img
            src={large.src}
            alt={large.alt}
            className="w-full h-full object-cover block"
            style={largeImgObjectPositionStyle}
          />
          <p className="text-sm text-text-primary" style={imgCaptionStyle}>
            {large.caption}
          </p>
        </div>
        <div className={`${smallContainerClass} h-[56vw]`}>
          <img src={small1.src} alt={small1.alt} className={smallImgClass} />
          <p className="text-sm text-text-primary" style={imgCaptionStyle}>
            {small1.caption}
          </p>
        </div>
        <div className={`${smallContainerClass} h-[56vw]`}>
          <img src={small2.src} alt={small2.alt} className={smallImgClass} />
          <p className="text-sm text-text-primary" style={imgCaptionStyle}>
            {small2.caption}
          </p>
        </div>
      </div>
    </>
  );
}
