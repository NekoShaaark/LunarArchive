import styles from '@/styles/Archive.module.css'
import Navbar from '@/components/Navbar'

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