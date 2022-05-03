import { Routes, Route } from 'react-router-dom';
import './shop.styles.scss';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Category from '../category/category.component';

const Shop = () => {
    return (
       <Routes>
           <Route index element={<CategoryPreview />} />
           <Route path=":category" element={<Category />}/>
       </Routes>
    );
};

export default Shop;