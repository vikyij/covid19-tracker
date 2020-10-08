import React, { useState, useEffect} from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../api'

import styles from './CountryPicker.module.css'

const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchApi = async() => {
            setFetchedCountries(await fetchCountries())
        }
        fetchApi()
    }, [fetchedCountries])

    const handleSelect=(e)=> {
        handleCountryChange(e.target.value)
    }

    return(
        <FormControl className={styles.formControl}>
            <NativeSelect onChange={(e)=>handleSelect(e)}>
            <option value="">Global</option>

                {fetchedCountries.map((country,index) => {
                    return(
                        <option key={index} value={country}>{country}</option>
                    )
                })}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker