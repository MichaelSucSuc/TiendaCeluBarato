const ADMIN_EMAIL = 'admin@celubarato.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!ADMIN_PASSWORD_HASH) {
  throw new Error('ADMIN_PASSWORD_HASH no está configurado en variables de entorno');
}

module.exports = {
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
};
