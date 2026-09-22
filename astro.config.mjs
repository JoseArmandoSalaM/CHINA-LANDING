// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
	site: 'https://china.alalibreagency.com',

	// GSAP se importa de forma diferida (import()): se declara aquí para que el servidor de desarrollo lo
	// prepare desde el arranque. Si no, Vite lo descubre tarde, reoptimiza y responde 504 al archivo viejo.
	vite: {
		optimizeDeps: { include: ['gsap'] },
	},

	build: {
		// El CSS de esta página cabe en el HTML: se evita una petición que bloquea el primer render.
		inlineStylesheets: 'always',
	},

	// La fuente se descarga al compilar y se sirve desde el mismo dominio
	// (sin conexiones a Google, con precarga y con una fuente de respaldo ajustada para evitar saltos).
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'League Spartan',
			cssVariable: '--font-league-spartan',
			weights: ['400 800'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			display: 'swap',
			fallbacks: ['sans-serif'],
		},
	],
});
