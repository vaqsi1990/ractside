import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../parts/Navbar';
import { AuthContext } from '../helper/Login';
import { cartItems, deleteCart } from '../helper/Cart';
import { HiOutlineMinus, HiOutlinePlus, HiTrash } from 'react-icons/hi';
import './add.css';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});
  const { user } = useContext(AuthContext);
  const userId = user?.details?._id;
  const fetchData = async () => {
    try {
      const data = await cartItems(userId);
      setCartData(data);

      const quantities = {};
      data.items.forEach((item) => {
        quantities[item._id] = item.quantity;
      });
      setItemQuantities(quantities);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setItemQuantities((allItems) => ({
      ...allItems,
      [itemId]: newQuantity,
    }));
  };

  const deleteItem = async (itemId) => {
    try {
      await deleteCart(userId, itemId);
      console.log('Item deleted from cart');
      fetchData(); // Refetch cart data after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt">
        <div className="row">
          <div className="col-md-8">
            {cartData ? (
              <div>
                <h2>Cart Items</h2>
                {cartData.items.map((item) => (
                  <div key={item._id} className="mb-4 border p-3">
                    <p>Game ID: {item.gameId}</p>
                    <p>Name: {item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {itemQuantities[item._id]}</p>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => {
                        handleQuantityChange(item._id, Math.max(0, itemQuantities[item._id] - 1));
                      }}
                    >
                      <HiOutlineMinus />
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => {
                        handleQuantityChange(item._id, itemQuantities[item._id] + 1);
                      }}
                    >
                      <HiOutlinePlus />
                    </button >
                    <button onClick={() => deleteItem(item._id)} className="btn btn-danger">
  <HiTrash />
</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Cart is Empty...</p>
            )}
          </div>

          <div className="col-md-4 ">
            {cartData ? (
              <div className="border p-3">
                <h2>Payment Summary</h2>
                <p>Total Items: {cartData.items.length}</p>
                <p>
                  Total Price: ${' '}
                  {cartData.items.reduce(
                    (total, item) => total + item.price * itemQuantities[item._id],
                    0
                  )}
                </p>
                <Link to={"/bank"} className="btn btn-primary" >Pay  </Link>
               
              </div>
            ) : (
              <p>Cart Is Empty</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
