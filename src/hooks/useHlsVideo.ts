import { useEffect, type RefObject } from "react";

/**
 * Attaches an HLS stream to a <video> element. hls.js is imported dynamically
 * so its ~160KB (gzip) never blocks first paint — the background video is
 * progressive enhancement, not critical content.
 */
export function useHlsVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Native HLS (Safari / iOS) — no library needed.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    let destroyed = false;
    let hlsInstance: { destroy: () => void } | null = null;

    import("hls.js").then(({ default: Hls }) => {
      if (destroyed || !Hls.isSupported()) return;
      const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsInstance = hls;
    });

    return () => {
      destroyed = true;
      hlsInstance?.destroy();
    };
  }, [videoRef, src]);
}
