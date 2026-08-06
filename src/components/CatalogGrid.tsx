import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function CatalogGrid() {
    const { state } = useStore();
    const { playTrack } = useAudioPlayer();
    const tracks = state.beats;

    if (!tracks || tracks.length === 0) {
        return (
            <div id="catalogGrid" className="catalog-grid text-center py-12 text-neutral-500">
                <p>No tracks in catalog. Upload or publish beats to display them here.</p>
            </div>
        );
    }

    return (
        <div id="catalogGrid" className="catalog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(tracks) && tracks.map((track) => (
                <div key={track.id} className="beat-card bg-[#0e0e10] border border-[#1c1c1f] rounded-lg p-4" data-audio-url={track.audioUrl}>
                    <div className="w-full h-40 mb-4 overflow-hidden rounded-xl">
                        <img 
                          src={(track as any).artwork || track.coverArtUrl || (track as any).artworkUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60'} 
                          alt={track.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60';
                          }}
                        />
                    </div>
                    <div className="beat-title text-lg font-bold mb-1 text-white">{track.title}</div>
                    <div className="beat-meta text-sm text-neutral-400 mb-4">
                        <span>{track.bpm || '140'} BPM</span> • <span>Key: {track.key || 'C Min'}</span>
                    </div>
                    <div className="card-actions flex gap-2">
                        <button 
                            onClick={() => playTrack(track)}
                            className="play-pause-btn flex-1 bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-500 transition-all cursor-pointer"
                        >
                            Stream
                        </button>
                        <button 
                            className="checkout-btn flex-1 border border-indigo-600 text-indigo-400 py-2 rounded font-bold hover:bg-indigo-600 hover:text-white transition-all cursor-pointer" 
                            data-beat-id={track.id} 
                            data-price={track.price}
                        >
                            License
                        </button>
                        {localStorage.getItem('KRYPSIDE_ADMIN_AUTH') === 'true' && (
                            <button 
                                onClick={() => {
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
