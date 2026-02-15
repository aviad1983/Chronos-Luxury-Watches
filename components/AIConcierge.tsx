
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/geminiService';

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'שלום! אני היועץ האישי של Chronos. מחפשים שעון מסוים או זקוקים להמלצה?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const historyForAPI = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await sendMessageToAI(userMsg, historyForAPI);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[250] flex flex-col items-end">
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-[#111] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-amber-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fa-solid fa-robot text-white text-sm"></i>
              </div>
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-widest">יועץ הורולוגי</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <p className="text-[10px] text-white/70">זמין כעת</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-zinc-800 text-white rounded-tr-none' 
                    : 'bg-amber-600/10 text-amber-100 border border-amber-500/20 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-amber-600/10 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 bg-zinc-900/50 border-t border-white/10 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="איך אוכל לעזור?"
              className="flex-1 bg-zinc-800 border-none text-white text-sm px-4 py-2 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-amber-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane transform rotate-180"></i>
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl hover:scale-110 transition-transform active:scale-95"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  );
};

export default AIConcierge;
