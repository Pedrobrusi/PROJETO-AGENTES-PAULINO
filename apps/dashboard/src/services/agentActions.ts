/**
 * Agent Actions Service
 *
 * This service enables agents to perform REAL actions like:
 * - Creating files and directories
 * - Writing code
 * - Generating components
 * - Building complete applications
 */

export interface FileToCreate {
  path: string
  content: string
  type: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'markdown'
}

export interface ProjectStructure {
  name: string
  description: string
  files: FileToCreate[]
  dependencies?: Record<string, string>
}

// Generate a complete React + TypeScript pizza delivery app
export function generatePizzaApp(): ProjectStructure {
  return {
    name: 'pizza-delivery-app',
    description: 'Complete pizza delivery application with cart, orders, and menu',
    dependencies: {
      'react': '^18.2.0',
      'typescript': '^5.0.0',
      'zustand': '^4.4.0',
      'lucide-react': '^0.263.1',
      'tailwindcss': '^3.3.0'
    },
    files: [
      // Package.json
      {
        path: 'package.json',
        type: 'json',
        content: JSON.stringify({
          name: 'pizza-delivery-app',
          version: '1.0.0',
          private: true,
          scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
            preview: 'vite preview'
          },
          dependencies: {
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
            'zustand': '^4.4.0',
            'lucide-react': '^0.263.1'
          },
          devDependencies: {
            '@types/react': '^18.2.0',
            '@types/react-dom': '^18.2.0',
            '@vitejs/plugin-react': '^4.0.0',
            'typescript': '^5.0.0',
            'vite': '^4.4.0',
            'tailwindcss': '^3.3.0',
            'autoprefixer': '^10.4.0',
            'postcss': '^8.4.0'
          }
        }, null, 2)
      },

      // Types
      {
        path: 'src/types/pizza.ts',
        type: 'typescript',
        content: `export type PizzaSize = 'small' | 'medium' | 'large'

export interface Topping {
  id: string
  name: string
  price: number
}

export interface Pizza {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  category: 'classic' | 'premium' | 'vegetarian'
}

export interface CartItem {
  id: string
  pizza: Pizza
  size: PizzaSize
  toppings: Topping[]
  quantity: number
  totalPrice: number
}

export interface Order {
  id: string
  items: CartItem[]
  customerName: string
  address: string
  phone: string
  totalAmount: number
  status: 'pending' | 'preparing' | 'delivering' | 'delivered'
  createdAt: Date
}
`
      },

      // Pizza Store (Zustand)
      {
        path: 'src/stores/pizzaStore.ts',
        type: 'typescript',
        content: `import { create } from 'zustand'
import type { Pizza, CartItem, Order, PizzaSize, Topping } from '../types/pizza'

interface PizzaStore {
  // Menu
  pizzas: Pizza[]
  toppings: Topping[]

  // Cart
  cart: CartItem[]
  addToCart: (pizza: Pizza, size: PizzaSize, toppings: Topping[]) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void

  // Orders
  orders: Order[]
  createOrder: (customerInfo: { name: string; address: string; phone: string }) => void

  // Computed
  cartTotal: number
  cartItemCount: number
}

const MOCK_PIZZAS: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Classic tomato, mozzarella, and basil',
    basePrice: 12.99,
    image: '🍕',
    category: 'classic'
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Loaded with pepperoni and extra cheese',
    basePrice: 14.99,
    image: '🍕',
    category: 'classic'
  },
  {
    id: '3',
    name: 'Quattro Formaggi',
    description: 'Four cheese blend: mozzarella, gorgonzola, parmesan, fontina',
    basePrice: 16.99,
    image: '🍕',
    category: 'premium'
  },
  {
    id: '4',
    name: 'Vegetariana',
    description: 'Fresh vegetables: peppers, mushrooms, olives, onions',
    basePrice: 13.99,
    image: '🍕',
    category: 'vegetarian'
  },
  {
    id: '5',
    name: 'Hawaiian',
    description: 'Ham and pineapple with mozzarella',
    basePrice: 14.99,
    image: '🍕',
    category: 'classic'
  }
]

const MOCK_TOPPINGS: Topping[] = [
  { id: 't1', name: 'Extra Cheese', price: 2.00 },
  { id: 't2', name: 'Mushrooms', price: 1.50 },
  { id: 't3', name: 'Olives', price: 1.50 },
  { id: 't4', name: 'Peppers', price: 1.50 },
  { id: 't5', name: 'Onions', price: 1.00 },
  { id: 't6', name: 'Bacon', price: 2.50 },
]

const SIZE_MULTIPLIERS = {
  small: 0.8,
  medium: 1.0,
  large: 1.3
}

export const usePizzaStore = create<PizzaStore>((set, get) => ({
  pizzas: MOCK_PIZZAS,
  toppings: MOCK_TOPPINGS,
  cart: [],
  orders: [],
  cartTotal: 0,
  cartItemCount: 0,

  addToCart: (pizza, size, toppings) => {
    const toppingsTotal = toppings.reduce((sum, t) => sum + t.price, 0)
    const totalPrice = (pizza.basePrice + toppingsTotal) * SIZE_MULTIPLIERS[size]

    const newItem: CartItem = {
      id: crypto.randomUUID(),
      pizza,
      size,
      toppings,
      quantity: 1,
      totalPrice
    }

    set(state => {
      const newCart = [...state.cart, newItem]
      return {
        cart: newCart,
        cartTotal: newCart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0),
        cartItemCount: newCart.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  },

  removeFromCart: (itemId) => {
    set(state => {
      const newCart = state.cart.filter(item => item.id !== itemId)
      return {
        cart: newCart,
        cartTotal: newCart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0),
        cartItemCount: newCart.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return

    set(state => {
      const newCart = state.cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      return {
        cart: newCart,
        cartTotal: newCart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0),
        cartItemCount: newCart.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  },

  clearCart: () => {
    set({ cart: [], cartTotal: 0, cartItemCount: 0 })
  },

  createOrder: (customerInfo) => {
    const { cart } = get()
    if (cart.length === 0) return

    const order: Order = {
      id: crypto.randomUUID(),
      items: [...cart],
      customerName: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      totalAmount: get().cartTotal,
      status: 'pending',
      createdAt: new Date()
    }

    set(state => ({
      orders: [...state.orders, order],
      cart: [],
      cartTotal: 0,
      cartItemCount: 0
    }))
  }
}))
`
      },

      // Main App Component
      {
        path: 'src/App.tsx',
        type: 'typescript',
        content: `import { useState } from 'react'
import { ShoppingCart, Pizza, Package } from 'lucide-react'
import { usePizzaStore } from './stores/pizzaStore'
import { PizzaMenu } from './components/PizzaMenu'
import { Cart } from './components/Cart'
import { OrderHistory } from './components/OrderHistory'

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'orders'>('menu')
  const cartItemCount = usePizzaStore(state => state.cartItemCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pizza size={32} className="text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pizza Paradise</h1>
                <p className="text-sm text-gray-600">Delicious pizzas delivered hot!</p>
              </div>
            </div>

            <nav className="flex gap-2">
              <button
                onClick={() => setActiveTab('menu')}
                className={\`
                  px-4 py-2 rounded-lg font-medium transition-all
                  \${activeTab === 'menu'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                \`}
              >
                Menu
              </button>
              <button
                onClick={() => setActiveTab('cart')}
                className={\`
                  px-4 py-2 rounded-lg font-medium transition-all relative
                  \${activeTab === 'cart'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                \`}
              >
                <ShoppingCart size={20} className="inline mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={\`
                  px-4 py-2 rounded-lg font-medium transition-all
                  \${activeTab === 'orders'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                \`}
              >
                <Package size={20} className="inline mr-2" />
                Orders
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'menu' && <PizzaMenu />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'orders' && <OrderHistory />}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>🍕 Pizza Paradise - Made with ❤️ by AIOX Agents</p>
        </div>
      </footer>
    </div>
  )
}
`
      },

      // Pizza Menu Component
      {
        path: 'src/components/PizzaMenu.tsx',
        type: 'typescript',
        content: `import { useState } from 'react'
import { Plus } from 'lucide-react'
import { usePizzaStore } from '../stores/pizzaStore'
import type { Pizza, PizzaSize, Topping } from '../types/pizza'

export function PizzaMenu() {
  const pizzas = usePizzaStore(state => state.pizzas)
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null)

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Pizzas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map(pizza => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onSelect={() => setSelectedPizza(pizza)}
          />
        ))}
      </div>

      {selectedPizza && (
        <PizzaCustomizer
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
        />
      )}
    </div>
  )
}

function PizzaCard({ pizza, onSelect }: { pizza: Pizza; onSelect: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="text-6xl mb-4">{pizza.image}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pizza.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{pizza.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            $\{pizza.basePrice.toFixed(2)}
          </span>
          <button
            onClick={onSelect}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Customize
          </button>
        </div>
      </div>
    </div>
  )
}

function PizzaCustomizer({ pizza, onClose }: { pizza: Pizza; onClose: () => void }) {
  const [size, setSize] = useState<PizzaSize>('medium')
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])
  const toppings = usePizzaStore(state => state.toppings)
  const addToCart = usePizzaStore(state => state.addToCart)

  const handleAddToCart = () => {
    addToCart(pizza, size, selectedToppings)
    onClose()
  }

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings(prev =>
      prev.find(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <h3 className="text-2xl font-bold mb-4">Customize {pizza.name}</h3>

        <div className="mb-6">
          <h4 className="font-semibold mb-3">Size:</h4>
          <div className="flex gap-3">
            {(['small', 'medium', 'large'] as PizzaSize[]).map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={\`
                  px-4 py-2 rounded-lg border-2 capitalize
                  \${size === s
                    ? 'border-orange-600 bg-orange-50 text-orange-600'
                    : 'border-gray-300 hover:border-orange-300'
                  }
                \`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3">Extra Toppings:</h4>
          <div className="grid grid-cols-2 gap-3">
            {toppings.map(topping => (
              <button
                key={topping.id}
                onClick={() => toggleTopping(topping)}
                className={\`
                  px-4 py-2 rounded-lg border-2 text-left
                  \${selectedToppings.find(t => t.id === topping.id)
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-300 hover:border-orange-300'
                  }
                \`}
              >
                <div className="font-medium">{topping.name}</div>
                <div className="text-sm text-gray-600">+$\{topping.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
`
      },

      // Cart Component
      {
        path: 'src/components/Cart.tsx',
        type: 'typescript',
        content: `import { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { usePizzaStore } from '../stores/pizzaStore'

export function Cart() {
  const cart = usePizzaStore(state => state.cart)
  const cartTotal = usePizzaStore(state => state.cartTotal)
  const removeFromCart = usePizzaStore(state => state.removeFromCart)
  const updateQuantity = usePizzaStore(state => state.updateQuantity)
  const createOrder = usePizzaStore(state => state.createOrder)

  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: ''
  })

  const handleCheckout = () => {
    createOrder(customerInfo)
    setShowCheckout(false)
    setCustomerInfo({ name: '', address: '', phone: '' })
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some delicious pizzas to get started!</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
            <div className="text-4xl">{item.pizza.image}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{item.pizza.name}</h4>
              <p className="text-sm text-gray-600 capitalize">Size: {item.size}</p>
              {item.toppings.length > 0 && (
                <p className="text-sm text-gray-600">
                  + {item.toppings.map(t => t.name).join(', ')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="font-semibold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="text-lg font-bold">
              $\{(item.totalPrice * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 rounded hover:bg-red-50 text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span className="text-orange-600">$\{cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Checkout</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="123 Main St, City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={!customerInfo.name || !customerInfo.address || !customerInfo.phone}
                className="flex-1 px-4 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 disabled:bg-gray-300"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
`
      },

      // Order History Component
      {
        path: 'src/components/OrderHistory.tsx',
        type: 'typescript',
        content: `import { usePizzaStore } from '../stores/pizzaStore'

export function OrderHistory() {
  const orders = usePizzaStore(state => state.orders)

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-600">Your order history will appear here</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h4>
                <p className="text-sm text-gray-600">{order.createdAt.toLocaleString()}</p>
              </div>
              <span className={\`
                px-3 py-1 rounded-full text-sm font-medium
                \${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'delivering' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'}
              \`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm mb-1"><strong>Customer:</strong> {order.customerName}</p>
              <p className="text-sm mb-1"><strong>Address:</strong> {order.address}</p>
              <p className="text-sm mb-3"><strong>Phone:</strong> {order.phone}</p>

              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.pizza.name} ({item.size})
                      {item.toppings.length > 0 && \` + \${item.toppings.map(t => t.name).join(', ')}\`}
                    </span>
                    <span className="font-medium">
                      $\{(item.totalPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-orange-600">$\{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`
      },

      // Index HTML
      {
        path: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pizza Paradise - Delivery App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
      },

      // Main Entry
      {
        path: 'src/main.tsx',
        type: 'typescript',
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`
      },

      // Tailwind CSS
      {
        path: 'src/index.css',
        type: 'css',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`
      },

      // Tailwind Config
      {
        path: 'tailwind.config.js',
        type: 'javascript',
        content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
      },

      // TypeScript Config
      {
        path: 'tsconfig.json',
        type: 'json',
        content: JSON.stringify({
          compilerOptions: {
            target: 'ES2020',
            useDefineForClassFields: true,
            lib: ['ES2020', 'DOM', 'DOM.Iterable'],
            module: 'ESNext',
            skipLibCheck: true,
            moduleResolution: 'bundler',
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: 'react-jsx',
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noFallthroughCasesInSwitch: true
          },
          include: ['src'],
          references: [{ path: './tsconfig.node.json' }]
        }, null, 2)
      },

      // Vite Config
      {
        path: 'vite.config.ts',
        type: 'typescript',
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`
      },

      // README
      {
        path: 'README.md',
        type: 'markdown',
        content: `# 🍕 Pizza Paradise - Delivery App

A complete pizza delivery application built with React, TypeScript, and Zustand.

## Features

✅ Browse pizza menu with different categories
✅ Customize pizzas (size and toppings)
✅ Shopping cart with quantity management
✅ Checkout with customer information
✅ Order history with status tracking
✅ Beautiful, responsive UI with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## Created By

🤖 Generated by AIOX Agents (@architect, @dev, @ux-design-expert)

Enjoy your pizza! 🍕
`
      }
    ]
  }
}

// Function to download files as a ZIP (for browser)
export function downloadProjectAsZip(project: ProjectStructure) {
  // This would require a ZIP library like JSZip
  // For now, we'll just return the structure
  return project
}

// Function to display files in the preview panel
export function generateProjectPreview(project: ProjectStructure): string {
  let preview = `# ${project.name}\n\n${project.description}\n\n`
  preview += `## Files Created: ${project.files.length}\n\n`

  project.files.forEach(file => {
    preview += `### ${file.path}\n\`\`\`${file.type}\n${file.content.slice(0, 200)}...\n\`\`\`\n\n`
  })

  return preview
}
