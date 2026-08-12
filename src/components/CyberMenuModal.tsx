import React, { useState } from 'react';
import { CYBER_SERVICES } from '../data/cyberData';
import { X, DollarSign, Coffee, Check, Send, Sparkles } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface CyberMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CyberMenuModal: React.FC<CyberMenuModalProps> = ({ isOpen, onClose }) => {
  const [chaiCount, setChaiCount] = useState(2);
  const [samosaCount, setSamosaCount] = useState(1);
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const handleOrderSnacks = () => {
    retroAudio.playXPNotification();
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      onClose();
    }, 2500);
  };

  const totalPrice = chaiCount * 10 + samosaCount * 15;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/30">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-lg text-amber-200 font-serif tracking-wider">
              CYBER CAFE RATE CARD & SNACKS MENU
            </h2>
          </div>
          <button
            onClick={() => {
              retroAudio.playKeyClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[260px] overflow-y-auto p-1">
          {CYBER_SERVICES.map((s) => (
            <div
              key={s.name}
              className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                  <span className="text-base">{s.icon}</span>
                  <span>{s.name}</span>
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  {s.price} {s.unit}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Order Chai & Samosa Section */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
          <h3 className="font-bold text-sm text-amber-300 font-mono flex items-center gap-2 mb-3">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>Order Snacks to Cabin #07</span>
          </h3>

          {orderSent ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-lg text-center text-emerald-300 text-xs font-mono animate-bounce flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Chotu is bringing hot Chai & Samosa to Cabin #07 in 3 mins!</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Cutting Chai (₹10):</span>
                  <button
                    onClick={() => setChaiCount(Math.max(0, chaiCount - 1))}
                    className="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="text-cyan-300 font-bold w-4 text-center">{chaiCount}</span>
                  <button
                    onClick={() => setChaiCount(chaiCount + 1)}
                    className="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Hot Samosa (₹15):</span>
                  <button
                    onClick={() => setSamosaCount(Math.max(0, samosaCount - 1))}
                    className="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="text-cyan-300 font-bold w-4 text-center">{samosaCount}</span>
                  <button
                    onClick={() => setSamosaCount(samosaCount + 1)}
                    className="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-400 text-sm">Total: ₹{totalPrice}</span>
                <button
                  onClick={handleOrderSnacks}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-lg border border-amber-300 flex items-center gap-1.5 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
