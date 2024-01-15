import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListPage from './view/productListPage';

function App() {
  return (
<BrowserRouter>
		<Routes>
			<Route path="/" element={<ProductListPage />} />
		</Routes>
	</BrowserRouter>
  )
}

export default App
