import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page.component';

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
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/hats' component={HatsPage}/>
      <Route exact path='/topics' component={TopicsList}/>
      <Route exact path='/topics/:topicId' component={TopicDetail}/>
    </div>
  );
}

export default App;
