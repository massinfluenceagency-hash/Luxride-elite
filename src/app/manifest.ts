import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LuxRide Elite",
    short_name: "LuxRide",
    description: "Miami's premier luxury transportation — limousines, black SUVs, exotic cars & exclusive tours",
    start_url: "/en",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#C9A765",
    orientation: "portrait-primary",
    scope: "/",
    categories: ["travel", "lifestyle", "business"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Get a Quote",
        short_name: "Quote",
        description: "Get an instant price quote",
        url: "/en/quote",
        icons: [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
      {
        name: "View Fleet",
        short_name: "Fleet",
        description: "Browse our luxury vehicle fleet",
        url: "/en/fleet",
        icons: [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
      {
        name: "Book a Tour",
        short_name: "Tours",
        description: "Explore Miami tour packages",
        url: "/en/tours",
        icons: [{ src: "/icons/icon-96x96.png", sizes: "96x96" }],
      },
    ],
  };
}
