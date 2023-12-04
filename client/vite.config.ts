/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
// import dotenv from 'dotenv';
export default ({ mode }) => {

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    console.log(process.env.VITE_API_URI);
    

    return defineConfig({
        plugins: [react()],
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: process.env.VITE_API_URI,
                    changeOrigin: true,
                },
            },
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/tests/setup.ts",
        },
    });

}