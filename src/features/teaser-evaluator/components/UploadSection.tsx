'use client';

import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

interface UploadSectionProps {
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadSection({
  isDragging,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  onFileSelect,
}: UploadSectionProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Teaser Evaluator</span>
        </h1>
        <p className="text-white/60">AI-powered analysis of your video teasers</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex justify-center"
      >
        <motion.div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onClick}
          className={`
            relative w-full max-w-2xl h-96 rounded-3xl glass border-2 border-dashed
            flex flex-col items-center justify-center space-y-6 cursor-pointer
            transition-all duration-300
            ${isDragging 
              ? 'border-accent-teal bg-accent-teal/10 scale-105 shadow-[0_0_40px_rgba(0,255,198,0.3)]' 
              : 'border-white/20 hover:border-accent-teal/50 hover:bg-white/5 animate-pulse-glow'
            }
          `}
          style={{
            boxShadow: isDragging 
              ? '0 0 60px rgba(0, 255, 198, 0.4), inset 0 0 40px rgba(0, 255, 198, 0.1)' 
              : undefined
          }}
        >
          <motion.div
            animate={{ 
              scale: isDragging ? 1.1 : 1,
              rotate: isDragging ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <Film className="w-16 h-16 text-accent-teal" />
          </motion.div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Drop your teaser or click to upload
            </h3>
            <p className="text-white/60 text-sm">
              Supported: MP4, MOV — max 200MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime"
            onChange={onFileSelect}
            className="hidden"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

