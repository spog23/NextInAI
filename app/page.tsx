"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";

export default function LandingPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const assistantSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const scrollToAssistant = () => {
    assistantSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50 text-slate-900">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">AI</div>
            <div>
              <div className="text-lg font-semibold">NextIn AI</div>
              <div className="text-xs text-slate-500">Smart assistant for every team</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <button onClick={scrollToAssistant} className="px-3 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-500">Open chat</button>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-800">Docs</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-indigo-600">A modern AI assistant your customers will love</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">Fast, helpful, and always available — integrate in minutes and start answering customer questions instantly.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={scrollToAssistant} className="rounded-full bg-sky-600 text-white px-5 py-3 shadow hover:bg-sky-500">Try the demo</button>
              <button className="rounded-full border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-50">How it works</button>
            </div>

            <div className="mt-6 text-sm text-slate-500">No credit card required • Private by default</div>
          </div>

          <div>
            <div className="rounded-2xl shadow-2xl overflow-hidden border bg-white">
              <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-rose-500 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
                  <div className="text-sm font-semibold">Assistant preview</div>
                </div>
                <div className="text-xs opacity-90">Live</div>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="max-w-[85%] rounded-2xl bg-indigo-50 px-4 py-3 text-indigo-900">Hi 👋 I’m your AI assistant. Try asking about hours, pricing, or availability.</div>
                <div className="max-w-[75%] ml-auto rounded-2xl bg-rose-50 px-4 py-3 text-rose-900">Are you open on weekends?</div>
                <div className="max-w-[85%] rounded-2xl bg-indigo-50 px-4 py-3 text-indigo-900">Yes — Saturdays 9 AM–5 PM. Would you like to book a slot?</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat area */}
        <section ref={assistantSectionRef} className="mt-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border">
              <div className="px-6 py-4 flex items-center justify-between bg-gradient-to-r from-sky-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center">AI</div>
                  <div>
                    <div className="text-sm font-semibold">Live assistant</div>
                    <div className="text-xs text-slate-500">Responds instantly</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Status: <span className="font-medium">{status}</span></div>
              </div>

              <div className="flex flex-col md:h-[520px] h-[60vh]">
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
                  {messages.length === 0 && (
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="text-xs text-slate-400">Example conversation</div>
                      <div className="max-w-[80%] rounded-2xl bg-indigo-50 px-4 py-3 text-indigo-900">Hi 👋 I’m your AI assistant. I’m here to help your customers 24/7.</div>
                      <div className="max-w-[80%] ml-auto rounded-2xl bg-rose-50 px-4 py-3 text-rose-900">What time do you open today?</div>
                      <div className="max-w-[80%] rounded-2xl bg-indigo-50 px-4 py-3 text-indigo-900">We’re open 9 AM–7 PM today. I can help book or answer questions.</div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                      <div className={
                        (message.role === "user"
                          ? "bg-sky-600 text-white self-end"
                          : "bg-indigo-50 text-indigo-900 self-start") +
                        " max-w-[85%] rounded-2xl px-4 py-3 text-sm"
                      }>
                        {message.parts.map((part: any, i: number) => part.type === "text" ? <span key={i}>{part.text}</span> : null)}
                      </div>
                    </div>
                  ))}

                  {status === "streaming" && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] rounded-2xl bg-indigo-50 px-4 py-3 text-sm italic text-slate-600">Your AI assistant is responding…</div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim() || status !== "ready") return;
                    sendMessage({ text: input });
                    setInput("");
                  }}
                  className="p-4 border-t bg-gradient-to-t from-white to-slate-50"
                >
                  <div className="flex gap-3 items-center">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question or type something..."
                      disabled={status !== "ready"}
                      className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button type="submit" disabled={status !== "ready"} className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-slate-500">Works 24/7 • Private by default • Integrates in minutes</p>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white shadow"> 
            <div className="text-xl font-semibold text-indigo-700">Fast</div>
            <div className="mt-2 text-sm text-slate-600">Responds instantly to customer queries.</div>
          </div>
          <div className="p-6 rounded-xl bg-white shadow"> 
            <div className="text-xl font-semibold text-indigo-700">Private</div>
            <div className="mt-2 text-sm text-slate-600">Your data stays with you — private by default.</div>
          </div>
          <div className="p-6 rounded-xl bg-white shadow"> 
            <div className="text-xl font-semibold text-indigo-700">Easy</div>
            <div className="mt-2 text-sm text-slate-600">Integrate quickly with minimal setup.</div>
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 text-center text-sm text-slate-500">
        <div className="font-medium">NextIn AI</div>
        <div>Smart AI for everybody</div>
      </footer>
    </div>
  );
}
