import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const suggestionPrompts = [
  'Apa makna gotong royong dalam adat Sunda?',
  'Jelaskan ciri rumah adat Sunda dengan bahasa sederhana.',
  'Kenapa angklung dianggap penting dalam budaya Sunda?',
]

const topicBadges = ['Adat', 'Filosofi', 'Busana', 'Angklung', 'Rumah']

const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    text: 'Wilujeng sumping. Saya siap membantu menjelaskan adat Sunda, mulai dari filosofi hidup, rumah adat, busana, sampai musik tradisinya.',
  },
]

function buildHistory(messages) {
  return messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    text: message.text,
  }))
}

function MessageMarkdown({ children }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children: content }) => <p className="m-0">{content}</p>,
        ul: ({ children: content }) => (
          <ul className="my-2 list-disc space-y-1 pl-5">{content}</ul>
        ),
        ol: ({ children: content }) => (
          <ol className="my-2 list-decimal space-y-1 pl-5">{content}</ol>
        ),
        li: ({ children: content }) => <li className="pl-1">{content}</li>,
        strong: ({ children: content }) => (
          <strong className="font-semibold text-[var(--color-cream)]">{content}</strong>
        ),
        em: ({ children: content }) => <em className="italic">{content}</em>,
        code: ({ children: content }) => (
          <code className="rounded bg-[rgba(255,255,255,0.08)] px-1.5 py-0.5 text-[0.92em]">
            {content}
          </code>
        ),
        pre: ({ children: content }) => (
          <pre className="my-3 overflow-x-auto rounded-2xl bg-[rgba(0,0,0,0.24)] p-4 text-[0.92em] leading-6">
            {content}
          </pre>
        ),
        blockquote: ({ children: content }) => (
          <blockquote className="my-3 border-l-2 border-[rgba(206,180,123,0.35)] pl-4 text-[rgba(244,236,223,0.78)]">
            {content}
          </blockquote>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  )
}

