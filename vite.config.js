import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    glsl(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },

  build: {
    chunkSizeWarningLimit: 599,
    rolldownOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/three/,
              name: "three-vendor",
            },
          ],
        },
      },
    },
  },
});
