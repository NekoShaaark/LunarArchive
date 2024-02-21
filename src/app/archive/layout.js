import styles from '@/styles/Archive.module.css'

export default function ArchiveLayout({ children }) {
    return (
        <div className={styles.archiveBody}>
            {children}
        </div>
    )
}