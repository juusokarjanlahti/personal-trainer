import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	base: "/<personal-trainer>/",
	test: {
		// Enable Jest globals API, https://vitest.dev/config/#test-globals, https://jestjs.io/docs/api
		globals: true,
		// Enable Jest environment, https://vitest.dev/config/#test-environment, https://jestjs.io/docs/configuration#testenvironment-string
		environment: "jsdom",
	},
});
