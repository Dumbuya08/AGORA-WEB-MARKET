import React, { useState } from "react";

// Dummy product data
const products = [
  { id: 1, name: "Clothing Item 1", price: 25.0, currency: "USD" },
  { id: 2, name: "Shoes Item 1", price: 50.0, currency: "USD" },
  { id: 3, name: "Bag Item 1", price: 35.0, currency: "USD" },
  { id: 4, name: "Cosmetics Item 1", price: 15.0, currency: "USD" },
];

// Payment options
const paymentMethods = [
  { id: 1, name: "MoneyGram" },
  { id: 2, name: "Orange Money" },
  { id: 3, name: "PayPal" },
  { id: 4, name: "Credit Card" },
  { id: 5, name: "Bank Transfer" },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [total, setTotal] = useState(0);

  // Function to add products to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setTotal((prevTotal) => prevTotal + product.price);
  };

  // Function to remove items from the cart
  const removeFromCart = (index) => {
    const itemPrice = cartItems[index].price;
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    setTotal((prevTotal) => prevTotal - itemPrice);
  };

  // Function to select the payment method
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // Function to place the order
  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
    } else if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
    } else {
      alert(
        `Order placed successfully! You will be paying ${total.toFixed(2)} USD using ${selectedPaymentMethod}.`
      );
      // Here you can add functionality to send data to the server (e.g., via API call)
      // Reset cart after placing the order
      setCartItems([]);
      setTotal(0);
      setSelectedPaymentMethod("");
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>Price: {product.price} {product.currency}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, index) => (
            <div key={index}>
              <p>{item.name} - ${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>Payment Method</h3>
      <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
        <option value="">--Select Payment Method--</option>
        {paymentMethods.map((method) => (
          <option key={method.id} value={method.name}>
            {method.name}
          </option>
        ))}
      </select>

      <br />
      <br />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
