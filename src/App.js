import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

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

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact paTH='/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
