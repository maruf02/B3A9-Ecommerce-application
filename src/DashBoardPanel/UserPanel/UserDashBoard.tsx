import { useAppSelector } from "../../Redux/hooks";

const UserDashBoard = () => {
  const cart = useAppSelector((state) => state.cart);
  console.log("cart", cart);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cart.savedProducts.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cart.savedProducts.map((product) => (
            <div key={product.productId} className="card glass p-4">
              <img
                src={product.mimage}
                alt={product.name}
                className="h-40 w-full object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.requiredQty}</p>
              <p>Total: ${(product.price * product.requiredQty).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashBoard;
