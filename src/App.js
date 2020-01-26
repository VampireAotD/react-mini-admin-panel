import React from 'react';
import Header from './containers/Header/Header'
import Main from './containers/Main/Main'
import Menu from './components/Menu/Menu'
import AddNewItem from './pages/AddNewItem/AddNewItem'
import Items from './pages/Items/Items'
import Details from "./components/UpdateItem/UpdateItem";
import ChangeImage from "./components/ChangeImage/ChangeImage";
import Auth from "./pages/Auth/Auth";
import { Route, Switch, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import { autoLogin } from "./redux/actions/AuthActions";
import Logout from "./components/Logout/Logout";
import Footer from './containers/Footer/Footer'
import './App.css';

class App extends React.Component{

   state = {
       openMenu : false
   }

   toggleMenuHandler = () => {
       this.setState({
           ...this.state,
           openMenu : ! this.state.openMenu
       })
   }

   componentDidMount(){
       this.props.autoLogin()
   }

   render(){

       const links = []

       if(this.props.isAuth){
           links.push(
               {path : '/', exact : true, component : Items, label : 'Home'},
               {path : '/add-new-item/', exact : true, component : AddNewItem, label : 'Add new good'},
               {path : '/goods-list/', exact : true, component : Items, label : 'Goods list'},
               {path : '/logout/', exact: true, component: Logout, label: 'Logout'}
           )
       }

       return (
            <React.Fragment>
                <Header
                    toggleMenu={this.toggleMenuHandler}
                />
                <Main>
                    {this.props.isAuth
                        ?
                        <Menu
                            openMenu={this.state.openMenu}
                            toggleMenu={this.toggleMenuHandler}
                            isAuth={this.props.isAuth}
                            links={links}
                        />
                        :
                        null
                    }
                    <Switch>
                        {this.props.isAuth
                            ?
                            <>
                                <Route path={'/'} exact component={Items}/>
                                <Route path={'/add-new-item/'} component={AddNewItem}/>
                                <Route path={'/goods-list/'} component={Items}/>
                                <Route path={'/details/:id'} component={Details}/>
                                <Route path={'/change-image/:id'} component={ChangeImage}/>
                                <Route path={'/logout/'} component={Logout}/>
                                <Redirect to={'/'}/>
                            </>
                            :
                            <>
                                <Route path={'/auth/'} component={Auth}/>
                                <Redirect to={'/auth/'}/>
                            </>
                        }
                    </Switch>
                </Main>
                <Footer/>
            </React.Fragment>
       )
   }
}

function mapStateToProps(state) {
    return{
        isAuth : !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return{
        autoLogin : () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
