import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListPage from './view/productListPage';
import Toolbar from './components/toolbar';

function App() {
  return (
	<>
		<Toolbar />
		<div className='app-content'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProductListPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	</>
  )
}

export default App
