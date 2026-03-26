// Industries — Industries & sectors section for About page
import { useEffect, useRef } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import { loadD3 } from "~/lib/d3";

const IND_ORG_LABEL = "ORGANISATION TYPES";

const INDUSTRIES_LEFT = [
  "Maritime",
  "Oil & Gas / Energy",
  "Defence / Military",
  "Government / Public Sector",
  "Consulting & Professional Services",
] as const;

const INDUSTRIES_RIGHT = [
  "Healthcare",
  "Technology / SaaS",
  "Retail / E-commerce",
  "Logistics / Supply Chain",
] as const;

const ORG_TYPES = [
  "Startup / Early Stage",
  "Scale-up / Growth",
  "Enterprise",
  "Government",
  "Agency / Consultancy",
] as const;

const MAP_CAPTION = "8 countries across 4 continents";
const MAP_TOPO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const MAP_HIGHLIGHTED = new Set([578, 840, 208, 410, 418, 144, 462, 368]);
const MAP_COLOR_BASE = "#131313";
const MAP_COLOR_HIGHLIGHT = "#FFB77D";
const MAP_COLOR_HOVER = "#D97707";
const MAP_COLOR_OCEAN = "#1a1a1a";
const MAP_W = 960;
const MAP_H = 500;

const mapCaptionStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "14px",
  fontStyle: "italic",
  color: "#5a5a58",
  textAlign: "left",
  marginTop: "24px",
  paddingLeft: "12px",
};

function IndustryRow({ name }: { name: string }) {
  return (
    <div
      className="flex items-center"
      style={{ paddingBottom: "14px", marginBottom: "14px" }}
    >
      <span
        className="font-body font-medium text-text-primary shrink-0"
        style={{ fontSize: "14px" }}
      >
        {name}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "#222220",
          marginLeft: "20px",
        }}
      />
    </div>
  );
}

function WorldMap({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !svgRef.current) return;
    let isMounted = true;

    const render = async () => {
      const { d3, feature } = await loadD3();
      if (!isMounted || !svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      svg
        .attr("viewBox", `0 0 ${MAP_W} ${MAP_H}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const projection = d3
        .geoNaturalEarth1()
        .scale(153)
        .translate([MAP_W / 2, MAP_H / 2]);

      const pathGen = d3.geoPath().projection(projection);

      const topo = (await d3.json(MAP_TOPO_URL)) as Topology<{ countries: GeometryCollection }>;
      if (!isMounted) return;

      const countries = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;

      svg
        .append("rect")
        .attr("width", MAP_W)
        .attr("height", MAP_H)
        .attr("fill", MAP_COLOR_OCEAN);

      svg
        .selectAll<SVGPathElement, Feature<Geometry>>("path")
        .data(countries.features)
        .join("path")
        .attr("d", (d: Feature<Geometry>) => pathGen(d) ?? "")
        .attr("fill", (d: Feature<Geometry>) =>
          MAP_HIGHLIGHTED.has(Number(d.id))
            ? MAP_COLOR_HIGHLIGHT
            : MAP_COLOR_BASE,
        )
        .attr("stroke", "none")
        .style("cursor", "default")
        .on(
          "mouseenter",
          // eslint-disable-next-line react-hooks/unsupported-syntax -- D3 requires `this` binding for DOM element access
          function (this: SVGPathElement, _: MouseEvent, d: Feature<Geometry>) {
            if (MAP_HIGHLIGHTED.has(Number(d.id)))
              d3.select(this).attr("fill", MAP_COLOR_HOVER);
          },
        )
        .on(
          "mouseleave",
          function (this: SVGPathElement, _: MouseEvent, d: Feature<Geometry>) {
            if (MAP_HIGHLIGHTED.has(Number(d.id)))
              d3.select(this).attr("fill", MAP_COLOR_HIGHLIGHT);
          },
        );
    };

    render();
    return () => {
      isMounted = false;
    };
  }, []);

  return <svg ref={svgRef} className={`w-full block ${className}`} />;
}

export function Industries() {
  return (
    <>
      {/* Two-column industry list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mb-8">
        <div>
          {INDUSTRIES_LEFT.map((name) => (
            <IndustryRow key={name} name={name} />
          ))}
        </div>
        <div>
          {INDUSTRIES_RIGHT.map((name) => (
            <IndustryRow key={name} name={name} />
          ))}
        </div>
      </div>

      {/* Map left | Org types right — same height, no gap, touching */}
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Map container — same bg as org types, caption inside */}
        <div className="flex-1 min-w-0 flex flex-col bg-surface min-h-52">
          <WorldMap className="w-full block bg-surface min-h-52 md:flex-1" />
          <p style={mapCaptionStyle}>{MAP_CAPTION}</p>
        </div>
        {/* Org types */}
        <div className="md:w-1/3 shrink-0 flex flex-col bg-surface p-10 min-h-52">
          <div>
            <p
              className="font-body font-medium uppercase text-text-muted"
              style={{
                fontSize: "14px",
                letterSpacing: "0.15em",
                marginBottom: "12px",
              }}
            >
              {IND_ORG_LABEL}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {ORG_TYPES.map((type) => (
              <p
                key={type}
                className="font-body font-medium uppercase text-text-muted"
                style={{ fontSize: "14px", letterSpacing: "0.05em" }}
              >
                {type}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export { IndustryRow };
