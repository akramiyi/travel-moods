// Web Audio API Synthesizer for authentic 2000s cyber cafe retro sound effects

class RetroAudioEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 1. Mechanical Keyboard Click Sound
  playKeyClick() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio context fallback
    }
  }

  // 2. Yahoo Messenger BUZZ Sound (Shaking dual-frequency buzz)
  playYahooBuzz() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      
      // Dual square wave buzzers
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.linearRampToValueAtTime(220, now + 0.4);

      osc2.frequency.setValueAtTime(240, now);
      osc2.frequency.linearRampToValueAtTime(290, now + 0.4);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } catch {
      // Audio context fallback
    }
  }

  // 3. Dial-Up Modem Sound Sequence (Iconic 56k / BSNL DataOne handshake)
  playDialUpSound(onComplete?: () => void) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const duration = 6.0; // 6 seconds nostalgic dial-up sequence

      // Dial tone
      const dtOsc1 = ctx.createOscillator();
      const dtOsc2 = ctx.createOscillator();
      const dtGain = ctx.createGain();

      dtOsc1.frequency.value = 350;
      dtOsc2.frequency.value = 440;
      dtGain.gain.setValueAtTime(0.15, now);
      dtGain.gain.setValueAtTime(0, now + 1.2);

      dtOsc1.connect(dtGain);
      dtOsc2.connect(dtGain);
      dtGain.connect(ctx.destination);

      dtOsc1.start(now);
      dtOsc2.start(now);
      dtOsc1.stop(now + 1.2);
      dtOsc2.stop(now + 1.2);

      // Rotary/DTMF DTMF dialing pulses
      [1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6].forEach((timeOffset, idx) => {
        const pulseOsc = ctx.createOscillator();
        const pulseGain = ctx.createGain();
        pulseOsc.frequency.value = 697 + (idx % 3) * 120;
        pulseGain.gain.setValueAtTime(0.2, now + timeOffset);
        pulseGain.gain.setValueAtTime(0, now + timeOffset + 0.08);
        pulseOsc.connect(pulseGain);
        pulseGain.connect(ctx.destination);
        pulseOsc.start(now + timeOffset);
        pulseOsc.stop(now + timeOffset + 0.08);
      });

      // Handshake squeals & white noise burst
      const hsOsc = ctx.createOscillator();
      const hsGain = ctx.createGain();
      hsOsc.type = 'sawtooth';

      // Frequency sweep for modem handshake squeal
      hsOsc.frequency.setValueAtTime(2100, now + 2.9);
      hsOsc.frequency.linearRampToValueAtTime(1200, now + 3.5);
      hsOsc.frequency.linearRampToValueAtTime(2400, now + 4.2);
      hsOsc.frequency.linearRampToValueAtTime(800, now + 5.2);

      hsGain.gain.setValueAtTime(0.001, now + 2.8);
      hsGain.gain.linearRampToValueAtTime(0.18, now + 3.0);
      hsGain.gain.linearRampToValueAtTime(0.12, now + 5.0);
      hsGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      hsOsc.connect(hsGain);
      hsGain.connect(ctx.destination);

      hsOsc.start(now + 2.8);
      hsOsc.stop(now + duration);

      if (onComplete) {
        setTimeout(onComplete, duration * 1000);
      }
    } catch {
      if (onComplete) onComplete();
    }
  }

  // 4. CRT Degauss Sound (Low frequency magnetic thump + high pitch whine)
  playCRTDegauss() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Low frequency thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);

      // High pitch CRT coil whine
      const whineOsc = ctx.createOscillator();
      const whineGain = ctx.createGain();

      whineOsc.type = 'triangle';
      whineOsc.frequency.setValueAtTime(15625, now); // Standard PAL CRT flyback frequency!

      whineGain.gain.setValueAtTime(0.05, now);
      whineGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      whineOsc.connect(whineGain);
      whineGain.connect(ctx.destination);

      whineOsc.start(now);
      whineOsc.stop(now + 1.2);
    } catch {
      // Fallback
    }
  }

  // 5. XP Notification / Orkut Scrap Ding
  playXPNotification() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5

      osc2.frequency.setValueAtTime(783.99, now + 0.08); // G5
      osc2.frequency.setValueAtTime(1046.5, now + 0.16); // C6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch {
      // Fallback
    }
  }

  // 6. Vice City / GTA Cheat Activated Sound
  playCheatActivatedSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const freqs = [440, 554.37, 659.25, 880];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.15);
      });
    } catch {
      // Fallback
    }
  }
}

export const retroAudio = new RetroAudioEngine();
