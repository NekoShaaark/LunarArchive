import Link from 'next/link'
import Image from 'next/image'


const Navbar = () => {
    
    //navbar contents
    const navbarContents = (path, name) => {
        return( 
        <li>
            <Link href={path}>
                <span className="background">
                    {name}
                </span>
            </Link>
        </li> 
        )
    }


    //actual page
    return ( 
        <nav className="navigation">

            {/* navbar */}
            <div className ="navigation-primary">
                <ul>
                    {navbarContents("/", "Home")}
                    {navbarContents("/archive", "Archive")}
                </ul>
            </div>
        
            {/* logo */}
            <div className="navigation-secondary">
                <Link href="/">
                    <Image src="/logo.png" width={131} height={79.25} alt="Logo" title="Back to Homepage"/>
                </Link>
            </div>
            
            {/* settings (dark mode, etc.) */}
            <div className="navigation-settings">
                <Link href="/">Placeholder</Link>
            </div>
        </nav>
    )
}
 
export default Navbar;