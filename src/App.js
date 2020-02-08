import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Login from './pages/login/login.component';
import CheckoutPage from './pages/checkout/checkout.component.jsx'

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot( snapshot => {
          setCurrentUser(
            {
              id: snapshot.id,
              ...snapshot.data()
            }
          )
        });
      }
      else {
        setCurrentUser(null);
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/login' 
            render={ 
              ()=> { 
                return this.props.currentUser 
                  ? (<Redirect to='/'/>) 
                  : (<Login/>)
              }
            }
          />
          <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = ({user}) => {
  return{
    currentUser: user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: user => dispatch( setCurrentUser(user) )
  }
}

export default connect( 
  mapStateToProps, 
  mapDispatchToProps
)(App);