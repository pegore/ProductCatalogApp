import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductList } from './store/product/productSlice'
import { AsyncThunkAction } from '@reduxjs/toolkit';

function App() {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => state.product.data);

  const searchProduct = () => {
    dispatch(fetchProductList())
  }

  useEffect(searchProduct, []);

  return (
    <>
      <div>
        {JSON.stringify(productList)}
       </div>
    </>
  )
}

export default App
