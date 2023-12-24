
const Footer = () => {
    return (
        <div className='container'>
            <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
                <div className='col-md-4 d-flex align-items-center'>
                    <a
                        href='/'
                        className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'
                    >
                        <svg className='bi' width={30} height={24}>
                            <use xlinkHref='#bootstrap' />
                        </svg>
                    </a>
                    <span className='text-muted'>© 2023 All Rights Reserved :'D</span>
                </div>
                <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
                    <li className='ms-3'>
                        <a className='text-muted' target="_blank" href='https://twitter.com/saadjavaid21'>
                            <i className='fab fa-twitter' width={24} height={24}></i>
                        </a>
                    </li>
                    <li className='ms-3'>
                        <a className='text-muted' target="_blank" href='https://instagram.com/saad._.javed'>
                            <i className='fab fa-instagram' width={24} height={24}></i>
                        </a>
                    </li>
                    <li className='ms-3'>
                        <a className='text-muted' target="_blank" href='https://web.facebook.com/profile.php?id=100005482758456'>
                            <i className='fab fa-facebook' width={24} height={24}></i>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer
