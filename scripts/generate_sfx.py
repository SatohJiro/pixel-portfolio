import os
import wave
import struct
import math

os.makedirs("public/assets/audio", exist_ok=True)

def generate_x_charge():
    sample_rate = 44100
    duration = 0.75  # seconds
    total_samples = int(sample_rate * duration)
    
    # Generate 16-bit mono PCM wave
    samples = []
    
    for i in range(total_samples):
        t = i / sample_rate
        progress = t / duration  # 0.0 to 1.0
        
        # SNES 16-bit pulse frequency ramping up smoothly from 240Hz to 880Hz
        freq = 240.0 + (progress ** 1.5) * 640.0
        
        # SNES Pulse Vibrato LFO (fast 22Hz modulation)
        lfo = math.sin(2 * math.pi * 22.0 * t) * (15.0 + 35.0 * progress)
        current_freq = freq + lfo
        
        # 12.5% Duty Cycle Pulse Wave (Quintessential SNES Capcom sound)
        phase = (t * current_freq) % 1.0
        pulse_val = 1.0 if phase < 0.125 else -0.15
        
        # Envelope: smooth ramp in volume (starts quiet, swells to max power)
        vol = 0.15 + 0.65 * progress
        
        # Add high shimmer chime at full charge (t > 0.55s)
        chime_val = 0.0
        if t > 0.55:
            chime_phase = (t * 1320.0) % 1.0
            chime_pulse = 1.0 if chime_phase < 0.25 else -0.25
            chime_vol = math.sin((t - 0.55) / 0.2 * math.pi) * 0.4
            chime_val = chime_pulse * chime_vol
            
        sample_val = (pulse_val * vol + chime_val) * 0.7
        sample_val = max(-1.0, min(1.0, sample_val))
        
        # Convert to 16-bit signed integer (-32768 to 32767)
        int_sample = int(sample_val * 32767.0 * 0.75)
        samples.append(int_sample)
        
    wav_path = "public/assets/audio/x_charge.wav"
    with wave.open(wav_path, "w") as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        # Pack samples
        packed_data = struct.pack(f"<{len(samples)}h", *samples)
        wav_file.writeframes(packed_data)
        
    print(f"Generated {wav_path} successfully ({len(samples)} samples).")

if __name__ == "__main__":
    generate_x_charge()
