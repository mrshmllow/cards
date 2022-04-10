import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        alias({
          entries: [
            { find: "react", replacement: "preact/compat" },
            { find: "react-dom/test-utils", replacement: "preact/test-utils" },
            { find: "react-dom", replacement: "preact/compat" },
            { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
          ],
        }),
      ],
    },
  },
});
