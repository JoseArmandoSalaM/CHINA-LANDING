export interface Review {
	author: string;
	text: string;
	/** Texto tal como lo muestra Google, p. ej. "hace 2 meses" */
	when: string;
	/** 1 a 5 */
	rating: number;
}

// Solo reseñas reales de Google. Mientras esté vacío, el bloque de reseñas no se muestra.
export const reviews: Review[] = [];

/** Calificación promedio y total de reseñas que muestra Google (opcional) */
export const googleSummary: { rating: number; count: number } | null = null;
