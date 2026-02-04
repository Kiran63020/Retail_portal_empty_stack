export default function ProductCard({ product, onAdd }) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-full object-cover rounded-md mb-3"
          />
        )}
        <h3 className="font-semibold text-slate-800">{product.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">
            ₹{product.price?.toFixed(2)}
          </span>
          <span className="text-slate-500">Stock: {product.stock}</span>
        </div>
        <button
          onClick={onAdd}
          className="mt-3 inline-flex justify-center items-center rounded-md bg-blue-600 text-white text-sm px-3 py-2 hover:bg-blue-700 disabled:bg-slate-300"
          disabled={product.stock <= 0}
        >
          Add to order
        </button>
      </div>
    );
  }