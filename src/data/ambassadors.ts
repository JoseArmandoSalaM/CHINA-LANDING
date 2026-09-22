export interface Ambassador {
	/** Nombre completo (modal) */
	name: string;
	/** Nombre corto que aparece bajo el círculo */
	short?: string;
	/** Cargo */
	role: string;
	/** Destino que ha recorrido (opcional: si falta no se muestra) */
	destination?: string;
	/** Biografía; si falta se muestra el mensaje de "afinando biografía" */
	bio?: string;
	/** Foto con fondo transparente para el modal */
	photo?: string;
	/** Recorte cuadrado del rostro para los círculos y miniaturas */
	thumb?: string;
}

// Falta: biografías y destinos recorridos, y el nombre completo de Scar.
export const ambassadors: Ambassador[] = [
	{ name: 'Fausto Vega Zárate', short: 'Fausto', role: 'CEO', photo: '/embajadores/fausto.webp', thumb: '/embajadores/fausto-thumb.webp' },
	{ name: 'Jessica Camila Arcos Pérez', short: 'Jessica', role: 'Gerente Comercial y Asesora de Viajes', photo: '/embajadores/jessica.webp', thumb: '/embajadores/jessica-thumb.webp' },
	{ name: 'María Fernanda Gómez', short: 'Fernanda', role: 'Asesora de Viajes Senior', photo: '/embajadores/fernanda.webp', thumb: '/embajadores/fernanda-thumb.webp' },
	{ name: 'Nabil Iraís Bojalil Mohar', short: 'Nabil', role: 'Asesora de Viajes Senior', photo: '/embajadores/nabil.webp', thumb: '/embajadores/nabil-thumb.webp' },
	{ name: 'Heriberto Acosta', short: 'Heriberto', role: 'Contador Encargado', photo: '/embajadores/heriberto.webp', thumb: '/embajadores/heriberto-thumb.webp' },
	{ name: 'Gabriel Gonzales Ruiz', short: 'Gabriel', role: 'Coordinador de Marketing', photo: '/embajadores/gabriel.webp', thumb: '/embajadores/gabriel-thumb.webp' },
	{ name: 'Scar', short: 'Scar', role: 'Gerente de Marketing', photo: '/embajadores/scar.webp', thumb: '/embajadores/scar-thumb.webp' },
	{ name: 'Hannia Martinez Alvarez', short: 'Hannia', role: 'Subgerente del área comercial', photo: '/embajadores/hannia.webp', thumb: '/embajadores/hannia-thumb.webp' },
];
