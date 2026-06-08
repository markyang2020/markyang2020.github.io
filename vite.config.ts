import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["gutless-spearman-premises.ngrok-free.dev"],
  },
  preview: {
    allowedHosts: ["gutless-spearman-premises.ngrok-free.dev"],
  },
});
