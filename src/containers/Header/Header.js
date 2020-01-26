import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, InputBase} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/styles'

const styles = ({
    h5 : {
        cursor : 'pointer',
        '@media (max-width : 546px)' : {
           fontSize : '1rem!important'
        }
    },
    search : {
        position : 'relative',
        display : 'flex',
        width : '80%',
        justifyContent : 'flex-end',
        color : 'white'
    },
    input : {
        padding : 5,
        backgroundColor : '#1976d2',
        color : 'white',
        borderRadius : 5
    }
})

class Header extends React.Component{

    searchHandler = title => {
        const items = document.querySelectorAll('.Items_card__2T9PW')

        items.forEach((item)=>{
            if(~item.querySelector('h3').innerText.toLowerCase().indexOf(title.toLowerCase())){
                item.style.display = 'block'
            }
            else{
                item.style.display = 'none'
            }
        })
    }

    render(){
        const { classes, toggleMenu } = this.props

        return(
            <AppBar>
                <Toolbar>
                    <IconButton
                        color={'inherit'}
                        onClick={toggleMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant='h5'
                        className={classes.h5}
                    >
                        React admin panel
                    </Typography>
                    <div
                        className={classes.search}
                    >
                        <InputBase
                            type={'search'}
                            placeholder={'Search...'}
                            className={classes.input}
                            onChange={e => this.searchHandler(e.target.value)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header)