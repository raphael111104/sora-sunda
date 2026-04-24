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
  }, [messages, isOpen, reducedMotion])

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
              className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] top-[max(5rem,env(safe-area-inset-top,0px))] z-50 grid h-auto grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[1.4rem] border border-[rgba(206,180,123,0.22)] bg-[linear-gradient(180deg,rgba(10,14,10,0.988),rgba(7,10,8,0.97))] shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6 md:top-14 md:h-auto md:w-[min(52rem,calc(100vw-3rem))] md:max-w-none md:rounded-[1.5rem] md:shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
              data-lenis-prevent="true"
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
              role="dialog"
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
            >
              <div className="px-4 pt-1.5 md:hidden">
                <div className="mx-auto h-1 w-12 rounded-full bg-[rgba(246,238,224,0.16)]" />
              </div>

              <div className="border-b border-[rgba(206,180,123,0.14)] px-2.5 py-1.5 md:bg-[linear-gradient(135deg,rgba(201,176,125,0.16),rgba(36,50,38,0.36))] md:px-4.5 md:py-2.5">
                <div className="rounded-[1rem] border border-[rgba(206,180,123,0.14)] bg-[linear-gradient(135deg,rgba(201,176,125,0.14),rgba(36,50,38,0.26))] px-3 py-2 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
                  <div className="flex items-start justify-between gap-2 md:items-center md:gap-3.5">
                    <div className="flex min-w-0 flex-1 items-start gap-2.5 md:items-center">
                    <div className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border border-[rgba(206,180,123,0.18)] bg-[rgba(206,180,123,0.08)] text-[var(--color-accent)] md:flex">
                      <span className="text-[0.95rem] leading-none">*</span>
                    </div>
                    <div className="min-w-0 max-w-[13.5rem] md:max-w-none">
                      <h2 className="font-display text-[1.08rem] leading-none text-[var(--color-cream)] md:mt-1 md:text-[1.45rem]">
                        Tanya budaya Sunda
                      </h2>
                      <p className="mt-0.5 max-w-[34rem] text-[0.68rem] leading-4.5 text-[rgba(246,238,224,0.72)] md:mt-1 md:text-[0.78rem] md:leading-[1.35rem]">
                        Bahas adat, tata krama, rumah adat, angklung, dan nilai hidup masyarakat Sunda.
                      </p>
                    </div>
                    </div>

                    <button
                      aria-label="Tutup panel AI"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(5,7,5,0.28)] text-[var(--color-cream)] transition-colors duration-300 hover:bg-[rgba(255,255,255,0.08)] md:h-8.5 md:w-8.5"
                      onClick={() => setIsOpen(false)}
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        className="h-2.25 w-2.25 md:h-3 md:w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="min-h-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.34),rgba(7,10,8,0.08))] md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
                <aside className="hidden border-r border-[rgba(206,180,123,0.1)] bg-[rgba(255,255,255,0.02)] p-4 md:block">
                  <p className="text-[0.58rem] uppercase tracking-[0.24em] text-[rgba(228,219,201,0.46)]">
                    Topik Cepat
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {suggestionPrompts.map((prompt) => (
                      <button
                        className="rounded-[0.95rem] border border-[rgba(206,180,123,0.13)] bg-[rgba(255,255,255,0.035)] px-3 py-3 text-left text-[0.75rem] leading-5 text-[rgba(228,219,201,0.76)] transition-colors duration-300 hover:border-[rgba(206,180,123,0.28)] hover:text-[var(--color-cream)]"
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

                <div className="min-h-0 px-3 py-3 md:px-5 md:py-5">
                  <div
                    className="h-full overflow-y-auto overscroll-contain pr-1 [touch-action:pan-y] md:pr-2"
                    data-lenis-prevent="true"
                    ref={bodyRef}
                  >
                    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-3 md:gap-4">
                      {messages.map((message) => (
                        <div
                          className={`flex gap-2 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                          key={message.id}
                        >
                          {message.role === 'assistant' && (
                            <span className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(206,180,123,0.16)] bg-[rgba(206,180,123,0.07)] text-[0.7rem] text-[var(--color-accent)] md:inline-flex">
                              AI
                            </span>
                          )}
                          <div
                            className={`max-w-[96%] rounded-[1.15rem] px-3.5 py-3 text-[0.84rem] leading-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:max-w-[88%] md:max-w-[82%] md:rounded-[1.25rem] md:px-5 md:py-4 md:text-[0.96rem] md:leading-6 ${
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
                        <div className="flex justify-start gap-2">
                          <span className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(206,180,123,0.16)] bg-[rgba(206,180,123,0.07)] text-[0.7rem] text-[var(--color-accent)] md:inline-flex">
                            AI
                          </span>
                          <div className="rounded-[1.15rem] border border-[rgba(206,180,123,0.14)] bg-[rgba(255,255,255,0.04)] px-3.5 py-3 text-[0.84rem] text-[rgba(244,236,223,0.72)] md:rounded-[1.25rem] md:px-5 md:py-4 md:text-[0.96rem]">
                            AI sedang merangkai jawaban...
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
                </div>
              </div>

              <div className="border-t border-[rgba(206,180,123,0.12)] bg-[rgba(6,8,6,0.92)] px-3 py-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] md:px-5 md:py-4 md:pb-4">
                <div
                  className="-mx-1 mb-2.5 flex gap-2 overflow-x-auto px-1 pb-1 overscroll-contain [touch-action:pan-x] md:hidden"
                  data-lenis-prevent="true"
                >
                  {suggestionPrompts.map((prompt) => (
                    <button
                      className="shrink-0 rounded-full border border-[rgba(206,180,123,0.18)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-left text-[0.64rem] leading-4 text-[rgba(228,219,201,0.78)] transition-colors duration-300 hover:border-[rgba(206,180,123,0.34)] hover:text-[var(--color-cream)] md:px-3 md:py-2 md:text-[0.68rem] md:leading-5"
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
                  <div className="md:flex md:items-end md:gap-3">
                    <textarea
                      className="min-h-20 w-full resize-none rounded-[1.05rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.035)] px-3.5 py-3 text-[0.84rem] leading-5 text-[var(--color-cream)] outline-none transition-colors duration-300 placeholder:text-[rgba(228,219,201,0.38)] focus:border-[rgba(206,180,123,0.32)] md:min-h-16 md:flex-1 md:rounded-[1rem] md:px-4 md:py-3 md:text-[0.94rem] md:leading-6"
                      data-lenis-prevent="true"
                      disabled={isLoading}
                      id="sunda-ai-message"
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Tanyakan sesuatu tentang adat Sunda..."
                      value={inputValue}
                    />
                    <button
                      className="mt-2.5 inline-flex w-full items-center justify-center rounded-full border border-[rgba(206,180,123,0.28)] bg-[rgba(206,180,123,0.16)] px-5 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-cream)] transition-all duration-300 hover:border-[rgba(206,180,123,0.4)] hover:bg-[rgba(206,180,123,0.22)] disabled:cursor-not-allowed disabled:opacity-60 md:mt-0 md:h-12 md:w-auto md:min-w-32 md:text-[0.7rem] md:tracking-[0.24em]"
                      disabled={isLoading || !inputValue.trim()}
                      type="submit"
                    >
                      Kirim
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
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
              </div>
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
