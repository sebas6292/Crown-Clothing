import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
    return (
      <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {[].map(item => <CartItem cartitem={item} />)}
        </div>
        <Button>TO CHECKOUT</Button>
      </div>  
    )
}

export default CartDropdown;