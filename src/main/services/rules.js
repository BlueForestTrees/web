export const required = value => !!value || 'Valeur requise';
export const isNumber = value => /^(\d*\.)?\d+$/.test(value) || 'Nombre requis';
export const length2min = value => (value && value.trim().length > 1) || "trop court";
export const isColor = value => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || 'Couleur requise';