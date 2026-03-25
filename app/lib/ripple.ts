export function createRipple(event: React.TouchEvent<HTMLElement>) {
  const element = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const touch = event.touches[0];

  const size = Math.max(rect.width, rect.height);
  const x = touch.clientX - rect.left - size / 2;
  const y = touch.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 183, 125, 0.25);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-expand 0.6s ease-out forwards;
    pointer-events: none;
    z-index: 10;
  `;

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}
