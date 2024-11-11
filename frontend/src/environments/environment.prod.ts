// environment.ts (para desarrollo)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // Cambia el puerto si tu backend usa otro
};

// environment.prod.ts (para producción simulada en local)
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080' // Mantén el mismo si estás en local
};
