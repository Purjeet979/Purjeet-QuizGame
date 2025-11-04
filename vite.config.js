import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- Make sure this line is added

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // <-- This 'resolve' block is the new part
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})