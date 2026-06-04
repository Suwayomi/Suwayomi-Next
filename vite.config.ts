import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import pages from "vite-plugin-pages"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), pages()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            // String shorthand: any request starting with /api
            // will be sent to http://localhost:456/api
            "/api": {
                // static-port
                target: "http://localhost:4567",
                changeOrigin: true,
                // Optional: If your backend doesn't have /api in its actual path,
                // you can remove it using rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
    },
})
