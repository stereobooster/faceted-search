import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        tanstack: path.resolve(__dirname, 'src/pages/tanstack/index.html'),
        orama: path.resolve(__dirname, 'src/pages/orama/index.html'),
        itemsjs: path.resolve(__dirname, 'src/pages/itemsjs/index.html'),
      },
    },
  },
})