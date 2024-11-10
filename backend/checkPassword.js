const bcrypt = require('bcryptjs');

// Reemplaza este valor con el hash de la contraseña almacenada en la base de datos
const hashedPassword = '$2b$10$e2dABtvahLwla7QOeC2eAupxmmQMaLCcnyejU9ESfLcdBvpeegTvO';  // Ejemplo de hash

// La contraseña en texto plano que quieres verificar
const password = 'pearljam';  // Cambia esto por la contraseña que deseas verificar

// Comparando la contraseña en texto plano con el hash almacenado
bcrypt.compare(password, hashedPassword, (err, result) => {
  if (err) {
    console.error('Error comparing password:', err);
  } else {
    console.log('Password match result:', result);  // Debería devolver `true` si las contraseñas coinciden
  }
});
