import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Info } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Namaste! I am your Community Cold Chain Assistant. How can I help you manage your storage today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // -----------------------------
  // DEMO AI RESPONSE LOGIC
  // -----------------------------
  const generateDemoResponse = (input: string): string => {
    const text = input.toLowerCase();

    if (text.includes('tomato')) {
      return 'Tomatoes are best stored at 12–15°C. In the community cold chain, they can stay fresh for about 4–5 days before quality declines.';
    }

    if (text.includes('vaccine')) {
      return 'Vaccines should be stored between 2–8°C. Our system continuously monitors temperature to ensure vaccine safety.';
    }

    if (text.includes('solar')) {
      return 'The system uses solar panels to charge battery storage during the day, allowing uninterrupted cooling even during power outages.';
    }

    if (text.includes('offline')) {
      return 'If the unit goes offline, insulated walls and thermal buffering keep stored items safe for several hours.';
    }

    if (text.includes('banana')) {
      return 'Bananas are best stored at 13–14°C. Cold storage can extend their usability by 2–3 days if they are near-ripe.';
    }

    return 'This is an AI-powered assistant prototype designed to guide farmers and health workers on cold storage best practices. For critical decisions, always verify with local experts.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    // Simulated thinking delay for realism
    setTimeout(() => {
      const response = generateDemoResponse(userText);
      setMessages((prev) => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 800);
  };

  const suggestionChips = [
    'How do I store tomatoes?',
    'What is the best temp for vaccines?',
    'How does the solar system work?',
    'Is my unit offline right now?',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Farmer Assistant
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Expert guidance for rural cold chain management.
          </p>
        </div>
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20">
          <Bot className="w-6 h-6" />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-5 rounded-3xl flex items-start space-x-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}
              >
                {msg.role === 'bot' && (
                  <Sparkles className="w-4 h-4 mt-1 text-blue-500 shrink-0" />
                )}
                <p className="text-sm font-medium leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-4 rounded-3xl rounded-tl-none animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full" />
                <div className="w-2 h-2 bg-slate-300 rounded-full" />
                <div className="w-2 h-2 bg-slate-300 rounded-full" />
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Interaction Area */}
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => setInput(chip)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about storage, maintenance, or crops..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-200 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-4 flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <Info className="w-3 h-3" />
            <span>
              AI assistant prototype • Verify with local experts for critical
              decisions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
