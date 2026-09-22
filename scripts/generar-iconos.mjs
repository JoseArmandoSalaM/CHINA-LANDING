// Genera el isotipo vectorial, los favicons, los íconos de la app y los .webp de los íconos.
// Uso: node scripts/generar-iconos.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const pub = (...p) => path.join(root, 'public', ...p);
const NAVY = '#00002e';

// --- Isotipo: se toma la ruta del SVG original y se recorta al mismo margen que tenía el PNG ---
const original = fs.readFileSync(path.join(root, 'originales/sin-uso/loadingalalibre.svg'), 'utf8');
const pathData = original.match(/<path[\s\S]*?\/>/)[0].replace(/\s+/g, ' ');

// Caja de la figura en las unidades del SVG original (medida con sharp)
const BIRD = { x: 36.25, y: 56.25, w: 412.5, h: 372.5 };
const cx = BIRD.x + BIRD.w / 2;
const cy = BIRD.y + BIRD.h / 2;

// viewBox que reproduce el margen del PNG anterior (400x400), para que se vea igual
const isotipo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-18.75 -38 523.8 523.8"><g fill="#ffffff">${pathData}</g></svg>\n`;
fs.mkdirSync(pub('img'), { recursive: true });
fs.writeFileSync(pub('img/isotipo.svg'), isotipo);

// --- Íconos: cuadrado azul con la figura blanca centrada ---
const icon = ({ size, radius, birdWidth }) => {
	const s = birdWidth / BIRD.w;
	const tx = size / 2 - cx * s;
	const ty = size / 2 - cy * s;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/><g fill="#ffffff" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(5)})">${pathData}</g></svg>`;
};

// Favicon vectorial (esquinas redondeadas) y variantes cuadradas para Apple / manifest
fs.writeFileSync(pub('favicon.svg'), icon({ size: 64, radius: 14, birdWidth: 46 }) + '\n');
const square = (size, ratio) => Buffer.from(icon({ size, radius: 0, birdWidth: size * ratio }));

const png = (svg, size) => sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
const rounded = Buffer.from(icon({ size: 64, radius: 14, birdWidth: 46 }));

const out = {
	'favicon-32.png': await png(rounded, 32),
	'apple-touch-icon.png': await png(square(180, 0.66), 180),
	'icon-192.png': await png(square(192, 0.6), 192),
	'icon-512.png': await png(square(512, 0.6), 512),
};
for (const [name, buf] of Object.entries(out)) fs.writeFileSync(pub(name), buf);

// favicon.ico con dos tamaños (PNG incrustado, soportado por todos los navegadores actuales)
const sizes = [32, 48];
const images = await Promise.all(sizes.map((s) => png(rounded, s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
	const e = Buffer.alloc(16);
	e.writeUInt8(sizes[i], 0);
	e.writeUInt8(sizes[i], 1);
	e.writeUInt16LE(1, 4);
	e.writeUInt16LE(32, 6);
	e.writeUInt32LE(img.length, 8);
	e.writeUInt32LE(offset, 12);
	offset += img.length;
	return e;
});
fs.writeFileSync(pub('favicon.ico'), Buffer.concat([header, ...entries, ...images]));

// --- Íconos de "Lo que incluye" a .webp (sin pérdida, con transparencia) ---
const iconos = ['actividades', 'alimentacion', 'alojamiento', 'guia', 'trnasporte'];
for (const n of iconos) {
	await sharp(path.join(root, 'originales/sin-uso', n + '.png'))
		.webp({ lossless: true, effort: 6 })
		.toFile(pub('img', n + '.webp'));
}

// --- Manifiesto de la app ---
fs.writeFileSync(
	pub('manifest.webmanifest'),
	JSON.stringify(
		{
			name: 'Ala Libre – Viajes grupales a China',
			short_name: 'Ala Libre',
			description: 'Viajes grupales a China 2027 con Ala Libre.',
			lang: 'es-MX',
			start_url: '/',
			display: 'standalone',
			background_color: NAVY,
			theme_color: NAVY,
			icons: [
				{ src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
				{ src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
			],
		},
		null,
		'\t'
	) + '\n'
);

console.log('Íconos generados.');
