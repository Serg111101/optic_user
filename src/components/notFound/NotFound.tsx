import './NotFound.scss'

export const NotFound = () => {
    

    return (
        <div className='NotFound'>
            
            <nav className="shelf">
                <a className="book home-page" href='/'>Home page</a>
                <a className="book about-us" href='/about'>About us</a>
                <a className="book contact" href='/ClipandLendStyles'>Clip Styles</a>

                <span className="book not-found"></span>

                <span className="door left"></span>
                <span className="door right"></span>

            </nav>
            <h1>Error 404</h1>
            <p>The page you're loking for can't be found</p>
            
        </div>
    )
}
