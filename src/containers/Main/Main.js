import React from 'react'
import Container from '@material-ui/core/Container/Container'
import { withStyles } from '@material-ui/styles'

const styles = {
    wrapper : {
        width : '80%',
        minHeight: '100vh',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        flexWrap : 'wrap',
        alignItems : 'center',
        paddingTop : '50px'
    }
}

class Main extends React.Component{
    render(){
        const { classes, children} = this.props
        return(
            <main>
                <Container
                    className={classes.wrapper}
                    maxWidth={'xl'}
                >
                    {children}
                </Container>
            </main>
        )
    }
}

export default withStyles(styles)(Main)