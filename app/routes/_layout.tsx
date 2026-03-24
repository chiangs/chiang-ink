// _layout.tsx
// Root layout — wires Nav, Footer, and both easter egg drawers
// All drawer state lives here so it persists across route changes

import { useState } from "react";
import { Outlet } from "react-router";
import {
  CurrentlyDrawer,
  Footer,
  Nav,
  StyleGuideDrawer,
} from "~/components/layout";
import { STYLEGUIDE_UNLOCK_KEY } from "~/lib/constants";

export default function Layout() {
  const [currentlyOpen, setCurrentlyOpen] = useState(false);
  const [styleGuideOpen, setStyleGuideOpen] = useState(false);

  const openCurrently = () => setCurrentlyOpen(true);
  const closeCurrently = () => setCurrentlyOpen(false);
  const openStyleGuide = () => setStyleGuideOpen(true);
  const closeStyleGuide = () => setStyleGuideOpen(false);

  // Fire event so Footer can detect unlock
  const handleFirstUnlock = () => {
    window.dispatchEvent(new Event(STYLEGUIDE_UNLOCK_KEY));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Cursor follower dot */}
      <div id="cursor-dot" />

      {/* Navigation */}
      <Nav onOpenStyleGuide={openStyleGuide} onOpenCurrently={openCurrently} />

      {/* Page content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer onOpenStyleGuide={openStyleGuide} />

      {/* Easter egg drawers */}
      <CurrentlyDrawer isOpen={currentlyOpen} onClose={closeCurrently} />
      <StyleGuideDrawer
        isOpen={styleGuideOpen}
        onClose={closeStyleGuide}
        onFirstUnlock={handleFirstUnlock}
      />
    </div>
  );
}
