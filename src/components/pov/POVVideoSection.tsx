"use client";
import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const VIDEOS = [
  {
    title: "Rolls-Royce Phantom — Night Drive POV",
    description: "Experience the iconic Rolls-Royce Phantom from the driver's seat on Miami's most scenic night routes.",
    youtubeId: "BjKHFZXRwfc",
    thumbnail: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    tag: "Luxury Sedan",
  },
  {
    title: "Lamborghini Huracán — Supercar POV Drive",
    description: "Feel the raw power of a Lamborghini V10 engine from the cockpit — full throttle POV experience.",
    youtubeId: "7VaGeUXnHkE",
    thumbnail: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    tag: "Exotic Car",
  },
  {
    title: "Stretch Limousine — Interior Tour",
    description: "Step inside our stretch limousine and experience the full luxury treatment from champagne bar to LED lighting.",
    youtubeId: "4R9WaRRQpGw",
    thumbnail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
    tag: "Limousine",
  },
  {
    title: "Cadillac Escalade — Executive SUV POV",
    description: "Ride in total comfort and privacy in our flagship black Escalade — the choice of executives and celebrities.",
    youtubeId: "C7anTWoi4-E",
    thumbnail: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    tag: "Black SUV",
  },
];

export default function POVVideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-gold/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="POV Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VIDEOS.map((video) => (
          <button
            key={video.youtubeId}
            onClick={() => setActiveVideo(video.youtubeId)}
            className="group rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300 text-left block w-full"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-black">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300 group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 border-2 border-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300">
                  <Play size={24} className="text-gold ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {video.tag}
                </span>
              </div>

              {/* Title bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-tight">{video.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                  <span className="text-gold/70 text-xs">Click to play</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#1A1A1A] px-4 py-3">
              <p className="text-cream/50 text-xs leading-relaxed">{video.description}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
