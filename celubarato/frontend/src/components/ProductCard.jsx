import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="rounded-xl bg-white p-4 shadow-md">
      <img src={product.imagen_url} alt={product.modelo} className="h-52 w-full rounded-lg object-cover" />
      <div className="mt-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-darkbg">{product.modelo}</h2>
        {product.estado_verificado && (
          <span className="rounded-full bg-secondary/20 px-2 py-1 text-xs font-semibold text-darkbg">✅ Verificado</span>
        )}
      </div>
      <p className="text-sm text-textsecondary">{product.capacidad} · {product.color} · {product.condicion}</p>
      <div className="mt-3">
        {product.precio_original ? (
          <>
            <p className="text-sm text-textsecondary line-through">${product.precio_original}</p>
            <p className="text-xl font-bold text-accent">${product.precio}</p>
          </>
        ) : (
          <p className="text-xl font-bold text-primary">${product.precio}</p>
        )}
      </div>
      <Link
        to={`/products/${product._id}`}
        className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        Ver detalle
      </Link>
    </article>
  );
}

export default ProductCard;
