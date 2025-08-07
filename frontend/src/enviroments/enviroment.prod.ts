export const environment = {
  production: true,
  apiUrl: 'https://api.ecommerce.com/api',
  auth: {
    tokenKey: 'ecommerce_token',
    userKey: 'ecommerce_user'
  },
  features: {
    enableDebug: false,
    useMockData: false
  },
  roles: {
    admin: 'ROLE_ADMIN',
    manager: 'ROLE_MANAGER',
    customer: 'ROLE_CUSTOMER'
  }
};