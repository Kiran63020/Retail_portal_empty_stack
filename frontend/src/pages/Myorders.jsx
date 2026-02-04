import { useEffect, useState } from "react";
import { fetchMyOrders } from "../lib/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchMyOrders();
      setOrders(data);
    })();
  }, []);

  if (!orders.length) {
    return <p className="text-sm text-slate-500">No orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-lg p-4 text-sm"
        >
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order #{order._id}</span>
            <span className="text-slate-500">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mb-1">
            Status: <span className="font-medium">{order.status}</span>
          </p>
          <p className="mb-2">
            Total: <span className="font-semibold">₹{order.total}</span>
          </p>
          <div>
            <h4 className="font-medium mb-1">Items</h4>
            <ul className="list-disc list-inside text-slate-700">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.productId} × {item.qty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}