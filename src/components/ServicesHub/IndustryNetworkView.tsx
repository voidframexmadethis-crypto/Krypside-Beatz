import React, { useState, useEffect } from 'react';
import { industryHub } from '../../lib/industryNetworkHub';

export const IndustryNetworkView = () => {
  const [role, setRole] = useState('labels');
  const [name, setName] = useState('');
  const [tier, setTier] = useState('Verified Professional');
  const [speedRating, setSpeedRating] = useState('0.9s Ultra-Fast');
  const [stats, setStats] = useState(industryHub.getNetworkStats());
  const [nodes, setNodes] = useState<{labels: any[], curators: any[], managers: any[], engineers: any[]}>({ labels: [], curators: [], managers: [], engineers: [] });

  const refreshState = () => {
    setStats(industryHub.getNetworkStats());
    setNodes({...industryHub.activeNodes});
  };

  useEffect(() => {
    refreshState();
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    industryHub.registerIndustryUser({ role, name, tier, speedRating });
    setName('');
    refreshState();
  };

  return (
    <div className="text-white space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Professional Services Network
          </h2>
          <p className="text-neutral-400">Ultra-Fast Industry Hub - Sub-second routing.</p>
        </div>
        
        <div className="flex gap-4 text-center">
          <div className="bg-neutral-800 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{stats.totalLabels}</div>
            <div className="text-xs text-neutral-400 uppercase">Labels</div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{stats.totalManagers}</div>
            <div className="text-xs text-neutral-400 uppercase">Managers</div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{stats.totalEngineers}</div>
            <div className="text-xs text-neutral-400 uppercase">Engineers</div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{stats.totalCurators}</div>
            <div className="text-xs text-neutral-400 uppercase">Curators</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleRegister} className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-800 space-y-4">
          <h3 className="text-lg font-bold">Register Profile</h3>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Role</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="labels">Label Rep</option>
              <option value="managers">Artist Manager</option>
              <option value="engineers">Audio Engineer</option>
              <option value="curators">Playlist Curator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Name / Entity</label>
            <input 
              required
              placeholder="e.g. OVO Sound / MixedByAli"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Tier</label>
              <select 
                value={tier} 
                onChange={e => setTier(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Verified Professional">Verified Professional</option>
                <option value="Executive">Executive</option>
                <option value="Independent">Independent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Routing Speed</label>
              <select 
                value={speedRating} 
                onChange={e => setSpeedRating(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="0.9s Ultra-Fast">0.9s Ultra-Fast</option>
                <option value="0.5s Light-Speed">0.5s Light-Speed</option>
                <option value="Instant">Instant</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold py-3 rounded-lg"
          >
            Lock into Global Roster
          </button>
        </form>

        <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-800 space-y-4">
          <h3 className="text-lg font-bold flex items-center justify-between">
            Active Nodes
            <span className="text-xs bg-indigo-900/50 text-indigo-400 px-2 py-1 rounded-full">{industryHub.networkTier}</span>
          </h3>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {Object.entries(nodes).flatMap(([catRole, roleNodes]) => 
              roleNodes.map((node: any) => (
                <div key={node.id} className="bg-neutral-900 rounded-lg p-3 border border-neutral-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold flex items-center gap-2">
                      {node.name}
                      <span className="text-[10px] uppercase bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
                        {catRole}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">{node.tier} • {node.speed}</div>
                  </div>
                  <div className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded-full">Online</div>
                </div>
              ))
            ).reverse()}
            
            {Object.values(nodes).every(arr => arr.length === 0) && (
              <div className="text-center py-8 text-neutral-500">
                Network roster is currently empty. Register above to join the hub.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
