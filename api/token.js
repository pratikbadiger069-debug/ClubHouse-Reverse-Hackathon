// Vercel Serverless Function: /api/token
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { roomId, userId, role = 'listener' } = req.body || {};

  const token = `echo_token_${role}_${roomId}_${Date.now()}`;
  
  return res.status(200).json({
    token,
    roomId,
    userId,
    role,
    expiresIn: 3600
  });
}
