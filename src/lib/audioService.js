// Echo Audio Service Module (LiveKit / Daily Wrapper)
// MOCK MODE SAFE: Returns simulated token flow if keys are missing.

export async function fetchAudioRoomToken(roomId, userId, role = 'listener') {
  const provider = import.meta.env.VITE_AUDIO_PROVIDER || 'mock';

  try {
    if (provider !== 'mock') {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, userId, role })
      });
      if (res.ok) {
        const data = await res.json();
        return data.token;
      }
    }
  } catch (err) {
    console.warn("Audio token endpoint unavailable, using mock token fallback.", err);
  }

  // Fallback Mock Token for Demo Mode
  return `echo_mock_token_${role}_${roomId}_${Date.now()}`;
}

export function createAudioRoomSession(roomId, role = 'listener') {
  return {
    roomId,
    role,
    isConnected: true,
    audioTracks: [],
    leave: () => console.log(`Left room ${roomId}`),
    toggleMic: (muted) => console.log(`Mic muted: ${muted}`)
  };
}
