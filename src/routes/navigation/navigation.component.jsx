import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context'

import { signOutUser } from '../../utils/firebase.utils'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
         // helps a user signout of the account by grabbing the user from the contextUser
    return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                 <CrownLogo className='logo'/>
            </Link>
            
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
        
                { currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            {' '}
                            SIGN OUT {' '}
                            </span>
                        ):( 
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
            </div>
        </div>
        <Outlet />
    </Fragment> 
    );
};

export default Navigation;