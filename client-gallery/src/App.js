import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import FadeIn from 'react-fade-in';
import { createGlobalStyle } from 'styled-components';
import { stack as Menu } from 'react-burger-menu'
import ScrollToTop from "react-scroll-to-top";
import {FaArrowUp} from 'react-icons/fa';
import Footer from './components/Footer';

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
   <div id="outer-container" className="App" style={{"background":'var(--color-primary)', height: "100%"}}>
    {/* <Route path="/test" render={() => <Test images={this.state.images} />} /> */}
    <GlobalStyles />
    <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <a href="/" className="menu-item" tabIndex="0">
        <i className="lni lni-home"></i><span> Home</span>
        </a>
    </Menu>
    <div id="page-wrap" style={{height: "100%"}}>
    <FadeIn>
      <Route exact path="/gallery/:id" component={Gallery} />
      <Route exact path="/" component={Home} />
    </FadeIn>
    </div>
    <ScrollToTop smooth style={{color:"white", backgroundColor:"black", boxShadow:"none"}} component={
      <FadeIn>
      <FaArrowUp/>
      </FadeIn>
    }/>
    {/* <ScrollUp 
              style={{right:"5vw"}}
              showUnder={40}
              easing={'easeOutCubic'}
              duration={800}
              >
    <button type="button" className="btn btn-dark btn-circle btn-xl"><FaArrowUp/>
    </button>
    </ScrollUp> */}
    <Footer/>
   </div>
  );
 }
}

export default App;

const GlobalStyles = createGlobalStyle`
  html {
    --color-primary: 	#121212;
    /* --color-accent: #F75743; */
    --color-accent: #383838;
  }
`;
