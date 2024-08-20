// stores/cart.js
export const useCartStore = () => {
    const cart = useState('cart', () => {
    if (typeof window !== 'undefined') { // Kiểm tra nếu mã đang chạy trên client
      const storedCart = sessionStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // Trả về mảng rỗng nếu chạy trên server
  });
  
    const updateCart = (item) => {
      const cartItems = [...cart.value];
      const itemIndex = cartItems.findIndex(i => i._id === item._id);
  
      if (itemIndex !== -1) {
        if (item.quantity > 0) {
          cartItems[itemIndex] = item;
        } else {
          cartItems.splice(itemIndex, 1);
        }
      } else if (item.quantity > 0) {
        cartItems.push(item);
      }
  
      cart.value = cartItems;
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const clearCart = () => {
      cart.value = [];
      sessionStorage.removeItem('cart');
    };
  
    const getCartItems = () => {
      return cart.value;
    };
  
    return {
      cart,
      updateCart,
      getCartItems,
      clearCart
    };
  };
  