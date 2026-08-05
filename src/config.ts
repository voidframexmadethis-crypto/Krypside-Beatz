export const config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  PERSONAL_PAYPAL_EMAIL: process.env.PERSONAL_PAYPAL_EMAIL || 'Krypside@gmail.com',
  // Bypasses external cloud bucket hopping by utilizing your local high-speed node storage vault
  STORAGE_MODE: 'LOCAL_VAULT',
  VAULT_PATH: './vault_storage',
  // Default fallback database connection string for local instance if env is blank
  DATABASE_URL: process.env.DATABASE_URL || (process.env.SQL_HOST 
    ? `postgresql://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@localhost/${process.env.SQL_DB_NAME}?host=${process.env.SQL_HOST}` 
    : 'postgresql://postgres:postgres@localhost:5432/krypside_db')
};
