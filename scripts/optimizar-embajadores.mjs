// Convierte las fotos de originales/embajadores (PNG con fondo transparente) a .webp ligeros:
// una foto grande para el modal y un recorte cuadrado del rostro para los círculos y miniaturas.
// Uso: node scripts/optimizar-embajadores.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'originales/embajadores');
const out = path.join(root, 'public/embajadores');
fs.mkdirSync(out, { recursive: true });

// Nombre del archivo original -> nombre final (sin extensión)
const alias = { scarpng2: 'scar' };

for (const file of fs.readdirSync(src).filter((f) => /\.png$/i.test(f))) {
	const base = path.basename(file, '.png').toLowerCase();
	const slug = alias[base] ?? base;
	const input = path.join(src, file);
	const { width, height } = await sharp(input).metadata();

	await sharp(input)
		.resize({ height: 1000, withoutEnlargement: true })
		.webp({ quality: 82, alphaQuality: 92 })
		.toFile(path.join(out, `${slug}.webp`));

	await sharp(input)
		.extract({ left: 0, top: 0, width, height: Math.min(width, height) })
		.resize(220, 220)
		.webp({ quality: 82, alphaQuality: 92 })
		.toFile(path.join(out, `${slug}-thumb.webp`));

	console.log(slug);
}
