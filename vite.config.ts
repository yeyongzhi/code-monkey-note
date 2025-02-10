import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/code-monkey-note/' : './',
	server: {
		port: 1023,
	},
	plugins: [vue()],
});
