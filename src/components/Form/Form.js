import React from 'react'
import styles from './Form.module.css'

export default ({ action, children, onSubmit }) => {
    return(
        <form
            action={ action || '/' }
            className={styles.form}
            onSubmit={onSubmit}
        >
            { children }
        </form>
    )
}