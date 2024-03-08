import styles from '@/styles/Portfolio.module.css'

export default function PortfolioLayout({ children }) {
    return (
        <div className={styles.portfolioBody}>
            {children}
        </div>
    )
}