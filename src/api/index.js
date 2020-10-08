import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async(country) => {
    let changeUrl = url
    if(country) {
        changeUrl = `${url}/countries/${country}`
    }
    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeUrl)

        return {confirmed, recovered, deaths, lastUpdate}
    }
    catch(error) {
        console.log(error)
    }
    
}

export const fetchDailyData = async() => {
    try {
       const { data: {cases, deaths, recovered} } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
       //to return an object immediately, it is wrapped in ()
       /**const modifiedData = data.map(dailyData => ({
            confirmed: dailyData.confirmed,
            deaths: dailyData.deaths
        }))*/
        return {cases, deaths, recovered}
    }
    catch(error) {
       console.log(error)
    }

}

export const fetchCountries = async() => {
    const {data: {countries}} = await axios.get(`${url}/countries`)
    return countries.map(country => country.name)
}