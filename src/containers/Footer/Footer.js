import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
    footer : {
        padding : '20px 20px 45px 20px',
        background : '#101010',
        color : 'white'
    },
    link : {
        color : 'white',
        borderBottom : '1px solid transparent',
        transition : 'border-bottom-color .15s ease',
        '&:hover' : {
            borderBottomColor : 'white'
        }
    }
}

class Footer extends React.Component{
    render(){

        const {classes} = this.props

        return(
            <footer
                className={classes.footer}
            >
                <p>Made by <a href="https://github.com/VampireAotD" className={classes.link}>Stepenko</a> &copy;</p>
            </footer>
        )
    }
}

export default withStyles(styles)(Footer)