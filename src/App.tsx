import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListPage from './view/productListPage';
import Toolbar from './components/toolbar';
import ProductDetailsPage from './view/productDetailsPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Toolbar />
				<div className='app-content'>
					<Routes>
						<Route path="/" element={<ProductListPage />} />
						<Route path="/:id" element={<ProductDetailsPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
