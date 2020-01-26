import React from 'react'
import { connect } from "react-redux";
import { logout } from "../../redux/actions/AuthActions";

class Logout extends React.Component{

    componentDidMount(){
        this.props.logout()
    }

    render(){
        return(
            <></>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        logout : () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)