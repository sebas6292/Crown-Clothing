import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                 <CrownLogo className='logo'/>
            </Link>
            
            <div className='linkes-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                <br />
                <Link className='nav-link' to='/auth'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
    </Fragment> 
    );
};

export default Navigation;