// plugins/cart.js
import { defineNuxtPlugin } from '#app';
import Cookie from 'cookie-universal';

export default defineNuxtPlugin(nuxtApp => {
  const cookies = Cookie(nuxtApp.ssrContext?.req, nuxtApp.ssrContext?.res);
//   console.log('All Cookies:', cookies.get());
  
  // Lấy giỏ hàng từ cookies, nếu không có thì khởi tạo một mảng trống
  let cart;
  const encodedCookieValue = cookies.get('cart');
  try {
    const decodedCookieValue = decodeURIComponent(encodedCookieValue || '[]');
    cart = JSON.parse(decodedCookieValue);
  } catch (e) {
    cart = [];
    console.error('Invalid cart cookie:', e);
  }
//   console.log('Cart Cookie:', cart);

  // Hàm thêm sản phẩm vào giỏ hàng
  function addToCart(product) {
    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }
    cookies.set('cart', encodeURIComponent(JSON.stringify(cart)));
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(product) {
    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    if (existingProductIndex >= 0) {
      if (cart[existingProductIndex].quantity <= 0) {
        cart.splice(existingProductIndex, 1);
      } else {
        cart[existingProductIndex].quantity = product.quantity;
      }
      cookies.set('cart', encodeURIComponent(JSON.stringify(cart)));
    }
  }

  // Export các phương thức cần thiết
  nuxtApp.provide('cart', {
    addToCart,
    removeFromCart
  });
});
