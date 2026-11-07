import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Handshake, Leaf, ShieldCheck, Truck } from 'lucide-react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import { catalogService } from './services/catalogService'
import type { Category, Product } from './types'
import './styles.css'

const fallbackImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900'

export default function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [categoryData, productData] = await Promise.all([
          catalogService.getCategories(),
          catalogService.getProducts()
        ])
        setCategories(categoryData)
        setProducts(productData)
      } catch {
        setError('Could not connect to the product catalogue. Please check that the .NET API is running at http://localhost:5080.')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter(product => {
      const categoryMatches = selectedCategory === null || product.categoryId === selectedCategory
      const searchMatches = !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.categoryName.toLowerCase().includes(term)
      return categoryMatches && searchMatches
    })
  }, [products, selectedCategory, search])

  function addToCart(product: Product) {
    setCartCount(count => count + 1)
    window.alert(`${product.name} added to your sample cart. Checkout will be added in a later phase.`)
  }

  return (
    <div id="home">
      <Header search={search} onSearchChange={setSearch} cartCount={cartCount} />

      <main>
        <section className="hero">
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow"><Leaf size={16} /> A taste of the hills</p>
            <h1>Nature's goodness,<br /><em>from Sirumalai.</em></h1>
            <p>Discover selected honey, aromatic spices and seasonal hill produce from the Sirumalai region.</p>
            <a className="primary-button" href="#products">Explore products <ArrowRight size={18} /></a>
          </div>
          <div className="hero-note">Rooted in nature · Connected to local producers</div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-heading">
            <p className="eyebrow">Explore our collection</p>
            <h2>Shop by category</h2>
            <p>Find something naturally special.</p>
          </div>
          <div className="category-grid">
            <button className={`category-tile ${selectedCategory === null ? 'selected' : ''}`} onClick={() => setSelectedCategory(null)}>
              <span className="category-icon all-icon"><Leaf /></span><strong>All products</strong>
            </button>
            {categories.map(category => (
              <button
                className={`category-tile ${selectedCategory === category.id ? 'selected' : ''}`}
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <img src={category.imageUrl || fallbackImage} alt="" />
                <strong>{category.name}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="section products-section" id="products">
          <div className="products-heading">
            <div><p className="eyebrow">Selected with care</p><h2>{selectedCategory ? 'Explore this category' : 'Popular from the hills'}</h2></div>
            <span>{visibleProducts.length} products</span>
          </div>

          {loading && <p className="state-message">Loading products from the catalogue...</p>}
          {error && <p className="state-message error-message">{error}</p>}
          {!loading && !error && visibleProducts.length === 0 && <p className="state-message">No products match your search. Try another keyword.</p>}
          <div className="product-grid">
            {visibleProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>
        </section>

        <section className="story-section" id="about">
          <div className="story-image" role="img" aria-label="Green hills and countryside" />
          <div className="story-copy">
            <p className="eyebrow">A place behind every product</p>
            <h2>Inspired by the hills.<br /><em>Shared with your home.</em></h2>
            <p>Sirumalai is known for its green landscapes and local agricultural produce. Our goal is to make carefully sourced regional products easier for customers to discover.</p>
            <a href="#products" className="text-link">Discover the collection <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="promise-strip">
          <div><Leaf /><strong>Thoughtfully sourced</strong><span>Know where products come from</span></div>
          <div><Handshake /><strong>Local producer focus</strong><span>Building local connections</span></div>
          <div><ShieldCheck /><strong>Clear product details</strong><span>Information you can review</span></div>
          <div><Truck /><strong>Delivery information</strong><span>Coming with online ordering</span></div>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home"><Leaf /> Sirumalai Naturals</a>
        <p>Discover the goodness of the Sirumalai region.</p>
        <small>© {new Date().getFullYear()} Sirumalai Naturals. Demo storefront.</small>
      </footer>
    </div>
  )
}
