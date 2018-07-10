export const required = value => !!value || 'Valeur requise';
export const isNumber = value => /^(\d*\.)?\d+$/.test(value) || 'Nombre requis';
export const length2min = value => (value && value.trim().length > 1) || "trop court";
export const isColor = value => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || 'Couleur requise';
export const mailRequired = value => !!value || 'Veuillez indiquer votre adresse e-mail.';
export const validMail = value => !!value && !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || "Le format d'adresse mail est incorrect.";