import React, { useEffect, useState } from 'react'

const PRICE = 499
const COLORS = ['Black', 'Blue', 'White']

function Header() {
  return <header className="store-header">Amazon Product Store</header>
}

function ProductCard({ productName, price, quantity, selectedColor, deliveryCity }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${productName} | ${selectedColor} | Cart: ${quantity}`

    return () => {
      document.title = previousTitle
    }
  }, [productName, selectedColor, quantity])

  const total = quantity * price

  return (
    <section className="product-card" aria-label="Product details">
      <h2>Product Details</h2>
      <dl>
        <div>
          <dt>Product</dt>
          <dd>{productName}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>₹{price}</dd>
        </div>
        <div>
          <dt>Colour</dt>
          <dd>{selectedColor}</dd>
        </div>
        <div>
          <dt>Deliver to</dt>
          <dd>{deliveryCity}</dd>
        </div>
        <div>
          <dt>Cart Quantity</dt>
          <dd>{quantity}</dd>
        </div>
        <div>
          <dt>Total Amount</dt>
          <dd>₹{total}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{quantity > 0 ? 'Product added to cart' : 'Cart is empty'}</dd>
        </div>
      </dl>
    </section>
  )
}

function Footer() {
  return <footer className="store-footer">© 2026 Amazon Product Store</footer>
}

function App() {
  const [quantity, setQuantity] = useState(0)
  const [selectedColor, setSelectedColor] = useState('Black')
  const [deliveryCity, setDeliveryCity] = useState('Coimbatore')
  const [showProduct, setShowProduct] = useState(true)

  return (
    <div className="app">
      <Header />
      <main>
        <div className="controls" aria-label="Cart controls">
          <label>
            Colour
            <select
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.target.value)}
            >
              {COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
          <label>
            Deliver to
            <input
              type="text"
              value={deliveryCity}
              onChange={(event) => setDeliveryCity(event.target.value)}
            />
          </label>
          <div className="button-row">
            <button type="button" onClick={() => setQuantity((current) => current + 1)}>
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(0, current - 1))}
              disabled={quantity === 0}
            >
              Remove One
            </button>
            <button type="button" onClick={() => setQuantity(0)}>
              Reset Cart
            </button>
            <button type="button" onClick={() => setShowProduct((current) => !current)}>
              {showProduct ? 'Hide Product' : 'Show Product'}
            </button>
          </div>
        </div>

        {showProduct && (
          <ProductCard
            productName="Wireless Mouse"
            price={PRICE}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
