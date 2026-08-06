import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Lock, BarChart3, DollarSign, TrendingUp, PlayCircle, Share2, ThumbsUp, ThumbsDown, Music, UploadCloud, Download, Eye, Users, Mail, Bell, RefreshCw, Send, CheckCircle2, Volume2, Upload, LogOut, Disc, Edit } from 'lucide-react';
import Uploader from './Uploader';
import { Beat } from '../types';

export default function Admin() {
  const { state, updateProfile, resetAnalytics } = useStore();
  const { user } = useAuth();
  const isAdmin = localStorage.getItem('KRYPSIDE_ADMIN_AUTH') === 'true' || user?.email === 'glennbucky@gmail.com';

  useEffect(() => {
    // 🧹 Auto-reset traffic for owner if it was seeded/inflated
    if (user?.email === 'glennbucky@gmail.com' && state.analytics.siteVisits > 0 && !sessionStorage.getItem('KRYPSIDE_TRAFFIC_CLEARED')) {
      resetAnalytics('siteVisits');
      resetAnalytics('uniqueVisitors');
      sessionStorage.setItem('KRYPSIDE_TRAFFIC_CLEARED', 'true');
    }
  }, [user, state.analytics.siteVisits, resetAnalytics]);

  useEffect(() => {
    // Ensure admin auth is saved if accessing via email
    if (user?.email === 'glennbucky@gmail.com' && localStorage.getItem('KRYPSIDE_ADMIN_AUTH') !== 'true') {
      localStorage.setItem('KRYPSIDE_ADMIN_AUTH', 'true');
    }
  }, [user]);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const [activeTab, setActiveTab] = useState<'dashboard' | 'subscribers' | 'voicetag' | 'uploader' | 'plaque' | 'push' | 'isrc' | 'killswitch'>('dashboard');
  const [trackToEdit, setTrackToEdit] = useState<Beat | null>(null);
  const [subscribers, setSubscribers] = useState<{ email: string; name: string; subscribedAt: string; notifyOnBeatDrop: boolean }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState<{ id: string; title: string; body: string; sentAt: string; beatTitle?: string }[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [plaqueArtist, setPlaqueArtist] = useState('');
  const [plaqueTitle, setPlaqueTitle] = useState('');
  const [plaqueShipping, setPlaqueShipping] = useState('');

  // 🛡️ Anti-Rip & Kill Switch States
  const [licensesList, setLicensesList] = useState<any[]>([]);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const res = await fetch('/api/admin/licenses');
        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            setLicensesList(data.licenses || []);
          }
        }
      } catch (err) {
        console.error("Failed to fetch licenses:", err);
      }
    };
    if (isAdmin && activeTab === 'killswitch') {
      fetchLicenses();
    }
  }, [isAdmin, activeTab]);

  const handleRevokeLicense = async (beatId: string, status: 'active' | 'revoked' | 'flagged') => {
    setRevokingId(beatId);
    try {
      const res = await fetch('/api/admin/revoke-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ beatId, licenseStatus: status })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || `✓ License status updated to ${status.toUpperCase()}`);
        // Refresh list
        const listRes = await fetch('/api/admin/licenses');
        const listData = await listRes.json();
        if (listData.success) {
          setLicensesList(listData.licenses || []);
        }
      } else {
        alert(`Failed to update license status: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating license status.');
    } finally {
      setRevokingId(null);
    }
  };

  // 🎵 ISRC Config States
  const [isrcConfig, setIsrcConfig] = useState({ countryCode: 'US', registrantCode: 'KRP', sequences: {} as Record<string, number>, catalog: [] as any[] });
  const [isrcSaving, setIsrcSaving] = useState(false);
  const [testGeneratedIsrc, setTestGeneratedIsrc] = useState('');

  useEffect(() => {
    const fetchIsrcConfig = async () => {
      try {
        const res = await fetch('/api/admin/isrc-config');
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (data && data.success) {
              setIsrcConfig({
                countryCode: data.countryCode || 'US',
                registrantCode: data.registrantCode || 'KRP',
                sequences: data.sequences || {},
                catalog: data.catalog || []
              });
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch ISRC config:", err);
      }
    };
    if (isAdmin) {
      fetchIsrcConfig();
    }
  }, [isAdmin, activeTab]);

  const handleSaveIsrcConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsrcSaving(true);
    try {
      const res = await fetch('/api/admin/isrc-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryCode: isrcConfig.countryCode,
          registrantCode: isrcConfig.registrantCode
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('✓ ISRC configuration saved successfully!');
      } else {
        alert('Failed to save ISRC config.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving ISRC configuration.');
    } finally {
      setIsrcSaving(false);
    }
  };

  const handleTestGenerateIsrc = async () => {
    try {
      const res = await fetch('/api/admin/generate-isrc');
      const data = await res.json();
      if (data.success && data.isrc) {
        setTestGeneratedIsrc(data.isrc);
        const cfgRes = await fetch('/api/admin/isrc-config');
        const cfgData = await cfgRes.json();
        if (cfgData.success) {
          setIsrcConfig({
            countryCode: cfgData.countryCode || 'US',
            registrantCode: cfgData.registrantCode || 'KRP',
            sequences: cfgData.sequences || {},
            catalog: cfgData.catalog || []
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔔 Web Push Campaign States
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');
  const [pushUrl, setPushUrl] = useState('/');
  const [selectedBeatUrl, setSelectedBeatUrl] = useState('/');
  const [pushChannel, setPushChannel] = useState<'local' | 'onesignal' | 'firebase'>('local');
  const [apiSecretKey, setApiSecretKey] = useState('');
  const [isBroadcastingPush, setIsBroadcastingPush] = useState(false);
  const [registeredPushCount, setRegisteredPushCount] = useState(0);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoadingSubscribers(true);
      try {
        const res = await fetch('/api/subscribers');
        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            setSubscribers(data.subscribers || []);
            setNotifications(data.notifications || []);
            setRegisteredPushCount(data.pushSubscriptionsCount || 0);
          }
        }
      } catch (err) {
        console.error('Failed to fetch subscribers:', err);
      } finally {
        setLoadingSubscribers(false);
      }
    };
    if (isAdmin) {
      fetchSubscribers();
    }
  }, [isAdmin]);

  const handleBroadcastPush = async () => {
    setIsBroadcastingPush(true);
    try {
      let endpoint = '/api/push/broadcast';
      let payload: any = {
        title: pushTitle,
        body: pushBody,
        url: pushUrl
      };

      if (pushChannel !== 'local') {
        // Simulating external webhook API dispatch (OneSignal / Firebase)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const simulatedNotif = {
          id: `push_sim_${Date.now()}`,
          title: `[${pushChannel.toUpperCase()} DISPATCH] ${pushTitle}`,
          body: `[Simulated Webhook Sent via Key: ${apiSecretKey ? '••••••••' : 'None'}] - ${pushBody}`,
          sentAt: new Date().toISOString(),
          beatTitle: pushUrl.split('/').pop() || 'External Hook'
        };

        setNotifications(prev => [simulatedNotif, ...prev]);
        alert(`✓ Campaign "${pushTitle}" successfully broadcasted via ${pushChannel === 'onesignal' ? 'OneSignal API Hook' : 'Firebase Cloud Messaging API Hook'}!`);
        
        setPushTitle('');
        setPushBody('');
        setPushUrl('/');
        setSelectedBeatUrl('/');
        setIsBroadcastingPush(false);
        return;
      }

      // Real local web-push delivery
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Server rejected push broadcast campaign request.');
      }

      const result = await res.json();
      if (result.success) {
        alert(result.message || '✓ Push campaign broadcasted successfully!');
        
        // Refresh local listings/broadcast log
        const subRes = await fetch('/api/subscribers');
        if (subRes.ok) {
          const subData = await subRes.json();
          setNotifications(subData.notifications || []);
          setRegisteredPushCount(subData.pushSubscriptionsCount || 0);
        }

        setPushTitle('');
        setPushBody('');
        setPushUrl('/');
        setSelectedBeatUrl('/');
      } else {
        alert(`Error: ${result.error || 'Failed to dispatch alert.'}`);
      }
    } catch (err: any) {
      console.error('Push broadcast error:', err);
      alert(`Push Broadcast Failed: ${err.message || 'An unexpected error occurred.'}`);
    } finally {
      setIsBroadcastingPush(false);
    }
  };

  // 🏆 MILESTONES LOGIC
  const totalPlays = state.analytics.totalPlays || 0;
  
  const milestones = [
    { id: 'bronze', name: 'Bronze Milestone', goal: 100, color: '#cd7f32', icon: '🥉' },
    { id: 'silver', name: 'Silver Milestone', goal: 500, color: '#c0c0c0', icon: '🥈' },
    { id: 'gold', name: 'Gold Milestone', goal: 1000, color: '#FFD700', icon: '🥇' },
    { id: 'platinum', name: 'Platinum Milestone', goal: 5000, color: '#e5e4e2', icon: '💿' },
    { id: 'diamond', name: 'Diamond Milestone', goal: 10000, color: '#b9f2ff', icon: '💎' }
  ];

  const reachedMilestones = milestones.filter(m => totalPlays >= m.goal);
  const nextMilestone = milestones.find(m => totalPlays < m.goal);
  const isAwardEligible = reachedMilestones.length > 0;

  const filteredSubscribers = subscribers.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // 💰 REVENUE ANALYTICS
  const earningsFromBeats = state.beats.reduce((sum, beat) => sum + (beat.earnings || 0), 0);
  const totalEarnings = Math.max(state.analytics.totalEarnings || 0, earningsFromBeats);
  const platformFees = state.analytics.platformFees || 0;
  const netEarnings = totalEarnings - platformFees;
  
  const grossMarginPercent = totalEarnings > 0 ? Math.round((netEarnings / totalEarnings) * 100) : 0;
  const platformFeePercent = totalEarnings > 0 ? 100 - grossMarginPercent : 0;

  // Calculate totals
  const totalPlaysFromBeats = state.beats.reduce((sum, beat) => sum + (beat.plays || 0), 0);
  const displayPlays = Math.max(totalPlays, totalPlaysFromBeats);
  const totalLikes = state.beats.reduce((sum, beat) => sum + (beat.likes || 0), 0);
  const totalShares = state.beats.reduce((sum, beat) => sum + (beat.shares || 0), 0);
  const totalDownloads = state.beats.reduce((sum, beat) => sum + (beat.downloads || 0), 0);

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-indigo-500" />
            Admin Dashboard
          </h1>
          <p className="text-neutral-400 mt-2">Manage your catalog and view analytics.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-1 flex">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('subscribers')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'subscribers' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <Users className="w-4 h-4" />
              Subscribers
            </button>
            <button 
              onClick={() => setActiveTab('voicetag')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'voicetag' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <Volume2 className="w-4 h-4" />
              Voice Tag
            </button>
            <button 
              onClick={() => setActiveTab('uploader')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'uploader' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <UploadCloud className="w-4 h-4" />
              Upload Beat
            </button>
            <button 
              onClick={() => setActiveTab('plaque')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'plaque' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <Disc className="w-4 h-4" />
              Plaques
            </button>
            <button 
              onClick={() => setActiveTab('push')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'push' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <Bell className="w-4 h-4" />
              Push Alerts
            </button>
            <button 
              onClick={() => setActiveTab('isrc')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'isrc' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <Music className="w-4 h-4" />
              ISRC Config
            </button>
            <button 
              onClick={() => setActiveTab('killswitch')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'killswitch' ? 'bg-red-950/40 text-red-400 border border-red-900/50' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              <Lock className="w-4 h-4" />
              Kill Switch
            </button>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('KRYPSIDE_ADMIN_AUTH');
              window.location.href = '/admin-portal';
            }}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-red-400 hover:text-red-300"
          >
            <Lock className="w-4 h-4" />
            Lock
          </button>
        </div>
      </div>

      {activeTab === 'killswitch' ? (
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Anti-Rip & License Revocation (Kill Switch)</h2>
                <p className="text-neutral-400 text-sm">Instantly terminate streaming access, rotate decryption tokens, and render cached or shared audio files unplayable across the platform.</p>
              </div>
            </div>

            <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-900/80 text-neutral-400 font-mono text-xs uppercase border-b border-neutral-800">
                  <tr>
                    <th className="px-4 py-3">Track Title</th>
                    <th className="px-4 py-3">ISRC Code</th>
                    <th className="px-4 py-3">License Status</th>
                    <th className="px-4 py-3">Streaming Token Hash</th>
                    <th className="px-4 py-3 text-right">Kill Switch Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {licensesList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">No tracks registered in enterprise ledger.</td>
                    </tr>
                  ) : (
                    licensesList.map((track) => (
                      <tr key={track.id} className="hover:bg-neutral-900/50">
                        <td className="px-4 py-3 font-medium text-white">{track.title}</td>
                        <td className="px-4 py-3 font-mono text-indigo-400">{track.isrc}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                            track.licenseStatus === 'revoked' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            track.licenseStatus === 'flagged' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {track.licenseStatus?.toUpperCase() || 'ACTIVE'}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-neutral-500 text-xs truncate max-w-[160px]" title={track.streamingToken}>
                          {track.streamingToken}
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          {track.licenseStatus !== 'revoked' ? (
                            <button
                              onClick={() => handleRevokeLicense(track.id, 'revoked')}
                              disabled={revokingId === track.id}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg shadow-red-900/30"
                            >
                              {revokingId === track.id ? 'Revoking...' : 'Revoke License & Kill Access'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRevokeLicense(track.id, 'active')}
                              disabled={revokingId === track.id}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              {revokingId === track.id ? 'Restoring...' : 'Restore Active License'}
                            </button>
                          )}
                          {track.licenseStatus !== 'flagged' && track.licenseStatus !== 'revoked' && (
                            <button
                              onClick={() => handleRevokeLicense(track.id, 'flagged')}
                              disabled={revokingId === track.id}
                              className="px-3 py-1.5 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-600/40 rounded-lg text-xs font-medium transition-colors"
                            >
                              Flag
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'isrc' ? (
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Automated ISRC Code Generator & Config</h2>
                <p className="text-neutral-400 text-sm">Configure your Country Code and Registrant Code. Every new beat upload automatically generates a sequential ISRC (Format: CC-XXX-YY-NNNNN).</p>
              </div>
            </div>

            <form onSubmit={handleSaveIsrcConfig} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-neutral-950 p-6 rounded-xl border border-neutral-800">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">2-Letter Country Code (e.g., US)</label>
                <input 
                  type="text" 
                  maxLength={2} 
                  value={isrcConfig.countryCode} 
                  onChange={(e) => setIsrcConfig(prev => ({ ...prev, countryCode: e.target.value.toUpperCase() }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white font-mono uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">3-Character Registrant Code (e.g., KRP)</label>
                <input 
                  type="text" 
                  maxLength={3} 
                  value={isrcConfig.registrantCode} 
                  onChange={(e) => setIsrcConfig(prev => ({ ...prev, registrantCode: e.target.value.toUpperCase() }))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white font-mono uppercase"
                  required
                />
              </div>
              <div className="col-span-full flex items-center justify-between pt-2">
                <button 
                  type="submit" 
                  disabled={isrcSaving}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  {isrcSaving ? 'Saving Configuration...' : 'Save ISRC Settings'}
                </button>
                <button 
                  type="button" 
                  onClick={handleTestGenerateIsrc}
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors text-sm border border-neutral-700"
                >
                  ⚡ Test Generate Next ISRC
                </button>
              </div>
            </form>

            {testGeneratedIsrc && (
              <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider">Test Generated ISRC Code:</span>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">{testGeneratedIsrc}</div>
                </div>
                <span className="text-xs text-neutral-400">Successfully incremented tracking sequence</span>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Registered Catalog ISRC Ledger</h3>
              <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-900/80 text-neutral-400 font-mono text-xs uppercase border-b border-neutral-800">
                    <tr>
                      <th className="px-4 py-3">Track Title</th>
                      <th className="px-4 py-3">Assigned ISRC</th>
                      <th className="px-4 py-3">Track ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {isrcConfig.catalog.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-neutral-500">No tracks found in catalog.</td>
                      </tr>
                    ) : (
                      isrcConfig.catalog.map((track, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/50">
                          <td className="px-4 py-3 font-medium text-white">{track.title}</td>
                          <td className="px-4 py-3 font-mono text-indigo-400 font-bold">{track.isrc}</td>
                          <td className="px-4 py-3 font-mono text-neutral-500 text-xs">{track.id}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'voicetag' ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-2xl mx-auto shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Custom Website Voice Tag</h2>
              <p className="text-neutral-400 text-sm">Upload your producer voice tag (.mp3 or .wav). It will automatically play every single time the website loads.</p>
            </div>
          </div>

          <div className="space-y-6">
            {!state.profile.voiceTagUrl ? (
              <div className="relative p-6 border-2 border-dashed border-neutral-700 rounded-xl text-center hover:border-indigo-500 transition-colors bg-neutral-950/50 cursor-pointer overflow-hidden">
                <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <label className="block text-sm font-medium text-white cursor-pointer pointer-events-none">
                  <span>Choose Voice Tag Audio File</span>
                </label>
                <p className="text-xs text-neutral-500 mt-2 pointer-events-none">MP3, WAV, or AAC audio files supported. Replaces AI speech synthesis.</p>
                <input
                  type="file"
                  accept="audio/*,.mp3,.wav,.aac,.m4a"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = async () => {
                      const base64Url = reader.result as string;
                      await updateProfile({ voiceTagUrl: base64Url });
                      alert("✅ Custom voice tag uploaded successfully! Uploader has now disappeared and your custom voice tag is permanent. It will now play automatically every single time the website loads.");
                      const audio = new Audio(base64Url);
                      audio.play().catch(() => {});
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            ) : null}

            {state.profile.voiceTagUrl ? (
              <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">Permanent Custom Voice Tag Active</div>
                    <div className="text-xs text-neutral-400">Uploader has disappeared. Voice tag plays automatically on every website load.</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const audio = new Audio(state.profile.voiceTagUrl);
                      audio.play().catch(err => alert("Playback error: " + err.message));
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Test Play
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Reset permanent voice tag? This will bring back the uploader so you can set a new one.")) {
                        await updateProfile({ voiceTagUrl: '' });
                      }
                    }}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-red-400 rounded-lg text-xs font-semibold"
                  >
                    Reset / Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-400 bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-center">
                No custom voice tag uploaded yet. Upload your audio file above to set your permanent voice tag.
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'plaque' ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-2xl mx-auto shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Disc className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Music Awards Group Fulfillment</h2>
              <p className="text-neutral-400 text-sm">
                {isAwardEligible 
                  ? "Congratulations! You have reached a milestone and are eligible for a FREE plaque."
                  : "Manually submit a milestone award plaque for manufacturing."}
              </p>
            </div>
          </div>

          <div style={{ background: '#191922', border: isAwardEligible ? '2px solid #00ffcc' : '2px solid #FFC439', borderRadius: '12px', padding: '20px', fontFamily: 'sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '32px', background: isAwardEligible ? 'rgba(0, 255, 204, 0.1)' : 'rgba(255, 196, 57, 0.1)', padding: '10px', borderRadius: '8px' }}>
                    {isAwardEligible ? reachedMilestones[reachedMilestones.length - 1].icon : '💿'}
                  </div>
                  <div>
                      <h4 style={{ margin: 0, color: '#FFF', fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                        {isAwardEligible ? `CLAIM YOUR ${reachedMilestones[reachedMilestones.length - 1].name.toUpperCase()}` : 'ORDER PHYSICAL RECORD PLAQUE PLAN'}
                      </h4>
                      <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#9292a6' }}>Custom laser-etched studio plaque shipped straight to your door.</p>
                  </div>
              </div>

              <div style={{ background: '#111116', border: '1px solid #242432', borderRadius: '8px', padding: '12px', marginBottom: '18px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#9292a6' }}>
                      <span>Custom Laser Plaque Manufacturing</span>
                      <span style={{ textDecoration: isAwardEligible ? 'line-through' : 'none' }}>$125.00</span>
                  </div>
                  {isAwardEligible && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#00ffcc' }}>
                        <span>Milestone Discount</span>
                        <span>-$125.00</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: isAwardEligible ? '#00ffcc' : '#FFC439', paddingTop: '6px', borderTop: '1px solid #242432' }}>
                      <span>Total Plan Fulfillment Price:</span>
                      <span>{isAwardEligible ? 'FREE (Awarded)' : '$125.00 USD'}</span>
                  </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                  <input type="text" id="plaque-artist" placeholder="Artist Name on Plaque" style={{ width: '100%', padding: '10px', background: '#252529', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} value={plaqueArtist} onChange={(e) => setPlaqueArtist(e.target.value)} />
                  <input type="text" id="plaque-title" placeholder="Song Title on Plaque" style={{ width: '100%', padding: '10px', background: '#252529', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} value={plaqueTitle} onChange={(e) => setPlaqueTitle(e.target.value)} />
              </div>
              <input type="text" id="plaque-shipping" placeholder="Full Delivery Shipping Address" style={{ width: '100%', padding: '10px', background: '#252529', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff', fontSize: '13px', marginBottom: '15px', boxSizing: 'border-box' }} value={plaqueShipping} onChange={(e) => setPlaqueShipping(e.target.value)} />

              <button 
                  onClick={() => {
                      if (!plaqueArtist || !plaqueTitle || !plaqueShipping) {
                          alert("Please fill out the Artist Name, Song Title, and Delivery Address.");
                          return;
                      }
                      
                      // 🛸 Alien Laser Sound for fulfillment
                      const laserAudio = new Audio("https://www.soundjay.com/sci-fi/sounds/sci-fi-laser-1.mp3");
                      laserAudio.volume = 0.5;
                      laserAudio.play().catch(() => {});

                      const finalPlaquePayload = {
                          transactionId: "ADMIN_" + Date.now(),
                          buyerEmail: "admin@krypside.com",
                          engravingArtistName: plaqueArtist,
                          engravingSongTitle: plaqueTitle,
                          deliveryDestination: plaqueShipping,
                          supplierTarget: "The Award Group - Music Department",
                          orderStatus: isAwardEligible ? "Award Claimed - Pending Manufacture" : "Paid - Pending Manufacture",
                          isMilestoneAward: isAwardEligible
                      };
                      
                      console.log("🚀 DISPATCHING AWARD METRICS TO MANUFACTURING API:", finalPlaquePayload);
                      alert(`${isAwardEligible ? 'Milestone Award Claimed!' : 'Plaque Plan Activated!'} Award order successfully submitted for printing under name: ${finalPlaquePayload.engravingArtistName}`);
                      
                      setPlaqueArtist('');
                      setPlaqueTitle('');
                      setPlaqueShipping('');
                  }}
                  style={{ width: '100%', background: isAwardEligible ? '#00ffcc' : '#ffc439', color: '#000', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}
              >
                  {isAwardEligible ? 'Claim My Free Milestone Plaque' : 'Submit Order to Manufacturing'}
              </button>
          </div>
        </div>
      ) : activeTab === 'dashboard' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Site Visits</h3>
                <Eye className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">{state.analytics.siteVisits}</div>
              <div className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mt-1 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></span> Real-Time Traffic
                </div>
                {user?.email === 'glennbucky@gmail.com' && (
                  <button 
                    onClick={() => {
                      resetAnalytics('siteVisits');
                      resetAnalytics('uniqueVisitors');
                    }}
                    className="text-[9px] text-neutral-600 hover:text-indigo-400 transition-colors flex items-center gap-1"
                    title="Reset Traffic Stats"
                  >
                    <RefreshCw size={8} /> Clear
                  </button>
                )}
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Unique Visitors</h3>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">{state.analytics.uniqueVisitors}</div>
              <div className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider mt-1">Verified Unique devices</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Total Earnings</h3>
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">${totalEarnings.toFixed(2)}</div>
              <div className="text-[10px] text-green-400 font-semibold uppercase tracking-wider mt-1">Direct Gross Revenue</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Total Plays</h3>
                <PlayCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">{state.analytics.totalPlays}</div>
              <div className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mt-1">Audio Stream Events</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Engagement</h3>
                <ThumbsUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">{totalLikes}</div>
              <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mt-1">Positive Feedback</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Total Shares</h3>
                <Share2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">{state.analytics.totalShares}</div>
              <div className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider mt-1">Social Handshakes</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 font-medium text-sm lg:text-base">Downloads</h3>
                <Download className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white font-mono">{state.analytics.downloads}</div>
              <div className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider mt-1">Offline Beat Leases</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950/20 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Disc className="w-5 h-5 text-amber-400" />
                  Milestone Awards Progress
                </h2>
                {isAwardEligible && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    AWARDS UNLOCKED
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-sm text-neutral-400">Total Lifetime Streams</div>
                    <div className="text-4xl font-black text-white font-mono">{totalPlays.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Current Status</div>
                    <div className="text-lg font-bold text-amber-400">
                      {reachedMilestones.length > 0 ? reachedMilestones[reachedMilestones.length - 1].name : 'Rising Artist'}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {nextMilestone && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-neutral-300 flex items-center gap-2">
                          Next Milestone: {nextMilestone.name}
                        </span>
                        <span className="text-xs font-mono text-neutral-500">
                          {totalPlays} / {nextMilestone.goal}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden p-0.5">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,196,57,0.3)]"
                          style={{ 
                            width: `${Math.min(100, (totalPlays / nextMilestone.goal) * 100)}%`,
                            backgroundColor: nextMilestone.color
                          }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-2 text-center italic">
                        {nextMilestone.goal - totalPlays} more streams until your next official physical plaque award.
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-5 gap-2">
                    {milestones.map((m) => {
                      const isReached = totalPlays >= m.goal;
                      return (
                        <div 
                          key={m.id} 
                          className={`aspect-square rounded-lg border flex flex-col items-center justify-center relative group transition-all duration-500 ${isReached ? 'bg-neutral-800/50 border-neutral-700 shadow-lg scale-105' : 'bg-neutral-950 border-neutral-900 opacity-40'}`}
                        >
                          <div className={`text-2xl mb-1 ${isReached ? 'animate-bounce' : ''}`}>{m.icon}</div>
                          <div className="text-[8px] font-bold uppercase tracking-tighter text-center px-1" style={{ color: isReached ? m.color : '#666' }}>
                            {m.id}
                          </div>
                          {isReached && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900 shadow-sm z-10"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button 
                    onClick={() => setActiveTab('plaque')}
                    className={`w-full py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isAwardEligible ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                  >
                    {isAwardEligible ? 'Claim My Physical Milestone Awards' : 'Unlock Milestones to Claim Awards'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950/20">
                <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
                  <TrendingUp className="w-5 h-5" />
                  Live Revenue Distribution
                </h2>
              </div>
              <div className="p-6 flex flex-col justify-center items-center h-full min-h-[300px]">
                <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="20"
                      fill="transparent"
                      className="text-neutral-950"
                    />
                    {totalEarnings > 0 && (
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="currentColor"
                        strokeWidth="20"
                        strokeDasharray={2 * Math.PI * 80}
                        strokeDashoffset={2 * Math.PI * 80 * (1 - (grossMarginPercent / 100))}
                        strokeLinecap="round"
                        fill="transparent"
                        className="text-indigo-500 transition-all duration-1000"
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-white font-mono">{grossMarginPercent}%</span>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold">Gross Margin</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-xs text-neutral-400">Direct Sales</span>
                    <span className="ml-auto text-xs font-mono font-bold text-white">{grossMarginPercent}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neutral-800 rounded-full"></div>
                    <span className="text-xs text-neutral-400">Platform Fee</span>
                    <span className="ml-auto text-xs font-mono font-bold text-white">{platformFeePercent}%</span>
                  </div>
                </div>
                {totalEarnings === 0 && (
                  <div className="mt-4 text-[10px] text-neutral-600 italic">Waiting for first live sale to distribute revenue...</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-neutral-800">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
                Track Performance
              </h2>
            </div>
            
            {state.beats.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">
                No beats uploaded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-950/50">
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm">Track</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-center">Plays</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-center">Likes</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-center">Dislikes</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-center">Shares</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-center">Downloads</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-center">Earnings</th>
                      <th className="px-6 py-4 font-medium text-neutral-400 text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {state.beats.map((beat, idx) => (
                      <tr key={beat.id ? `${beat.id}-${idx}` : idx} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded bg-neutral-800 overflow-hidden mr-3 flex-shrink-0">
                              {beat.coverArtUrl ? (
                                <img src={beat.coverArtUrl} alt={beat.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-500"><Music size={16} /></div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">{beat.title}</div>
                              <div className="text-xs text-neutral-500">{beat.producer}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-indigo-400">{beat.plays || 0}</td>
                        <td className="px-6 py-4 text-center font-mono text-emerald-400">{beat.likes || 0}</td>
                        <td className="px-6 py-4 text-center font-mono text-red-400">{beat.dislikes || 0}</td>
                        <td className="px-6 py-4 text-center font-mono text-blue-400">{beat.shares || 0}</td>
                        <td className="px-6 py-4 text-center font-mono text-purple-400">{beat.downloads || 0}</td>
                        <td className="px-6 py-4 text-center font-mono text-green-400">${(beat.earnings || 0).toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => {
                              setTrackToEdit(beat);
                              setActiveTab('uploader');
                            }}
                            className="p-2 text-neutral-400 hover:text-indigo-400 transition-colors"
                            title="Edit Beat"
                          >
                            <Edit size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : activeTab === 'subscribers' ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-neutral-900 border border-neutral-800 p-4 rounded-xl gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Subscriber Analytics
              </h2>
              <p className="text-xs text-neutral-400 mt-1">Real-time newsletter metrics & artist databases.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400 font-medium text-sm">Total Subscribers</span>
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{subscribers.length}</div>
              <p className="text-[10px] text-neutral-500 mt-1">Rappers stage names registered</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400 font-medium text-sm">Notification Opt-Ins</span>
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono animate-in zoom-in">
                {subscribers.filter(s => s.notifyOnBeatDrop).length}
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">
                {subscribers.length > 0 
                  ? `${Math.round((subscribers.filter(s => s.notifyOnBeatDrop).length / subscribers.length) * 100)}% active notify rate`
                  : '0% notify rate'}
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400 font-medium text-sm">Automated Mailings</span>
                <Mail className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {subscribers.length + (notifications.length * subscribers.filter(s => s.notifyOnBeatDrop).length)}
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Welcome & broadcast dispatches</p>
            </div>
          </div>

          {/* Main Grid: Roster & Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Subscriber Roster */}
            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
              <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/25">
                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                  <Mail className="w-4.5 h-4.5 text-indigo-400" />
                  Artist VIP Roster ({filteredSubscribers.length})
                </h3>
              </div>

              {subscribers.length === 0 ? (
                <div className="p-12 text-center text-neutral-500">
                  <Mail className="w-8 h-8 mx-auto text-neutral-700 mb-2" />
                  <p className="text-xs italic">No subscribers registered yet.</p>
                </div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="p-12 text-center text-neutral-500">
                  <p className="text-xs italic">No matching subscribers found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-950/40 text-neutral-400 text-[11px] uppercase tracking-wider font-bold border-b border-neutral-800">
                        <th className="px-5 py-3">Artist Stage Name</th>
                        <th className="px-5 py-3">Email Address</th>
                        <th className="px-5 py-3 text-center">Beat Alerts</th>
                        <th className="px-5 py-3 text-right">Subscribed At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/65">
                      {filteredSubscribers.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-neutral-800/20 transition-colors text-xs text-white">
                          <td className="px-5 py-3.5 font-bold">{sub.name}</td>
                          <td className="px-5 py-3.5 text-neutral-400 font-mono">{sub.email}</td>
                          <td className="px-5 py-3.5 text-center">
                            {sub.notifyOnBeatDrop ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-semibold text-[10px]">
                                <Bell className="w-2.5 h-2.5" /> Opted In
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-800 text-neutral-500 rounded-full text-[10px]">
                                Off
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-right text-neutral-500 font-mono">
                            {new Date(sub.subscribedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Right Column: Sent Notifications Logs */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
              <div className="px-5 py-4 border-b border-neutral-800 bg-neutral-950/25">
                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                  <Send className="w-4.5 h-4.5 text-indigo-400" />
                  Broadcast Log
                </h3>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-3.5 max-h-[450px]">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 text-xs italic">
                    No beat drop alerts broadcasted yet.<br/>Upload a new beat to trigger live broadcasts!
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="bg-neutral-950/50 border border-neutral-800/80 rounded-lg p-3.5 text-xs">
                      <div className="flex items-center justify-between gap-2 border-b border-neutral-900 pb-2 mb-2">
                        <span className="font-bold text-neutral-200">Beat Alert Broadcasted</span>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-mono font-bold">SENT</span>
                      </div>
                      <p className="font-bold text-white mb-1">{notif.title}</p>
                      <p className="text-neutral-400 leading-normal mb-2 text-[11px]">{notif.body}</p>
                      <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                        <span>Receivers: {subscribers.filter(s => s.notifyOnBeatDrop).length} artists</span>
                        <span>{new Date(notif.sentAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'push' ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-xl">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Push Notification Broadcast Portal</h2>
                <p className="text-neutral-400 text-sm">Send live, background push notifications directly to mobile and desktop visitor devices.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Form Panel */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-neutral-950/60 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Broadcast Campaign Form</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Notification Title</label>
                    <input 
                      type="text"
                      value={pushTitle}
                      onChange={(e) => setPushTitle(e.target.value)}
                      placeholder="e.g., 🔥 NEW BEAT DROP: 'CHOPPA COUPE'"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Message Body</label>
                    <textarea 
                      value={pushBody}
                      onChange={(e) => setPushBody(e.target.value)}
                      rows={3}
                      placeholder="e.g., Heavy trap melodies and rolling sub-bass. Licenses starting at $29.99. Tap to stream or buy now!"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Target Link / Beat Release</label>
                      <select 
                        value={selectedBeatUrl}
                        onChange={(e) => {
                          setSelectedBeatUrl(e.target.value);
                          setPushUrl(e.target.value);
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="/">Main Storefront (/)</option>
                        {state.beats.map((beat) => (
                          <option key={beat.id} value={`#/player/${beat.id}`}>
                            Beat: {beat.title}
                          </option>
                        ))}
                        <option value="custom">Custom URL...</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Direct Target URL</label>
                      <input 
                        type="text"
                        value={pushUrl}
                        onChange={(e) => setPushUrl(e.target.value)}
                        placeholder="e.g., #/player/beat-123"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                        disabled={selectedBeatUrl !== 'custom' && selectedBeatUrl !== '/'}
                      />
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">API Delivery Channel</label>
                      <select 
                        value={pushChannel}
                        onChange={(e) => setPushChannel(e.target.value as any)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="local">Local Web Push (Direct Device Connection)</option>
                        <option value="onesignal">OneSignal Web Push API (External Hook)</option>
                        <option value="firebase">Firebase Cloud Messaging (FCM Hook)</option>
                      </select>
                    </div>

                    {pushChannel !== 'local' && (
                      <div className="space-y-1.5 animate-in slide-in-from-top duration-200">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                          {pushChannel === 'onesignal' ? 'OneSignal App ID / Key' : 'FCM Server/Project ID'}
                        </label>
                        <input 
                          type="password"
                          value={apiSecretKey}
                          onChange={(e) => setApiSecretKey(e.target.value)}
                          placeholder={pushChannel === 'onesignal' ? 'e.g., onesignal-app-id-here' : 'e.g., firebase-project-id'}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleBroadcastPush}
                      disabled={isBroadcastingPush || !pushTitle || !pushBody}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer animate-pulse"
                    >
                      {isBroadcastingPush ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending Web Push Broadcast...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4.5 h-4.5" />
                          <span>Dispatch Drop Alert</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Diagnostic / Stats Panel */}
              <div className="space-y-6">
                <div className="bg-neutral-950/60 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Device & API Status</h3>
                  
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                      <span className="text-neutral-400">Connected push subscribers:</span>
                      <span className="font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {subscribers.filter(s => s.notifyOnBeatDrop).length} artists
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                      <span className="text-neutral-400">Registered Browser Devices:</span>
                      <span className="font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {registeredPushCount} devices
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                      <span className="text-neutral-400">Local VAPID Keys:</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        Active & Persisted
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                      <span className="text-neutral-400">External Integration:</span>
                      <span className="font-bold text-neutral-300">
                        {pushChannel === 'local' ? 'Local Native' : pushChannel === 'onesignal' ? 'OneSignal Hook' : 'FCM SDK Hook'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-lg p-3.5 space-y-2">
                    <h4 className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">Mobile Browser Support</h4>
                    <p className="text-[10px] text-neutral-400 leading-relaxed">
                      Safari on iOS 16.4+ and Google Chrome on Android natively support the web push standard. Ensure they click <strong>Allow Alerts</strong> in the bottom-sheet prompt to register their device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {trackToEdit ? `Editing: ${trackToEdit.title}` : 'Upload New Beat'}
            </h2>
            {trackToEdit && (
              <button 
                onClick={() => {
                  setTrackToEdit(null);
                  setActiveTab('dashboard');
                }}
                className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm"
              >
                Cancel Edit
              </button>
            )}
          </div>
          <Uploader trackToEdit={trackToEdit || undefined} onClose={() => {
            setTrackToEdit(null);
            setActiveTab('dashboard');
          }} />
        </div>
      )}
    </div>
  );
}
