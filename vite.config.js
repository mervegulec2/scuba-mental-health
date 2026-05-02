import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

const VIDEO_MIME = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

/**
 * Vite scans `public/` only at dev-server startup. Files added later are not in
 * that list, so requests fall through to the SPA and return `index.html` as
 * `text/html` — the video element then fails. This plugin serves new video
 * files from disk and supports Range (required for many browsers' video).
 */
function publicVideoFallback() {
  return {
    name: "public-video-fallback",
    enforce: "pre",
    configureServer(server) {
      const root = server.config.root;
      const pubDir = path.resolve(root, "public");

      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split("?")[0] ?? "";
        if (!raw || raw === "/") return next();

        let pathname;
        try {
          pathname = decodeURIComponent(raw);
        } catch {
          return next();
        }

        const ext = path.extname(pathname).toLowerCase();
        if (!VIDEO_MIME[ext]) return next();

        const rel = pathname.replace(/^\//, "");
        const full = path.resolve(pubDir, rel);
        const relativeToPublic = path.relative(pubDir, full);
        if (
          relativeToPublic.startsWith("..") ||
          path.isAbsolute(relativeToPublic)
        ) {
          return next();
        }

        let stat;
        try {
          stat = fs.statSync(full);
        } catch {
          return next();
        }
        if (!stat.isFile()) return next();

        const mime = VIDEO_MIME[ext];
        const size = stat.size;
        const range = req.headers.range;

        if (range) {
          const m = /^bytes=(\d*)-(\d*)$/.exec(range);
          if (!m) {
            res.statusCode = 416;
            res.setHeader("Content-Range", `bytes */${size}`);
            res.end();
            return;
          }
          let start = m[1] === "" ? 0 : parseInt(m[1], 10);
          let end = m[2] === "" ? size - 1 : parseInt(m[2], 10);
          if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
            res.statusCode = 416;
            res.setHeader("Content-Range", `bytes */${size}`);
            res.end();
            return;
          }
          end = Math.min(end, size - 1);
          const chunk = end - start + 1;
          res.statusCode = 206;
          res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("Content-Length", String(chunk));
          res.setHeader("Content-Type", mime);
          fs.createReadStream(full, { start, end }).pipe(res);
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Length", String(size));
        res.setHeader("Content-Type", mime);
        res.setHeader("Accept-Ranges", "bytes");
        fs.createReadStream(full).pipe(res);
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), publicVideoFallback()],
});
