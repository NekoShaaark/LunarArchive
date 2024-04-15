import styles from '@/styles/Settings.module.css'

export default function SettingsLayout({ children }) {
    return (
        <div className={styles.settingsBody}>
            {children}
        </div>
    )
}