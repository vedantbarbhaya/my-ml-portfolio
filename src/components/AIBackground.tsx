'use client';

import React, { useRef, useEffect } from 'react';

const AIBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation settings
    let animationFrameId: number;
    const neurons: Neuron[] = [];
    const neuronCount = Math.min(Math.max(40, Math.floor(window.innerWidth * window.innerHeight / 20000)), 100);
    const synapses: Synapse[] = [];
    const signals: Signal[] = [];
    
    // Create neurons (nodes)
    for (let i = 0; i < neuronCount; i++) {
      neurons.push(new Neuron(canvas));
    }
    
    // Create connections (synapses) between neurons that are close enough
    const maxDistance = Math.min(canvas.width, canvas.height) * 0.2;
    neurons.forEach(neuron => {
      // Find nearby neurons to connect
      const nearbyNeurons = neurons.filter(other => {
        if (neuron === other) return false;
        
        const dx = neuron.x - other.x;
        const dy = neuron.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < maxDistance;
      });
      
      // Create 1-3 connections to random nearby neurons
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < Math.min(connectionsCount, nearbyNeurons.length); i++) {
        // Get random neuron from nearby neurons
        const randomIndex = Math.floor(Math.random() * nearbyNeurons.length);
        const target = nearbyNeurons[randomIndex];
        
        // Add to synapses
        synapses.push(new Synapse(neuron, target));
        
        // Remove to avoid duplicate connections
        nearbyNeurons.splice(randomIndex, 1);
      }
    });
    
    // Initially activate some neurons 
    for (let i = 0; i < 3; i++) {
      neurons[Math.floor(Math.random() * neurons.length)].activate();
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(10, 10, 20, 0.3)"; // Semi-transparent to create fading trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Randomly activate neurons occasionally
      if (Math.random() < 0.02) {
        neurons[Math.floor(Math.random() * neurons.length)].activate();
      }
      
      // Update and draw all synapses (connections)
      synapses.forEach(synapse => {
        synapse.draw(ctx);
      });
      
      // Update and draw all neurons (nodes)
      neurons.forEach(neuron => {
        neuron.update();
        neuron.draw(ctx);
        
        // If neuron is activated above a threshold, create signals along its synapses
        if (neuron.isActivated() && Math.random() < 0.8) {
          const connectedSynapses = synapses.filter(s => s.from === neuron);
          
          // For each connected synapse, create a signal
          connectedSynapses.forEach(synapse => {
            signals.push(new Signal(synapse));
            synapse.to.queueActivation(neuron.activationStrength * 0.7);
          });
        }
      });
      
      // Update and draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const signal = signals[i];
        signal.update();
        signal.draw(ctx);
        
        // Remove completed signals
        if (signal.isComplete()) {
          signal.synapse.to.activate(signal.strength);
          signals.splice(i, 1);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-gray-950" 
    />
  );
};

// Neuron class (nodes in the neural network)
class Neuron {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  activation: number;
  activationStrength: number;
  activationDecay: number;
  queuedActivation: number;
  color: string;
  activeColor: string;
  
  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseSize = Math.random() * 1.5 + 2;
    this.size = this.baseSize;
    this.activation = 0;
    this.activationStrength = 0;
    this.activationDecay = 0.02 + Math.random() * 0.02;
    this.queuedActivation = 0;
    
    // Base color is a soft blue
    this.color = 'rgba(120, 150, 255, 0.5)';
    
    // Active color is a brighter blue/white
    this.activeColor = 'rgba(180, 220, 255, 0.9)';
  }
  
  queueActivation(strength: number) {
    this.queuedActivation += strength;
  }
  
  activate(strength = 1.0) {
    // Set activation level
    this.activation = Math.min(this.activation + 0.8, 1.0);
    this.activationStrength = strength;
  }
  
  isActivated() {
    return this.activation > 0.5;
  }
  
  update() {
    // Add any queued activation
    if (this.queuedActivation > 0) {
      this.activate(this.queuedActivation);
      this.queuedActivation = 0;
    }
    
    // Decay activation over time
    if (this.activation > 0) {
      this.activation = Math.max(0, this.activation - this.activationDecay);
    }
    
    // Update size based on activation (swell when activated)
    this.size = this.baseSize + (this.activation * 2);
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    // Calculate color based on activation
    const displayColor = this.activation > 0 
      ? this.activeColor 
      : this.color;
      
    // Draw neuron
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = displayColor;
    ctx.fill();
    
    // Draw glow effect if activated
    if (this.activation > 0.1) {
      const glowSize = this.size + 3 + (this.activation * 5);
      const gradient = ctx.createRadialGradient(
        this.x, this.y, this.size,
        this.x, this.y, glowSize
      );
      
      gradient.addColorStop(0, `rgba(150, 200, 255, ${this.activation * 0.8})`);
      gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}

// Synapse class (connections between neurons)
class Synapse {
  from: Neuron;
  to: Neuron;
  thickness: number;
  
  constructor(from: Neuron, to: Neuron) {
    this.from = from;
    this.to = to;
    this.thickness = Math.random() * 0.5 + 0.3;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    const dx = this.to.x - this.from.x;
    const dy = this.to.y - this.from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Draw line with gradient based on neuron activations
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    
    // Base color with low opacity
    ctx.strokeStyle = `rgba(100, 140, 230, 0.15)`;
    ctx.lineWidth = this.thickness;
    ctx.stroke();
  }
}

// Signal class (pulses that travel along synapses)
class Signal {
  synapse: Synapse;
  progress: number;
  speed: number;
  size: number;
  strength: number;
  
  constructor(synapse: Synapse) {
    this.synapse = synapse;
    this.progress = 0;
    this.speed = 0.02 + Math.random() * 0.01;
    this.size = 1.5 + Math.random() * 1;
    this.strength = synapse.from.activationStrength * 0.9;
  }
  
  update() {
    this.progress += this.speed;
    if (this.progress > 1) this.progress = 1;
  }
  
  isComplete() {
    return this.progress >= 1;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    // Calculate position along the synapse
    const fromX = this.synapse.from.x;
    const fromY = this.synapse.from.y;
    const toX = this.synapse.to.x;
    const toY = this.synapse.to.y;
    
    const x = fromX + (toX - fromX) * this.progress;
    const y = fromY + (toY - fromY) * this.progress;
    
    // Draw glowing circle for the signal
    const gradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, this.size * 3
    );
    
    gradient.addColorStop(0, `rgba(200, 220, 255, 0.9)`);
    gradient.addColorStop(0.5, `rgba(140, 180, 255, 0.4)`);
    gradient.addColorStop(1, `rgba(100, 150, 255, 0)`);
    
    ctx.beginPath();
    ctx.arc(x, y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw inner bright circle
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 240, 255, 0.9)`;
    ctx.fill();
  }
}

export default AIBackground; 