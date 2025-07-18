import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@/components': path.resolve(__dirname, 'src/components/tiptap'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@data': path.resolve(__dirname, 'src/data'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@context': path.resolve(__dirname, 'src/context'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@/hooks': path.resolve(__dirname, 'src/hooks'),
			'@sections': path.resolve(__dirname, 'src/pages/Home/sections'),
			'@/lib': path.resolve(__dirname, 'src/lib'),
			'@documentation': path.resolve(__dirname, '../documentation'),
		}
	}
})
