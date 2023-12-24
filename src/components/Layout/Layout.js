import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Navigation/>
            <main className="container" style={{minHeight: '85vh'}}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
