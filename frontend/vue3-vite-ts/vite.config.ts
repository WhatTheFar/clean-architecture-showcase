// vite.config.ts
import { SharedConfig } from 'vite';
import path from 'path';

const config: SharedConfig = {
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
};

export default config;
