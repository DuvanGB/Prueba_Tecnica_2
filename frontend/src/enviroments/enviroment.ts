export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/', // URL de tu backend local
  auth: {
    tokenKey: 'ecommerce_token', // Clave para el token de autenticación
    userKey: 'ecommerce_user'    // Clave para los datos del usuario
  },
  features: {
    enableDebug: true,           // Habilitar logs de depuración
    useMockData: false           // Usar datos de prueba h2
  },
  roles: {
    admin: 'ROLE_ADMIN',         // Rol de administrador
    manager: 'ROLE_MANAGER',     // Rol de manager
    customer: 'ROLE_CUSTOMER'    // Rol de cliente
  }
};