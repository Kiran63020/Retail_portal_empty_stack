import { useEffect, useState } from "react";
import { createOrder, fetchProducts } from "../lib/api";
import ProductCard from "../Components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const [data, setData] = useState({ products: [], total: 0 });
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth();

  const limit = 8;

  const load = async () => {
    setLoading(true);
    try {
      const trimmedKeyword = keyword.trim();
      const res = await fetchProducts({ page, limit, keyword: trimmedKeyword });
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    // reset to first page; effect will refetch using latest keyword
    setPage(1);
  };

  const addToOrder = (productId) => {
    setOrderItems((items) => {
      const existing = items.find((i) => i.productId === productId);
      if (existing) {
        return items.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { productId, qty: 1 }];
    });
  };

  const placeOrder = async () => {
    setMessage("");
    try {
      await createOrder(orderItems);
      setOrderItems([]);
      setMessage("Order placed successfully");
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "Failed to place order. Login first?"
      );
    }
  };

  const pages = Math.ceil(data.total / limit) || 1;

  return (
    <div className="space-y-6">
      <form
        className="flex gap-2 items-center"
        onSubmit={handleSearch}
      >
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="rounded-md bg-slate-800 text-white text-sm px-4 py-2">
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onAdd={() => addToOrder(p._id)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-slate-500">
          Page {page} of {pages}
        </span>
        <div className="space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2 text-slate-800">Order summary</h3>
        {orderItems.length === 0 ? (
          <p className="text-sm text-slate-500">No items added yet.</p>
        ) : (
          <>
            <ul className="text-sm text-slate-700 mb-3">
              {orderItems.map((i) => (
                <li key={i.productId}>
                  {i.productId} × {i.qty}
                </li>
              ))}
            </ul>
            <button
              onClick={placeOrder}
              disabled={!isAuthenticated}
              className="rounded-md bg-emerald-600 text-white text-sm px-4 py-2 disabled:bg-slate-300"
            >
              {isAuthenticated ? "Place order" : "Login to place order"}
            </button>
          </>
        )}
        {message && (
          <p className="mt-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}