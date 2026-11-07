import { ShoppingCart } from 'lucide-react'
import type { Product } from '../types'

type Props = {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.isFeatured && <span className="badge">Customer favourite</span>}
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="product-category">{product.categoryName}</p>
        <h3>{product.name}</h3>
        <p className="product-origin">{product.origin}</p>
        <div className="product-bottom">
          <div><strong>₹{product.price.toFixed(0)}</strong><small> / {product.unit}</small></div>
          <button onClick={() => onAdd(product)} className="add-button">
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </article>
  )
}
