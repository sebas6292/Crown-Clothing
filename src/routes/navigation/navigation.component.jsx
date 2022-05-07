import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from '../../utils/firebase.utils'

import { NavigationContainer, Navlinks, NavLink, LogoContainer } from './navigation.styles.jsx';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
         // helps a user signout of the account by grabbing the user from the contextUser
         const { isCartOpen } = useContext(CartContext);
    return (
    <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                 <CrownLogo className='logo'/>
            </LogoContainer>
            
            <Navlinks className='nav-links-container'>
                <NavLink className='nav-link' to='/shop'>
                    SHOP
                </NavLink>
        
                { currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            {' '}
                            SIGN OUT {' '}
                            </NavLink>
                        ):( 
                        <NavLink className='nav-link' to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
            </Navlinks>
            { isCartOpen && <CartDropdown /> }
        </NavigationContainer> 
        <Outlet />
    </Fragment> 
    );
};

export default Navigation;