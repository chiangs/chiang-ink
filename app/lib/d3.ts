// d3.ts
// Async loader for d3 + topojson-client.
// Call loadD3() instead of dynamically importing either package directly.
// Both are loaded in one Promise.all so subsequent calls reuse the module cache.

export async function loadD3() {
  const [d3, topojson] = await Promise.all([
    import("d3"),
    import("topojson-client"),
  ]);
  return { d3, feature: topojson.feature };
}

// Async loader for d3-force.
// Call loadD3Force() to get force simulation utilities.
export async function loadD3Force() {
  const { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } =
    await import("d3-force");
  return { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide };
}
