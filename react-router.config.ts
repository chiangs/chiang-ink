import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router";

export default {
  ssr: true,
  presets: [vercelPreset()],
} satisfies Config;
