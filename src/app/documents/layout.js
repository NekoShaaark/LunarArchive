import styles from '@/styles/Documents.module.css'

export default function DocumentsLayout({ children }) {
    return (
        <div className={styles.documentsBody}>
            {children}
        </div>
    )
}