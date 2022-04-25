import { Routes, Route } from 'react-router-dom';
import './shop.styles.scss';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const Shop = () => {
    return (
       <Routes>
           <Route index element={<CategoryPreview />} />
       </Routes>
    );
};

export default Shop;