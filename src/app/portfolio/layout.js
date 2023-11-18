import styles from '@/styles/Portfolio.module.css'

export default function PortfolioLayout({ children }) {
    return (
        <section>
            <div className={styles.portfolioBody}>
                <div className="layout">
                {/* <div className="layout-nav"><Navbar/></div> */}
                    <div className="layout-content">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}