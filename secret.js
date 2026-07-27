// Функция для вычисления SHA-256 хеша
async function getSHA256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Функция для проверки пароля с солью
async function verifyPassword(inputPassword) {
  const SALT = 'FC_MERA_SALT_2026';
  const CORRECT_PASSWORD_HASH = 'b7a4e5f6c8d9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5';
  
  const inputHash = await getSHA256(inputPassword + SALT);
  return inputHash === CORRECT_PASSWORD_HASH;
}

// Экспортируем функцию для использования в основном файле
window.verifySecretPassword = verifyPassword;
