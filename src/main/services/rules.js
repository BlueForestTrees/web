export const required = value => !!value || 'Valeur requise';
export const isNumber = (value) => /^(\d*\.)?\d+$/.test(value) || 'Nombre requis';