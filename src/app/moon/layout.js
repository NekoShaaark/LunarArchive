import styles from '@/styles/Moon.module.css'

export default function MoonLayout({ children }) {
    return (
        <div className={styles.moonBody}>
            {children}
        </div>
    )
}