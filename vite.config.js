import { defineConfig } from "vite";
import solid from "solid-start";
import vercel from "solid-start-vercel"
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [solid({ adapter: vercel() }), VitePWA()]
});
