const fs = require('fs');
const edit = (p, fn) => {
  let s = fs.readFileSync(p, 'utf8');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  const N = (t) => t.replace(/\n/g, nl);
  const sub = (a, b) => { const A = N(a); if (!s.includes(A)) throw new Error(p + ' no: ' + a.slice(0, 70)); s = s.replace(A, () => N(b)); };
  fn(sub);
  fs.writeFileSync(p, s);
  console.log('ok', p);
};

edit('src/components/Menu.astro', (sub) => {
	sub("\tonScroll();\n\twindow.addEventListener('scroll', onScroll, { passive: true });",
	    "\t// La primera lectura espera a que la página termine de cargar: hacerla antes obliga a calcular el layout de golpe.\n\twindow.addEventListener('load', onScroll, { once: true });\n\twindow.addEventListener('scroll', onScroll, { passive: true });");
});

edit('src/components/ContactSection.astro', (sub) => {
	sub('<script src="https://api.ikigai.com.ec/js/form_embed.js" is:inline defer></script>',
`<script>
	// El script del formulario es de un tercero (Ikigai) y instala cookies: solo se carga cuando el usuario
	// se acerca a esta sección. El iframe ya es diferido (loading="lazy").
	const contact = document.getElementById('contacto');
	if (contact) {
		new IntersectionObserver(
			(entries, io) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				io.disconnect();
				const s = document.createElement('script');
				s.src = 'https://api.ikigai.com.ec/js/form_embed.js';
				s.async = true;
				document.body.append(s);
			},
			{ rootMargin: '2600px 0px' }
		).observe(contact);
	}
</script>`);
});

edit('src/components/TripDetail.astro', (sub) => {
	sub("const extra = trip.gallery.length - 2;", "const extra = trip.gallery.length - 2;\n// Las tarjetas usan la miniatura ligera; el visor de galería carga la foto completa.\nconst thumb = (src: string) => src.replace('-opt.webp', '-sm.webp');");
	sub('<img src={big.src} alt="" loading="lazy" />', '<img src={thumb(big.src)} alt="" width="640" height="429" loading="lazy" />');
	sub('<img src={small.src} alt="" loading="lazy" />', '<img src={thumb(small.src)} alt="" width="640" height="429" loading="lazy" />');
	sub('<img src={tile.src} alt="" loading="lazy" />', '<img src={thumb(tile.src)} alt="" width="640" height="429" loading="lazy" />');
});
