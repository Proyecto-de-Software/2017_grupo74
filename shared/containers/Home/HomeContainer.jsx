import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Footer />
      </div>
    );
  }
}

export default connect()(HomeContainer);
