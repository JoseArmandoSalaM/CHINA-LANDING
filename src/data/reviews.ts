export interface Review {
	author: string;
	text: string;
	/** Texto tal como lo muestra Google, p. ej. "hace 2 meses" */
	when: string;
	/** 1 a 5 */
	rating: number;
}

/**
 * Reseñas reales de Google, obtenidas en el momento del build (nunca en el navegador,
 * para no exponer la API key). Si falta GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID, o la
 * petición falla, el sitio sigue compilando y el bloque de reseñas simplemente no se muestra
 * (ver TripDetail.astro: `reviews.length > 0 && (...)`).
 *
 * La API de Google Places exige mostrar las reseñas tal como las devuelve (sin elegir solo
 * las positivas) y no guardarlas en caché indefinidamente: estos datos se renuevan en cada
 * build/deploy, no hay que editarlos a mano.
 */
async function fetchGoogleReviews(): Promise<{ reviews: Review[]; summary: { rating: number; count: number } | null }> {
	const apiKey = process.env.GOOGLE_PLACES_API_KEY;
	const placeId = process.env.GOOGLE_PLACE_ID;
	const empty = { reviews: [], summary: null };

	if (!apiKey || !placeId) return empty;

	try {
		const res = await fetch(
			`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
			{
				headers: {
					'X-Goog-Api-Key': apiKey,
					'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
				},
			}
		);

		if (!res.ok) {
			console.warn(`[reviews] Google Places API respondió ${res.status}: ${await res.text()}`);
			return empty;
		}

		const data = (await res.json()) as {
			rating?: number;
			userRatingCount?: number;
			reviews?: {
				rating?: number;
				text?: { text?: string };
				relativePublishTimeDescription?: string;
				authorAttribution?: { displayName?: string };
			}[];
		};

		const reviews: Review[] = (data.reviews ?? [])
			.filter((r) => r.text?.text && r.authorAttribution?.displayName)
			.map((r) => ({
				author: r.authorAttribution!.displayName!,
				text: r.text!.text!,
				when: r.relativePublishTimeDescription ?? '',
				rating: r.rating ?? 5,
			}));

		const summary =
			data.rating !== undefined && data.userRatingCount !== undefined
				? { rating: data.rating, count: data.userRatingCount }
				: null;

		return { reviews, summary };
	} catch (err) {
		console.warn('[reviews] No se pudo obtener reseñas de Google:', err);
		return empty;
	}
}

const { reviews, summary: googleSummary } = await fetchGoogleReviews();

export { reviews, googleSummary };
