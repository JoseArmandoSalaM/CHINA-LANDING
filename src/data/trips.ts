export interface ItineraryDay {
	days: string;
	place: string;
	text: string;
}

export interface Departure {
	/** Fecha de salida, AAAA-MM-DD */
	start: string;
	/** Fecha de regreso, AAAA-MM-DD */
	end: string;
	/** Precio en USD; undefined = aún sin precio cargado */
	price?: number;
}

export interface GalleryImage {
	src: string;
	alt: string;
}

export interface Trip {
	slug: string;
	name: string;
	duration: string;
	summary: string;
	cities: string[];
	days: ItineraryDay[];
	included: string[];
	notIncluded: string[];
	gallery: GalleryImage[];
	departures: Departure[];
}

const notIncluded = [
	'Gastos personales y compras.',
	'Propinas.',
	'Alimentos que no estén indicados en el itinerario.',
];

export const trips: Trip[] = [
	{
		slug: 'sendero-del-martin-pescador',
		name: 'El Sendero del Martín Pescador',
		duration: '17 días / 16 noches',
		summary:
			"La vuelta completa por China: Beijing, Xi'an, Chengdu, Chongqing, Zhangjiajie, Fenghuang, Guilin, Shenzhen y Shanghái. Vuelos internacionales redondos.",
		cities: [
			'Beijing',
			"Xi'an",
			'Chengdu',
			'Chongqing',
			'Zhangjiajie',
			'Fenghuang',
			'Guilin',
			'Shenzhen',
			'Shanghái',
		],
		days: [
			{
				days: '1–3',
				place: 'Beijing',
				text: "Llegada y traslado al hotel · Plaza de Tian'anmen y Ciudad Prohibida · Palacio de Verano con paseo en barco · pato laqueado · Templo del Cielo y clase de taichí · Gran Muralla en Mutianyu con teleférico.",
			},
			{
				days: '4–5',
				place: "Xi'an",
				text: "Tren bala desde Beijing · Muralla de Xi'an · Museo de los Guerreros de Terracota · Barrio Musulmán y Gran Mezquita.",
			},
			{
				days: '6–7',
				place: 'Chengdu',
				text: "Tren bala desde Xi'an · Parque del Pueblo · Barrio Antiguo Kuanzhai Xiangzi · Chunxilu y Taiguli · Base del Panda Gigante · Gran Buda de Leshan en barco.",
			},
			{
				days: '7–8',
				place: 'Chongqing',
				text: 'Tren desde Chengdu · Pueblo antiguo de Ciqikou · Estación Liziba · mirador Ojo en las Nubes · Dieciocho Escaleras · Monumento al Pueblo Liberado.',
			},
			{
				days: '9–10',
				place: 'Zhangjiajie',
				text: 'Tren desde Chongqing · Montaña Tianmen en teleférico y pasarela de cristal · Valle Grande · Puente de Vidrio · ascensor Bailong · Yuanjiajie (paisajes de Avatar) · Montaña Tianzi.',
			},
			{
				days: '11',
				place: 'Fenghuang',
				text: 'Furong, pueblo antiguo con cascada · pueblo de Fenghuang.',
			},
			{
				days: '12–13',
				place: 'Guilin',
				text: 'Tren desde Fenghuang · día libre · crucero por el río Li · Yangshuo y Calle del Oeste.',
			},
			{
				days: '14–15',
				place: 'Shenzhen',
				text: 'Tren desde Guilin · tienda DJI Flagship · Huaqiangbei · Museo de Arte Contemporáneo y Planificación Urbana · Parque del Talento y Parque Costero · entrega de comida por drones.',
			},
			{
				days: '15–16',
				place: 'Shanghái',
				text: 'Vuelo desde Shenzhen · Jardín Yuyuan · Templo Chenghuangmiao · el Bund · Shanghai Tower.',
			},
			{ days: '17', place: 'Regreso', text: 'Traslado al aeropuerto para el vuelo internacional.' },
		],
		included: [
			'16 noches de alojamiento en las 9 ciudades del recorrido.',
			'Desayunos en el hotel a partir del día 3, y almuerzos y cenas en restaurantes locales según el itinerario (incluye el pato laqueado en Beijing).',
			'Trenes de alta velocidad entre ciudades y vuelo Shenzhen–Shanghái.',
			'Traslados del aeropuerto y de las estaciones al hotel, y transporte privado para las visitas.',
			'Guía en español y entradas a todas las atracciones mencionadas en el itinerario.',
		],
		notIncluded,
		gallery: [
			{ src: '/img/viajeros-muralla-opt.webp', alt: 'Grupo de viajeros de Ala Libre ondeando la bandera de México en la Gran Muralla China, Mutianyu' },
			{ src: '/img/viajeros-tiananmen-opt.webp', alt: "Viajeros de Ala Libre en la Plaza de Tian'anmen, Beijing" },
			{ src: '/img/viajeros-zhangjiajie-cristal-opt.webp', alt: 'Viajeros de Ala Libre en la pasarela de cristal de la Montaña Tianmen, Zhangjiajie' },
			{ src: '/img/viajeros-xian-termales-opt.webp', alt: 'Grupo de Ala Libre en los manantiales termales de Lishan, cerca de Xi\'an' },
		],
		departures: [
			{ start: '2027-03-10', end: '2027-03-26', price: 8600 },
			{ start: '2027-05-07', end: '2027-05-23', price: 8660 },
			{ start: '2027-07-14', end: '2027-07-30' },
			{ start: '2027-09-08', end: '2027-09-24' },
			{ start: '2027-10-15', end: '2027-10-31' },
		],
	},
	{
		slug: 'alas-de-grulla-dorada',
		name: 'Alas de Grulla Dorada',
		duration: '14 días / 13 noches',
		summary:
			"Versión más enfocada en paisaje: Beijing, Xi'an, Guilin, Zhangjiajie y Shanghái. Vuelos internacionales redondos.",
		cities: ['Beijing', "Xi'an", 'Guilin', 'Zhangjiajie', 'Shanghái'],
		days: [
			{
				days: '1–3',
				place: 'Beijing',
				text: "Llegada y traslado al hotel · Templo del Cielo · Ciudad Prohibida · Parque Jingshan · Gran Muralla en Mutianyu con teleférico · hutongs y pintura de máscaras de ópera.",
			},
			{
				days: '4–5',
				place: "Xi'an",
				text: "Tren de alta velocidad desde Beijing · Muralla Antigua · Gran Pagoda del Ganso Salvaje · Guerreros de Terracota · taller Taoyong · Campanario y Barrio Musulmán.",
			},
			{
				days: '6–8',
				place: 'Guilin',
				text: "Vuelo desde Xi'an · Cueva de la Flauta de Caña · Colina de la Trompa de Elefante · Terrazas de Arroz de Longji con almuerzo en aldea Zhuang · crucero por el río Li hasta Yangshuo y Calle Oeste.",
			},
			{
				days: '9–12',
				place: 'Zhangjiajie',
				text: "Tren de alta velocidad desde Guilin · Montaña Tianmen con teleférico y pasarela de cristal · Edificio de Madera Tujia · Ciudad Antigua de Dayong · Parque Nacional: ascensor Bailong, Yuanjiajie (Avatar) y Tianzishan · Galería de Diez Millas · Puente de Cristal del Gran Cañón.",
			},
			{
				days: '12–13',
				place: 'Shanghái',
				text: "Vuelo desde Zhangjiajie · Jardín Yuyuan · Templo Chenghuangmiao · el Bund · Torre de la Perla Oriental · tarde libre.",
			},
			{
				days: '14',
				place: 'Regreso',
				text: "Tiempo libre y traslado al aeropuerto para el vuelo de regreso.",
			},
		],
		included: [
			"13 noches en hoteles de 4 y 5 estrellas en Beijing, Xi'an, Guilin, Zhangjiajie y Shanghái.",
			'Desayunos buffet diarios y 12 almuerzos tradicionales en restaurantes locales.',
			'2 vuelos internacionales, traslados terrestres compartidos, 2 vuelos domésticos y 2 trayectos en tren de alta velocidad.',
			'Teleféricos y elevadores en atracciones seleccionadas.',
			'Visitas guiadas a la Gran Muralla, Guerreros de Terracota, Río Li, Montaña Tianmen y Jardín Yuyuan.',
			'Guías expertos en español (excepto Zhangjiajie, donde será en inglés) y conductores privados en cada ciudad.',
		],
		notIncluded,
		gallery: [
			{ src: '/img/viajeros-ciudad-prohibida-opt.webp', alt: 'Grupo de viajeros de Ala Libre frente al Palacio Imperial, Ciudad Prohibida de Beijing' },
			{ src: '/img/viajeros-palacio-verano-opt.webp', alt: 'Grupo de viajeros de Ala Libre en el Palacio de Verano, Beijing' },
			{ src: '/img/viajeros-tianmen-opt.webp', alt: 'Viajeros de Ala Libre en la Puerta del Cielo, Montaña Tianmen, Zhangjiajie' },
			{ src: '/img/viajeros-beijing-guia-opt.webp', alt: 'Guía de Ala Libre y viajero durante el recorrido por Beijing' },
		],
		departures: [
			{ start: '2027-03-17', end: '2027-04-02', price: 7780 },
			{ start: '2027-05-14', end: '2027-05-27', price: 7780 },
			{ start: '2027-07-16', end: '2027-07-29' },
			{ start: '2027-09-17', end: '2027-09-30' },
			{ start: '2027-10-15', end: '2027-10-28' },
			{ start: '2027-11-12', end: '2027-11-25' },
		],
	},
];

