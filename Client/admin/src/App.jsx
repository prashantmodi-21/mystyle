import './App.css'
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import  { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import {AddProductsForm, Dashboard, Login, OrderList, OrderUpdate, ProductsForm, ProductsList, UsersForm, UsersList} from './index'
function App() {
const {currentUser} = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {currentUser && <><Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/updateOrder/:id" element={<OrderUpdate/>} />
        <Route path="/addProduct" element={<AddProductsForm />} />
        <Route path="/updateProduct/:id" element={<ProductsForm />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/updateUser/:id" element={<UsersForm />} />
        <Route path="/users" element={<UsersList />} /></>}
      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>
    </>
  )
}

export default App
