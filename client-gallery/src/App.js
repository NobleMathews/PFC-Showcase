import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import FadeIn from 'react-fade-in';
import { createGlobalStyle } from 'styled-components';

// import {config} from './config';
// import {getAlbumsArrObj} from './components/helpers/await_all';
// import Test from "./components/Test";
// var _ = require('lodash');

// let DEV_URL = '';
// if (process.env.NODE_ENV === 'development') {
//  DEV_URL = 'http://localhost:3001';
// }

class App extends Component {
//  constructor(props) {
//   super(props);
// this.state = {
//    images: []
//   };
//  }

// async componentDidMount() {
//   // const values = config.albumIDs.map(album => Object.values(album));
//   // const res = getAlbums(values);
//   const values = config.albumIDs;
//   const res = getAlbumsArrObj(values);
//   const result = await res;
//   const images = _(result).filter(album => album.status === "fulfilled").map('value').value();
//   this.setState({
//    images
//   });
// }

render() {
  return (
   <div className="App" style={{"background":'var(--color-primary)'}}>
    {/* <Route path="/test" render={() => <Test images={this.state.images} />} /> */}
    <GlobalStyles />
    <FadeIn>
      <Route exact path="/gallery/:id" component={Gallery} />
      <Route exact path="/" component={Home} />
    </FadeIn>
   </div>
  );
 }
}

export default App;

const GlobalStyles = createGlobalStyle`
  html {
    --color-primary: #F2F2F2;
    --color-accent: #F75743;
  }
`;