export const totalDepartures = trips.reduce((n, t) => n + t.departures.length, 0);

const MONTHS = [
	'enero',
	'febrero',
	'marzo',
	'abril',
	'mayo',
	'junio',
	'julio',
	'agosto',
	'septiembre',
	'octubre',
	'noviembre',
	'diciembre',
];

const parts = (iso: string) => {
	const [y, m, d] = iso.split('-').map(Number);
	return { y, m: MONTHS[m - 1], d };
};

/** "10 – 26 marzo 2027" o "17 marzo – 2 abril 2027" */
export function formatRange({ start, end }: Departure): string {
	const a = parts(start);
	const b = parts(end);
	return a.m === b.m
		? `${a.d} – ${b.d} ${b.m} ${b.y}`
		: `${a.d} ${a.m} – ${b.d} ${b.m} ${b.y}`;
}

/** "10 – 26 marzo" o "17 marzo – 2 abril" (sin año) */
export function formatShort({ start, end }: Departure): string {
	const a = parts(start);
	const b = parts(end);
	return a.m === b.m ? `${a.d} – ${b.d} ${b.m}` : `${a.d} ${a.m} – ${b.d} ${b.m}`;
}

export const formatPrice = (price: number) => `USD ${price.toLocaleString('en-US')}`;

export const whatsappLink = (text: string) =>
	`https://api.whatsapp.com/send/?phone=522211201356&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
