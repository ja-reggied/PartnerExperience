import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-repo-name' with the actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/PartnerExperience/'  // Set this to your GitHub repo's name
});
