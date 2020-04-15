import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './global.styles';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import Spinner from './components/spinner/spinner.component';

const HomePage = lazy( ()=> import('./pages/home-page/home-page.component') );
const ShopPage = lazy( ()=> import('./pages/shop/shop.component') );
const Login = lazy( ()=> import('./pages/login/login.component') );
const CheckoutPage = lazy( ()=> import('./pages/checkout/checkout.component') );

const App = ({ checkUserSession, currentUser } ) => {

  useEffect( () => {
    checkUserSession();
  }, [ checkUserSession ] );

  return (
    <div>
      <GlobalStyle/>
      <Header/>
      <Switch>
        <Suspense fallback={<Spinner/>}> 
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
      </Suspense>
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