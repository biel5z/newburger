import { defineConfig } from 'vite';

export default defineConfig({
  // caminhos relativos: o build funciona em qualquer subpasta do servidor
  base: './',
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
});
