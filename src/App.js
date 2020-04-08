import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Login from './pages/login/login.component';
import CheckoutPage from './pages/checkout/checkout.component.jsx'
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser } ) => {

  useEffect( () => {
    checkUserSession();
  }, [ checkUserSession ] );

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/login' 
          render={ 
            ()=> { 
              return currentUser 
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

const mapStateToProps = ({user}) => {
  return{
    currentUser: user.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch( checkUserSession() ),
});

export default connect( 
  mapStateToProps, 
  mapDispatchToProps
)(App);