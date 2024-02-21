import styles from '@/styles/Logs.module.css'

export default function LogsLayout({ children }) {
    return (
        <div className={styles.logsBody}>
            {children}
        </div>
    )
}