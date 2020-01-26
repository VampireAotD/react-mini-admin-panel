import React from 'react'
import { Drawer, List, ListItem } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.css'

export default ({ openMenu, toggleMenu, links }) => {

    return (
        <Drawer
            open={openMenu}
            onClose={toggleMenu}
            className={styles.menu}
        >
            <List>
                {links.map( (link, index) => {
                    return (
                        <ListItem
                            key={index}
                            onClick={toggleMenu}
                        >
                            <NavLink
                                to={link.path}
                                exact={link.exact}
                                activeClassName={styles["active-link"]}
                            >
                                {link.label}
                            </NavLink>
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    )
}