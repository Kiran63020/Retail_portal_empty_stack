import { useState } from "react";
import { createProduct } from "../lib/api";

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);

    try {
      await createProduct(fd);
      setMessage("Product created successfully");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
      });
      setImage(null);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="max-w-lg bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Create product</h2>
      {message && (
        <p className="mb-3 text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded">
          {message}
        </p>
      )}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full border rounded-md px-3 py-2 text-sm"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Stock</label>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <input
            className="w-full border rounded-md px-3 py-2 text-sm"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="text-sm"
          />
        </div>

        <button className="mt-2 rounded-md bg-blue-600 text-white text-sm px-4 py-2 hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
}