import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const MyPayPalComponent = () => {
  const [isTransactionComplete, setTransactionComplete] = useState(false);

  const handleOnApprove = (data, actions) => {
    // Perform actions on successful payment
    // You can update the state to trigger the congratulation screen
    setTransactionComplete(true);
    return actions.order.capture();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!isTransactionComplete ? (
        <PayPalScriptProvider options={{ 'client-id': 'AaL2cK-MnqIwtBLSlnmPKX47Afh4kb6QXmSsFvWF5xLAdWBM2qB9Jud3rTVGgE8xxuHRJEyWGk7v2gR5' }}>
          <PayPalButtons onApprove={handleOnApprove} />
        </PayPalScriptProvider>
      ) : (
        <div>
          <h1>Congratulations! Your purchase was successful!</h1>
          {/* Add any additional content or components for the congratulation screen */}
        </div>
      )}
    </div>
  );
};

export default MyPayPalComponent;



