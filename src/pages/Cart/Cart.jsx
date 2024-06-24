
const Cart = () => {
  const items = [
    { id: 1, name: 'Apple Watch Series 7 - 44mm', color: 'Golden', price: 259, image: 'assets/food_background2.jpg', quantity: 1 },
    { id: 2, name: 'Beylob 90 Speaker', color: 'Space Gray', price: 99, image: 'image-url', quantity: 1 },
    { id: 3, name: 'Beoplay M5 Bluetooth Speaker', color: 'Silver Collection', price: 129, image: 'image-url', quantity: 1 },
    { id: 4, name: 'Apple Watch Series 7 - 44mm', color: 'Golden', price: 379, image: 'image-url', quantity: 1 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="p-4 max-w-3xl mx-auto flex justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.color}</p>
            </div>
            <div className="flex items-center space-x-2">
              <select value={item.quantity} className="border rounded p-1">
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
            </div>
            <button className="text-red-500 hover:text-red-700">🗑️</button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between mb-2">
          <span className="text-lg">Subtotal</span>
          <span className="text-lg">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-lg">Shipping</span>
          <span className="text-lg">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">Confirm payment</button>
        <button className="mt-2 w-full py-2 rounded-lg hover:bg-gray-200">Continue Shopping</button>
      </div>
    </div>
  );
}

export default Cart;
