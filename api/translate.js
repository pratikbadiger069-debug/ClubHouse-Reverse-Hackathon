// Vercel Serverless Function: /api/translate
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { text, targetLanguage = 'Spanish' } = req.body || {};

  // Mock translation dictionary for offline demo fallback
  const mockTranslations = {
    Spanish: `[ES] ${text}`,
    Hindi: `[HI] ${text}`,
    French: `[FR] ${text}`,
    Mandarin: `[ZH] ${text}`
  };

  const translatedText = mockTranslations[targetLanguage] || `[${targetLanguage}] ${text}`;

  return res.status(200).json({
    original: text,
    translated: translatedText,
    targetLanguage,
    isMachineTranslation: true
  });
}
