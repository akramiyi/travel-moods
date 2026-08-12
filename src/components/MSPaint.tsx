import React, { useRef, useState, useEffect } from 'react';
import { Paintbrush, Eraser, Trash2, Download, Palette, Sparkles } from 'lucide-react';
import { retroAudio } from '../utils/audio';

export const MSPaint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ff0000');
  const [lineWidth, setLineWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  const colors = [
    '#000000', '#ffffff', '#808080', '#c0c0c0', '#800000', '#ff0000',
    '#808000', '#ffff00', '#008000', '#00ff00', '#008080', '#00ffff',
    '#000080', '#0000ff', '#800080', '#ff00ff', '#a52a2a', '#ff7f50'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background on init
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial greeting text
    ctx.fillStyle = '#000000';
    ctx.font = '16px monospace';
    ctx.fillText('AKR@M Cyber Cafe MS Paint 2005', 10, 25);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('Draw your nostalgic doodle here!', 10, 45);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    retroAudio.playKeyClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[440px] bg-slate-800 text-slate-100 rounded-xl overflow-hidden border border-slate-600 shadow-2xl font-sans">
      {/* MS Paint Title Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 px-3 py-1.5 flex items-center justify-between border-b border-blue-500/30">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-amber-300" />
          <span className="font-bold text-xs sm:text-sm text-white font-mono">
            untitled - Paint (Windows XP)
          </span>
        </div>
        <div className="flex gap-1 text-[10px] text-blue-200">
          <span className="bg-blue-900/60 px-2 py-0.5 rounded font-mono">800x600 px</span>
        </div>
      </div>

      {/* Paint Toolbar */}
      <div className="bg-slate-700 p-2 border-b border-slate-600 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Tool Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              retroAudio.playKeyClick();
              setIsEraser(false);
            }}
            className={`p-1.5 rounded border transition-all ${
              !isEraser ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-800 text-slate-300 border-slate-600'
            }`}
            title="Brush Tool"
          >
            <Paintbrush className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              retroAudio.playKeyClick();
              setIsEraser(true);
            }}
            className={`p-1.5 rounded border transition-all ${
              isEraser ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-600'
            }`}
            title="Eraser Tool"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-600 text-slate-300 border border-slate-600"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1 flex-wrap">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                retroAudio.playKeyClick();
                setColor(c);
                setIsEraser(false);
              }}
              style={{ backgroundColor: c }}
              className={`w-5 h-5 rounded-sm border ${
                color === c && !isEraser ? 'ring-2 ring-cyan-400 scale-110' : 'border-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-300">Size:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-16 accent-cyan-400"
          />
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-slate-900 p-2 overflow-auto flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={500}
          height={320}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          className="bg-white rounded border border-slate-500 shadow-inner cursor-crosshair max-w-full"
        />
      </div>
    </div>
  );
};
