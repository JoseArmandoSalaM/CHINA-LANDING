// Genera las miniaturas ligeras (-sm.webp, 640 px) de las fotos de destinos.
// Las tarjetas del itinerario usan la miniatura; la foto completa (-opt.webp) solo se carga al ampliar.
// Uso: node scripts/optimizar-destinos.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve(import.meta.dirname, '../public/img');
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('-opt.webp'))) {
	const out = path.join(dir, file.replace('-opt.webp', '-sm.webp'));
	await sharp(path.join(dir, file)).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(out);
	console.log(path.basename(out), Math.round(fs.statSync(out).size / 1024) + ' KB');
}
