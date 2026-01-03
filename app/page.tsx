'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useEffect, useRef } from 'react';

export default function LandingPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const assistantSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const scrollToAssistant = () => {
    assistantSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-neutral-900">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Your AI assistant, working 24/7 for your business
            </h1>
            <p className="mt-5 text-neutral-600 max-w-xl">
              NextIn AI helps answer customer questions, respond instantly, and
              capture opportunities — day and night, without any technical
              setup.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToAssistant}
                className="rounded-full bg-sky-600 px-7 py-3 text-white font-medium hover:bg-sky-500"
              >
                Meet your assistant
              </button>
              <button className="rounded-full border border-neutral-300 px-7 py-3 text-neutral-700 hover:bg-teal-50">
                See how it works
              </button>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              No credit card required • Setup in minutes
            </p>
          </div>

          {/* Assistant preview */}
          <div className="md:block">
            <div className="rounded-3xl bg-white/70 backdrop-blur shadow-lg border border-white/40">
              <div className="px-5 py-3 text-xs text-neutral-500 border-b border-neutral-200/50">
                ● ● ● Live assistant
              </div>
              <div className="p-5 space-y-4 text-sm">
                <div className="max-w-[85%] rounded-2xl bg-teal-50 px-4 py-3 text-teal-900">
                  Hi 👋 I’m your AI assistant. I’m here to help your customers 24/7.
                </div>
                <div className="max-w-[85%] rounded-2xl bg-blue-50 px-4 py-3 ml-auto text-blue-900">
                  Are you open on weekends?
                </div>
                <div className="max-w-[85%] rounded-2xl bg-teal-50 px-4 py-3 text-teal-900">
                  Yes — we’re open Saturdays from 9 AM to 5 PM. Would you like to book a visit or ask about availability?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASSISTANT INTERFACE */}
      <section ref={assistantSectionRef} className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/80 backdrop-blur shadow-xl border border-white/50">
            <div className="px-6 py-3 text-xs text-neutral-500 border-b border-neutral-200/50">
              ● ● ● Live assistant
            </div>

            <div className="flex flex-col h-[480px]">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="space-y-3 text-sm">
                    <div className="text-xs text-neutral-400">Example conversation</div>

                    <div className="max-w-[80%] rounded-2xl bg-teal-50 px-4 py-3 text-teal-900">
                      Hi 👋 I’m your AI assistant. I’m here to help your customers 24/7.
                    </div>
                    <div className="max-w-[80%] rounded-2xl bg-blue-50 px-4 py-3 ml-auto text-blue-900">
                      What time do you open today?
                    </div>
                    <div className="max-w-[80%] rounded-2xl bg-teal-50 px-4 py-3 text-teal-900">
                      We’re open from 9 AM to 7 PM today. I can also help you book a time or answer questions.
                    </div>
                    <div className="max-w-[80%] rounded-2xl bg-blue-50 px-4 py-3 ml-auto text-blue-900">
                      Is your premium plan available?
                    </div>
                    <div className="max-w-[80%] rounded-2xl bg-teal-50 px-4 py-3 text-teal-900">
                      Yes, it’s available now. Would you like pricing details or should I connect you with the team?
                    </div>
                  </div>
                )}

                {messages.map(message => (
                  <div
                    key={message.id}
                    className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                  >
                    <div
                      className={
                        message.role === 'user'
                          ? 'max-w-[80%] rounded-2xl bg-sky-600 text-white px-4 py-3 text-sm'
                          : 'max-w-[80%] rounded-2xl bg-teal-50 px-4 py-3 text-sm'
                      }
                    >
                      {message.parts.map((part, i) =>
                        part.type === 'text' ? <span key={i}>{part.text}</span> : null
                      )}
                    </div>
                  </div>
                ))}

                {status === 'streaming' && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-teal-50 px-4 py-3 text-sm text-neutral-600 italic">
                      Your AI assistant is responding…
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!input.trim() || status !== 'ready') return;
                  sendMessage({ text: input });
                  setInput('');
                }}
                className="border-t border-neutral-200/60 p-4"
              >
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask a customer-style question…"
                    disabled={status !== 'ready'}
                    className="flex-1 rounded-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    disabled={status !== 'ready'}
                    className="rounded-full bg-sky-600 px-5 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-neutral-500">
            Works 24/7 for your business • Responds instantly • Handles real customer questions
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 pb-12 max-w-3xl mx-auto text-center text-sm text-neutral-600">
        <p>
          NextIn AI is a smart, always-on AI assistant built for everyday
          businesses. It works around the clock to respond to customers, stay
          available, and turn conversations into opportunities — without
          technical skills.
        </p>
      </section>

      {/* TRUST */}
      <section className="px-6 pb-16 max-w-3xl mx-auto text-center text-xs text-neutral-500">
        <p>Always working for you • Private by default • Your data stays yours</p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        <div className="font-medium text-neutral-700">NextIn AI</div>
        <div>Smart AI for everybody</div>
        <div className="mt-1">contact@nextin.ai</div>
      </footer>
    </div>
  );
}
