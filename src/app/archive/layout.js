import styles from '@/styles/Archive.module.css'

export default function ArchiveLayout({ children }) {
    return (
        <section>
            <div className={styles.archiveBody}>
                <div className="layout">
                <div className="layout-nav"><Navbar/></div>
                    <div className="layout-content">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}