import React, { useState, useEffect} from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({data, country}) => {
    const [dailyData, setDailyData] = useState({})
    
    useEffect(() => {
        const fetchApi = async()=> { 
            setDailyData(await fetchDailyData())
        } 
        fetchApi()
    },[])
    console.log(country)

    const barChart = (
        data.confirmed ?
        <Bar 
          data = {{
              labels: ["Infected, Recovered, Deaths"],
              datasets: [{
                  label: "Infected",
                  backgroundColor: [
                      "rgba(0, 0, 255, 0.5)",
                  ],
                  data: [data.confirmed.value]
              }, {
                label: "Recovered",
                backgroundColor: [
                    "rgba(0, 255, 0, 0.5)",
                ],
                data: [data.recovered.value]
            },{
                label: "Deaths",
                backgroundColor: [
                    "rgba(255, 0, 0, 0.5)"
                ],
                data: [data.deaths.value]
            }]
          }}
          options = {{
              legend: {display: false},
              title: { display: true, text: `Current status in ${country}`}
          }}
        />
        : null
    )

  const {cases, deaths, recovered} = dailyData
    return(
        <div className={styles.container}>
            {

                country ? barChart : 
                 Object.keys(dailyData).length != 0 ?
                    <Line 
                      data = {{
                          labels: Object.keys(cases).map(data => data),
                          datasets: [{
                              data: Object.keys(cases).map(data => cases[data]),
                              label: 'Infected',
                              borderColor: '#3333ff',
                              fill: true
                          },{
                             data: Object.keys(deaths).map(data => deaths[data]),
                             label: 'Deaths',
                             borderColor: 'red',
                             backgroundColor: 'rgba(255, 0, 0, 0.5)',
                             fill: true
                          },{
                             data: Object.keys(recovered).map(data => recovered[data]),
                             label: 'Recovery',
                             borderColor: 'green',
                             backgroundColor: 'rgba(0, 255, 0, 0.5)',
                             fill: true
                          }
                         ],
                      }}
                     />: null
            }
            
            
        </div>
    )
}

export default Chart