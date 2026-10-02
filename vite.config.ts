import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Serves api/*.ts under `vite` the way Vercel does in production, so the contact
// form can be exercised locally without the Vercel CLI. Env vars (RESEND_API_KEY,
// CONTACT_FROM, CONTACT_TO, HUBSPOT_ACCESS_TOKEN) are read from .env.local, which is gitignored.
function localApi(): Plugin {
  return {
    name: "local-api",
    configureServer(server) {
      const env = loadEnv("development", process.cwd(), "");
      for (const key of ["RESEND_API_KEY", "CONTACT_FROM", "CONTACT_TO", "HUBSPOT_ACCESS_TOKEN"]) {
        if (env[key] && !process.env[key]) process.env[key] = env[key];
      }

      server.middlewares.use("/api/contact", async (req, res) => {
        const chunks: Buffer[] = [];
        let size = 0;
        for await (const chunk of req) {
          size += (chunk as Buffer).length;
          if (size > 64 * 1024) {
            res.statusCode = 413;
            res.end();
            return;
          }
          chunks.push(chunk as Buffer);
        }
        const raw = Buffer.concat(chunks).toString("utf8");
        let body: unknown = raw;
        if (String(req.headers["content-type"] ?? "").includes("application/json")) {
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            body = {};
          }
        }

        // Minimal VercelRequest / VercelResponse shim over Node's objects.
        const vreq = Object.assign(req, { body, query: {} });
        const vres = Object.assign(res, {
          status(code: number) {
            res.statusCode = code;
            return vres;
          },
          json(payload: unknown) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
            return vres;
          },
        });

        try {
          const mod = await server.ssrLoadModule("/api/contact.ts");
          await mod.default(vreq, vres);
        } catch (error) {
          console.error("local-api: handler crashed", error);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: "crashed" }));
          }
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["framer-motion"],
        },
      },
    },
  },
});
