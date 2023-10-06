import Navbar from './Navbar.js'
import Footer from './Footer.js'
import './globals.css'


export const metadata = {
  title: 'Lunar Archive',
  description: 'Maintenance in progress...',
}

export default function RootLayout({ children }) {
  return (
    <div className="layout">

      {/* navbar */}
      {/* <div className="layout-nav"><Navbar/></div> */}
                
      {/* content + sidebars */}
      <div className="leftbar" />
      <div className="layout-content">{ children }</div>
      <div className="rightbar" />

      {/* footer */}
      {/* <div className="layout-footer"><Footer/></div> */}

    </div>
  )
}