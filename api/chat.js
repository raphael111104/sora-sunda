import { generateSundaChatReply } from '../server/geminiChat.js'

function parseRequestBody(body) {
  if (!body) {
    return {}
  }

  if (typeof body === 'string') {
    return JSON.parse(body)
  }

  return body
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const payload = parseRequestBody(req.body)
    const reply = await generateSundaChatReply({
      apiKey: process.env.GEMINI_API_KEY,
      history: payload?.history,
      message: payload?.message,
      modelConfig: process.env.GEMINI_MODELS,
    })

    res.status(200).json({ reply })
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memproses permintaan AI.',
    })
  }
}
