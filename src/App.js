import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Login from './pages/login/login.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

const HatsPage = () => {
  return (
    <div>
      <h1>HATS PAGE</h1>
    </div>
  )
}

const TopicsList = (props) => {
  return (
    <div>
      <h1>Topics List Page</h1>
      <p> <Link to='/topics/10'>Go to 10</Link></p>
      <p> <button onClick={ ()=> { props.history.push('/topics/17') }}>Go to 17</button> </p>
      <p> <Link to={ props.match.url + '/21'}>Go to 21 </Link> </p>
    </div>
  )
}

const TopicDetail = (props) => {
  console.log(props)
  return (
    <div>
      <h1>Topics Detail Page {props.match.params.topicId}</h1>
    </div>
  )
}

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
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/login' 
            render={ 
              ()=> { 
                return this.props.currentUser 
                  ? (<Redirect to='/'/>) 
                  : (<Login/>)
              }
            }
          />
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