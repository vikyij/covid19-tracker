import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './Components'
import { fetchData } from './api'

import styles from './App.module.css'
import covidImage from './images/image.png'

class App extends Component {
   
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData()

    this.setState({data: fetchedData})
  }

handleCountryChange = async(e) => {
   const fetchedData = await fetchData(e)

   this.setState({data: fetchedData, country: e})
}

  render() {
    const {data, country} = this.state
    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImage} alt="Covid-19 Image"/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }

}

export default App;
