import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/cyberData';
import { Send, Bell, Smile, UserCheck, MessageCircle, Zap } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface YahooMessengerProps {
  onTriggerBuzzAnimation: () => void;
}

export const YahooMessenger: React.FC<YahooMessengerProps> = ({ onTriggerBuzzAnimation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [statusText, setStatusText] = useState('🎵 Listening to Himesh Reshammiya - Aashiq Banaya Aapne');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    retroAudio.playKeyClick();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You (PC-07)',
      avatar: '🧑‍💻',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    const sentText = inputText;
    setInputText('');

    // Simulate auto-reply bot with authentic 2000s slang after 1.2s
    setTimeout(() => {
      let replyText = 'Haha nice!! Orkut pe scrap daal dio bhai!';
      const lower = sentText.toLowerCase();

      if (lower.includes('asl')) {
        replyText = '19 / M / Delhi Cyber Cafe! Ur ASL plz?';
      } else if (lower.includes('cs') || lower.includes('game') || lower.includes('dust')) {
        replyText = 'Bhai de_dust2 server ready hai, AWP mat khareedna bas!';
      } else if (lower.includes('song') || lower.includes('music') || lower.includes('himesh')) {
        replyText = 'Himesh Reshammiya ki cap aur mic wolla style epic hai boss!! 🔥';
      } else if (lower.includes('hi') || lower.includes('hey') || lower.includes('hello')) {
        replyText = 'Heyy! ASL? 18/F/Mumbai online... chatroom me ho kya?';
      } else if (lower.includes('chai') || lower.includes('samosa') || lower.includes('bhaiya')) {
        replyText = 'Chotu ko bolo 2 cutting chai aur 1 samosa Cabin 7 pe laye!';
      }

      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'Priya_Delhi_21',
        avatar: '👩‍💼',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      retroAudio.playXPNotification();
      setMessages((prev) => [...prev, botReply]);
    }, 1200);
  };

  const handleSendBuzz = () => {
    retroAudio.playYahooBuzz();
    onTriggerBuzzAnimation();

    const buzzMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'SYSTEM',
      avatar: '🔔',
      text: '💥 BUZZ! You sent a Yahoo Messenger BUZZ to the chat room!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBuzz: true,
    };

    setMessages((prev) => [...prev, buzzMsg]);
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[440px] bg-indigo-950/90 text-slate-100 rounded-xl overflow-hidden border border-purple-500/40 shadow-2xl font-sans">
      {/* Yahoo Window Title Bar */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 px-3 py-2 flex items-center justify-between border-b border-purple-400/30">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-amber-400 text-purple-950 font-black text-xs flex items-center justify-center font-serif shadow">
            Y!
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide text-purple-100">
            Yahoo! Messenger - India_Chatroom_2000s
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-purple-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px]">Online (3 users)</span>
        </div>
      </div>

      {/* User Status Selector */}
      <div className="bg-purple-900/60 px-3 py-1.5 border-b border-purple-500/20 text-xs flex items-center justify-between">
        <span className="text-purple-300 font-mono text-[11px]">Status:</span>
        <input
          type="text"
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
          className="bg-purple-950/80 text-purple-200 text-xs px-2 py-0.5 rounded border border-purple-500/30 w-full ml-2 focus:outline-none focus:border-purple-400 font-mono"
        />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-950/80">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.isBuzz
                ? 'items-center my-2'
                : msg.isMe
                ? 'items-end'
                : 'items-start'
            }`}
          >
            {msg.isBuzz ? (
              <div className="bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs px-3 py-1 rounded-full animate-bounce shadow-md">
                {msg.text}
              </div>
            ) : (
              <div className={`max-w-[85%] rounded-lg p-2.5 text-xs leading-relaxed ${
                msg.isMe
                  ? 'bg-purple-700/80 text-white border border-purple-500/40 rounded-br-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-1 border-b border-white/10 pb-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <span>{msg.avatar}</span>
                    <span>{msg.sender}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
                </div>
                <p className="font-sans text-sm">{msg.text}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area & Controls */}
      <div className="p-2.5 bg-indigo-950/90 border-t border-purple-500/30 flex items-center gap-2">
        <button
          id="yahoo-buzz-btn"
          onClick={handleSendBuzz}
          className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded border border-amber-300 flex items-center gap-1 shadow hover:scale-105 transition-transform"
          title="Send Yahoo Buzz to screen!"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>BUZZ!</span>
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type message or ASL..."
          className="flex-1 bg-slate-900 text-white text-xs px-3 py-1.5 rounded border border-purple-500/40 focus:outline-none focus:border-purple-400 font-sans"
        />

        <button
          onClick={handleSendMessage}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded border border-purple-400 flex items-center gap-1 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};
