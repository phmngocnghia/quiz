import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { antdDayjs } from "antd-dayjs-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), antdDayjs()],
});
