import { Leaf, Search, ShoppingBag, Menu } from 'lucide-react'

type HeaderProps = {
  search: string
  onSearchChange: (value: string) => void
  cartCount: number
}

export default function Header({ search, onSearchChange, cartCount }: HeaderProps) {
  return (
    <>
      <div className="announcement">
        <span><Leaf size={15} /> 100% Natural</span>
        <span>Direct from Sirumalai Hills</span>
        <span>Supporting local producers</span>
      </div>
      <header className="site-header">
        <a className="brand" href="#">
          <span className="brand-mark"><Leaf size={30} /></span>
          <span><strong>Sirumalai<br />Naturals</strong><small>Pure by Nature. Healthy by Choice.</small></span>
        </a>
        <label className="search-box">
          <Search size={19} />
          <input
            value={search}
            onChange={event => onSearchChange(event.target.value)}
            placeholder="Search honey, pepper, bananas..."
            aria-label="Search products"
          />
        </label>
        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Shop</a>
          <a href="#about">Our Story</a>
        </nav>
        <button className="cart-button" aria-label={`Shopping bag, ${cartCount} items`}>
          <ShoppingBag size={21} /><span>Cart ({cartCount})</span>
        </button>
        <button className="mobile-menu" aria-label="Menu"><Menu /></button>
      </header>
    </>
  )
}
