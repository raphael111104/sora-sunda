import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { generateSundaChatReply } from './server/geminiChat.js'

function geminiDevApi(apiKey) {
  return {
    name: 'gemini-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json')

          try {
            const payload = body ? JSON.parse(body) : {}
            const reply = await generateSundaChatReply({
              apiKey,
              history: payload.history,
              message: payload.message,
            })

            res.statusCode = 200
            res.end(JSON.stringify({ reply }))
          } catch (error) {
            res.statusCode = 500
            res.end(
              JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : 'Terjadi kesalahan saat memproses permintaan AI.',
              }),
            )
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), geminiDevApi(env.GEMINI_API_KEY)],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react')) {
              return 'react'
            }

            if (id.includes('node_modules/motion')) {
              return 'motion'
            }

            if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
              return 'atmosphere'
            }

            return undefined
          },
        },
      },
    },
  }
})
