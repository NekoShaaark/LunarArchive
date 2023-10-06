import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
    const router = useRouter()

    //render layout as normal (if is not on specified pages)
    if(router.pathname != "/404"){
        return (
            <div className="layout">

                {/* navbar */}
                {/* <div className="layout-nav"><Navbar/></div> */}
                
                {/* content + sidebars */}
                {/* <div className="leftbar" /> */}
                <div className="layout-content">{ children }</div>
                {/* <div className="rightbar" /> */}

                {/* footer */}
                {/* <div className="layout-footer"><Footer/></div> */}
            </div>
    )}


    //dont render layout if is a specified page (specified pages above)
    else{ 
        return (
            <div className="content">{ children }</div>
        )}
}
 

export default Layout;