import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // 设置 @ 别名指向 src 目录
        },
    },
    base: process.env.NODE_ENV === "production" ? "/code-monkey-note/" : "./",
    server: {
        port: 1023,
    },
    plugins: [vue()],
});
