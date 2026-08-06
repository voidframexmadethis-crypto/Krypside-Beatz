import React, { useState, useEffect } from 'react';

interface Track {
    id: string;
    title: string;
    taggedMp3Url: string;
    coverArtUrl: string;
    bpm?: number;
    musicalKey?: string;
    priceMp3: number;
}

export default function CatalogGrid() {
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await fetch('/api/beats');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTracks(data);
                } else if (data && typeof data === 'object' && Array.isArray((data as any).beats)) {
                    setTracks((data as any).beats);
                } else {
                    setTracks([]);
                }
            } catch (error) {
                console.error("Failed to load catalog:", error);
                setTracks([]);
            }
        };
        fetchCatalog();
    }, []);

    if (tracks.length === 0) {
        return (
            <div id="catalogGrid" className="catalog-grid text-center py-12 text-neutral-500">
                <p>No tracks in catalog. Upload or publish beats to display them here.</p>
            </div>
        );
    }

    return (
        <div id="catalogGrid" className="catalog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(tracks) && tracks.map((track) => (
                <div key={track.id} className="beat-card bg-[#0e0e10] border border-[#1c1c1f] rounded-lg p-4" data-audio-url={track.taggedMp3Url}>
                    <img 
                      src={track.coverArtUrl || (track as any).artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80'} 
                      alt={track.title} 
                      className="beat-cover-art w-full h-40 object-cover rounded mb-4" 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="beat-title text-lg font-bold mb-1 text-white">{track.title}</div>
                    <div className="beat-meta text-sm text-neutral-400 mb-4">
                        <span>{track.bpm || '140'} BPM</span> • <span>Key: {track.musicalKey || 'C Min'}</span>
                    </div>
                    <div className="card-actions flex gap-2">
                        <button className="play-pause-btn flex-1 bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-500 transition-all cursor-pointer">Stream</button>
                        <button className="checkout-btn flex-1 border border-indigo-600 text-indigo-400 py-2 rounded font-bold hover:bg-indigo-600 hover:text-white transition-all cursor-pointer" data-beat-id={track.id} data-price={track.priceMp3}>License</button>
                        {localStorage.getItem('KRYPSIDE_ADMIN_AUTH') === 'true' && (
                            <button 
                                onClick={() => {
                                    // Navigate to admin portal to edit or just show alert
                                    window.location.href = `/admin-portal?edit=${track.id}`;
                                }}
                                className="p-2 border border-neutral-800 rounded text-neutral-400 hover:text-indigo-400"
                                title="Edit in Admin Portal"
                            >
                                ⚙️
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
