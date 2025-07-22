// hash-password.js
const bcrypt = import('bcrypt');

const password = '1234';

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('Hash generado:', hash);
    // Aquí puedes copiar el hash para luego actualizar en MySQL
  })
  .catch(err => {
    console.error(err);
  });
