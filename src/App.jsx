import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import {Cart, Home, Product, Productlist, Signup, Login, Order} from './index'
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Productlist />}/>
          <Route path='/products/:category' element={<Productlist />}/>
          <Route path='/product/:id' element={<Product />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={ <Login />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/order/' element={<Order />}/>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
    </div>
  )
}

export default App
