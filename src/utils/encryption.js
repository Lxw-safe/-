import CryptoJS from 'crypto-js';

// 加密密钥（实际生产环境中应该从环境变量或安全的地方获取）
const SECRET_KEY = 'campus-logistics-secret-key-2024';

/**
 * 加密数据
 * @param {Object} data - 要加密的数据
 * @returns {string} 加密后的字符串
 */
export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    console.error('加密数据失败:', error);
    return null;
  }
};

/**
 * 解密数据
 * @param {string} ciphertext - 加密后的字符串
 * @returns {Object} 解密后的数据
 */
export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('解密数据失败:', error);
    return null;
  }
};

/**
 * 安全存储用户信息到localStorage
 * @param {Object} user - 用户信息对象
 */
export const saveUserToLocalStorage = (user) => {
  const encryptedUser = encryptData(user);
  if (encryptedUser) {
    localStorage.setItem('user', encryptedUser);
  }
};

/**
 * 从localStorage读取并解密用户信息
 * @returns {Object|null} 用户信息对象或null
 */
export const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return decryptData(storedUser);
  }
  return null;
};

/**
 * 从localStorage移除用户信息
 */
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};