export function SundaAiChat({ reducedMotion }) {
  const MotionDiv = motion.div
  const MotionAside = motion.aside
  const MotionButton = motion.button
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bodyRef = useRef(null)
  const messageIdRef = useRef(1)

  function createMessageId(role) {
    messageIdRef.current += 1
    return `${role}-${messageIdRef.current}`
  }

  useEffect(() => {
    if (!bodyRef.current) {
      return
    }

    bodyRef.current.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [messages, isLoading, isOpen, reducedMotion])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  async function sendMessage(rawText) {
    const text = rawText.trim()

    if (!text || isLoading) {
      return
    }

    const nextUserMessage = {
      id: createMessageId('user'),
      role: 'user',
      text,
    }

    const history = buildHistory(messages)

    setMessages((current) => [...current, nextUserMessage])
    setInputValue('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error || 'AI tidak dapat menjawab saat ini.')
      }

      setMessages((current) => [
        ...current,
        {
          id: createMessageId('assistant'),
          role: 'assistant',
          text: payload.reply,
        },
      ])
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Terjadi kendala saat menghubungi asisten AI.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(inputValue)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage(inputValue)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <MotionDiv
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-[rgba(3,5,3,0.52)] backdrop-blur-[2px]"
              exit={{ opacity: 0 }}
              initial={reducedMotion ? false : { opacity: 0 }}
              onClick={() => setIsOpen(false)}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
            />

            <MotionAside
              animate={{ opacity: 1, y: 0, scale: 1 }}
              aria-label="Asisten AI Adat Sunda"
              aria-modal="true"
              aria-busy={isLoading}
              className="fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden border border-[rgba(206,180,123,0.18)] bg-[linear-gradient(180deg,rgba(12,16,12,0.995),rgba(5,8,6,0.99))] shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-auto md:right-6 md:top-6 md:h-auto md:max-h-[calc(100dvh-3rem)] md:w-[min(54rem,calc(100vw-3rem))] md:rounded-[1.5rem] md:shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
              data-lenis-prevent="true"
              data-lenis-prevent-touch="true"
              data-lenis-prevent-wheel="true"
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
              role="dialog"
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
            >
              <header className="relative z-30 shrink-0 border-b border-[rgba(206,180,123,0.18)] bg-[linear-gradient(180deg,rgba(15,20,15,0.995),rgba(9,12,9,0.985))] px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.85rem)] shadow-[0_14px_34px_rgba(0,0,0,0.28)] md:px-5 md:py-4 md:shadow-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] border border-[rgba(206,180,123,0.2)] bg-[rgba(206,180,123,0.1)] text-[var(--color-accent)]">
                      <span className="text-[0.95rem] leading-none">*</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                        <h2 className="font-display text-[1.35rem] leading-none text-[var(--color-cream)] md:text-[1.55rem]">
                        Tanya budaya Sunda
                        </h2>
                        <span className="rounded-full border border-[rgba(206,180,123,0.2)] bg-[rgba(206,180,123,0.08)] px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.18em] text-[rgba(246,238,224,0.6)]">
                          AI
                        </span>
                      </div>
                      <p className="mt-1 max-w-[34rem] text-[0.72rem] leading-5 text-[rgba(246,238,224,0.72)] md:text-[0.8rem] md:leading-[1.35rem]">
                        Bahas adat, tata krama, rumah adat, angklung, dan nilai hidup masyarakat Sunda.
                      </p>
                    </div>
                  </div>

                  <button
                    aria-label="Tutup panel AI"
                    className="relative z-40 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(5,7,5,0.72)] text-[var(--color-cream)] transition-colors duration-300 hover:bg-[rgba(255,255,255,0.08)] focus-visible:ring-2 focus-visible:ring-[rgba(206,180,123,0.56)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b08] md:h-10 md:w-10"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.9"
                      />
                    </svg>
                  </button>
                </div>
              </header>

              <div className="relative z-0 flex min-h-0 flex-1 overflow-hidden bg-[linear-gradient(180deg,rgba(8,11,8,0.34),rgba(7,10,8,0.08))] md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
                <aside
                  className="hidden min-h-0 overflow-y-auto border-r border-[rgba(206,180,123,0.1)] bg-[rgba(255,255,255,0.02)] p-4 md:block"
                  data-lenis-prevent="true"
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.24em] text-[rgba(228,219,201,0.46)]">
                    Topik Cepat
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {suggestionPrompts.map((prompt) => (
                      <button
                        className="rounded-[0.95rem] border border-[rgba(206,180,123,0.13)] bg-[rgba(255,255,255,0.035)] px-3 py-3 text-left text-[0.75rem] leading-5 text-[rgba(228,219,201,0.76)] transition-colors duration-300 hover:border-[rgba(206,180,123,0.28)] hover:text-[var(--color-cream)] disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isLoading}
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        type="button"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topicBadges.map((topic) => (
                      <span
                        className="rounded-full border border-[rgba(255,255,255,0.08)] px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-[rgba(228,219,201,0.48)]"
                        key={topic}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </aside>

                <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <div
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 [-webkit-overflow-scrolling:touch] [touch-action:pan-y] md:px-5 md:py-5"
                    data-lenis-prevent="true"
                    data-lenis-prevent-touch="true"
                    data-lenis-prevent-wheel="true"
                    ref={bodyRef}
                  >
                    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-end gap-3 md:gap-4">
                      {messages.map((message) => (
                        <div
                          className={`flex items-start gap-2 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                          key={message.id}
                        >
                          {message.role === 'assistant' && (
                            <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(206,180,123,0.16)] bg-[rgba(206,180,123,0.07)] text-[0.62rem] text-[var(--color-accent)] md:h-8 md:w-8 md:text-[0.7rem]">
                              AI
                            </span>
                          )}
                          <div
                            className={`max-w-[min(100%,34rem)] rounded-[1.15rem] px-3.5 py-3 text-[0.84rem] leading-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:max-w-[88%] md:max-w-[82%] md:rounded-[1.25rem] md:px-5 md:py-4 md:text-[0.96rem] md:leading-6 ${
                              message.role === 'assistant'
                                ? 'border border-[rgba(206,180,123,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] text-[rgba(244,236,223,0.94)]'
                                : 'bg-[linear-gradient(135deg,rgba(201,176,125,0.95),rgba(160,128,79,0.95))] text-[#1f1408]'
                            }`}
                          >
                            {message.role === 'assistant' ? (
                              <div className="max-w-none space-y-3 break-words [&_p+p]:mt-3 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[rgba(255,255,255,0.08)] [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-[rgba(255,255,255,0.12)] [&_th]:px-3 [&_th]:py-2">
                                <MessageMarkdown>{message.text}</MessageMarkdown>
                              </div>
                            ) : (
                              <p className="m-0 whitespace-pre-line break-words">{message.text}</p>
                            )}
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex items-start justify-start gap-2">
                          <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(206,180,123,0.16)] bg-[rgba(206,180,123,0.07)] text-[0.62rem] text-[var(--color-accent)] md:h-8 md:w-8 md:text-[0.7rem]">
                            AI
                          </span>
                          <div className="flex items-center gap-2 rounded-[1.15rem] border border-[rgba(206,180,123,0.14)] bg-[rgba(255,255,255,0.04)] px-3.5 py-3 text-[0.84rem] text-[rgba(244,236,223,0.72)] md:rounded-[1.25rem] md:px-5 md:py-4 md:text-[0.96rem]">
                            <span>AI sedang merangkai jawaban</span>
                            <span className="flex gap-1" aria-hidden="true">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgba(206,180,123,0.7)]" />
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgba(206,180,123,0.55)] [animation-delay:120ms]" />
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgba(206,180,123,0.4)] [animation-delay:240ms]" />
                            </span>
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="rounded-[1rem] border border-[rgba(255,145,128,0.18)] bg-[rgba(88,22,16,0.32)] px-4 py-3 text-sm leading-6 text-[rgba(255,224,216,0.9)] md:text-[0.96rem]">
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              <footer className="relative z-30 shrink-0 border-t border-[rgba(206,180,123,0.14)] bg-[linear-gradient(180deg,rgba(7,10,7,0.96),rgba(4,6,4,0.995))] px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.8rem)] pt-3 shadow-[0_-12px_30px_rgba(0,0,0,0.28)] md:px-5 md:pb-4 md:pt-4 md:shadow-none">
                <div
                  className="-mx-1 mb-2.5 flex gap-2 overflow-x-auto px-1 pb-0.5 overscroll-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden md:hidden"
                  data-lenis-prevent="true"
                  data-lenis-prevent-touch="true"
                >
                  {suggestionPrompts.map((prompt) => (
                    <button
                      className="w-[12.25rem] shrink-0 rounded-[0.95rem] border border-[rgba(206,180,123,0.18)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-left text-[0.64rem] leading-4 text-[rgba(228,219,201,0.78)] transition-colors duration-300 hover:border-[rgba(206,180,123,0.34)] hover:text-[var(--color-cream)] disabled:cursor-not-allowed disabled:opacity-50 md:px-3 md:py-2 md:text-[0.68rem] md:leading-5"
                      disabled={isLoading}
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <form className="space-y-2.5 md:space-y-3" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor="sunda-ai-message">
                    Tulis pertanyaan tentang adat Sunda
                  </label>
                  <div className="flex items-end gap-2 rounded-[1.15rem] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.035)] p-2 transition-colors duration-300 focus-within:border-[rgba(206,180,123,0.32)] md:gap-3 md:rounded-[1.2rem]">
                    <textarea
                      className="max-h-28 min-h-12 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-[0.88rem] leading-5 text-[var(--color-cream)] outline-none placeholder:text-[rgba(228,219,201,0.38)] md:min-h-14 md:px-3 md:text-[0.94rem] md:leading-6"
                      data-lenis-prevent="true"
                      data-lenis-prevent-touch="true"
                      disabled={isLoading}
                      id="sunda-ai-message"
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Tanyakan sesuatu tentang adat Sunda..."
                      value={inputValue}
                    />
                    <button
                      aria-label="Kirim pertanyaan"
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(206,180,123,0.28)] bg-[rgba(206,180,123,0.18)] text-[var(--color-cream)] transition-all duration-300 hover:border-[rgba(206,180,123,0.4)] hover:bg-[rgba(206,180,123,0.24)] focus-visible:ring-2 focus-visible:ring-[rgba(206,180,123,0.56)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a07] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-32 md:gap-2 md:px-5 md:text-[0.7rem] md:uppercase md:tracking-[0.24em]"
                      disabled={isLoading || !inputValue.trim()}
                      type="submit"
                    >
                      <span className="hidden md:inline">Kirim</span>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 12h13M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="hidden flex-col gap-2 md:flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1 md:block">
                      <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(228,219,201,0.45)] md:text-[0.66rem] md:tracking-[0.18em]">
                        Fokus pada adat dan budaya Sunda
                      </p>
                      <p className="hidden text-xs text-[rgba(228,219,201,0.42)] md:block">
                        Tekan Enter untuk kirim, Shift + Enter untuk baris baru.
                      </p>
                    </div>
                  </div>
                </form>
              </footer>
            </MotionAside>
          </>
        )}
      </AnimatePresence>

      <MotionButton
        animate={
          isOpen
            ? { opacity: 0, y: 8, scale: 0.98 }
            : reducedMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 1, y: 0, scale: 1 }
        }
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Tutup asisten AI adat Sunda' : 'Buka asisten AI adat Sunda'}
        className={`group fixed right-4 z-50 inline-flex items-center gap-2 rounded-full border border-[rgba(206,180,123,0.18)] bg-[linear-gradient(135deg,rgba(16,20,16,0.76),rgba(8,10,8,0.92))] px-3.5 py-2.5 text-[var(--color-cream)] shadow-[0_18px_54px_rgba(0,0,0,0.38)] outline-none backdrop-blur-xl transition-all duration-300 hover:border-[rgba(206,180,123,0.34)] hover:bg-[linear-gradient(135deg,rgba(36,44,34,0.78),rgba(10,12,10,0.94))] focus-visible:ring-2 focus-visible:ring-[rgba(206,180,123,0.56)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(6,8,6,0.9)] ${isOpen ? 'pointer-events-none' : ''} bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] sm:bottom-5 sm:right-5 sm:px-4 sm:py-3`}
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        onClick={() => setIsOpen((value) => !value)}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
        type="button"
        whileHover={reducedMotion ? undefined : { y: -2 }}
        whileTap={reducedMotion ? undefined : { scale: 0.96 }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full border border-[rgba(246,238,224,0.08)]" />
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(206,180,123,0.18)] bg-[radial-gradient(circle_at_32%_28%,rgba(246,238,224,0.24),rgba(201,176,125,0.16),rgba(6,8,6,0.42))] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 3.6l1.18 4.1a4.2 4.2 0 0 0 2.86 2.86l4.1 1.18-4.1 1.18a4.2 4.2 0 0 0-2.86 2.86L12 19.9l-1.18-4.12a4.2 4.2 0 0 0-2.86-2.86l-4.1-1.18 4.1-1.18a4.2 4.2 0 0 0 2.86-2.86L12 3.6z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
          </svg>
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="text-[0.58rem] uppercase tracking-[0.24em] text-[rgba(246,238,224,0.56)]">
            Asisten
          </span>
          <span className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-cream)]">
            Tanya AI
          </span>
        </span>
        <span className="ml-1 hidden h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(201,176,125,0.7)] sm:inline-flex" />
        <span className="sr-only">
          adat Sunda
        </span>
      </MotionButton>
    </>
  )
}
