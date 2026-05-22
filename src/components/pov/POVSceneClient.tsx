"use client";
import dynamic from "next/dynamic";

const POVScene = dynamic(() => import("./POVScene"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl border border-gold/20 flex items-center justify-center bg-black-charcoal"
      style={{ height: "60vh" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-gold text-sm font-semibold tracking-wider">Loading 3D Experience...</span>
      </div>
    </div>
  ),
});

export default function POVSceneClient() {
  return <POVScene />;
}
