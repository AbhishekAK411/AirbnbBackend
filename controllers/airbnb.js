import axios from "axios";
import node_geocoder from "node-geocoder";

export const search = async (req,res) =>{
    try{
        const { location, checkin, checkout, adultCount, childrenCount, currency } = req.body;
        if(!location) return res.send("Location is required.");
        // console.log(checkin, checkout, adultCount, childrenCount);
        const options = {
            method: 'GET',
            url: 'https://airbnb13.p.rapidapi.com/search-location',
            params: {
              location: `${location}`,
              checkin: `${checkin}`,
              checkout: `${checkout}`,
              adults: `${adultCount}`,
              children: `${childrenCount}`,
              infants: '0',
              pets: '0',
              page: '1',
              currency: `${currency}`
            },
            headers: {
              'X-RapidAPI-Key': 'eccd6d6feemsh2a777da29beaf15p14fe1ajsncb2464e044e6',
              'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
          };

          const response = await axios.request(options);
          return res.send(response.data);
    }catch(err){
        return res.send(err);
    }
}


export const geoLocate = async (req,res) =>{
    try{
        const {location} = req.body;
        if(!location) return res.send("Location is required.");
        const geoOptions = {
            provider : "openstreetmap"
        };
        const geocoder = node_geocoder(geoOptions);
        const result = await geocoder.geocode(location);
        if(result.length === 0){
            return res.send("No coordinates found for the location.");
        }
        const latitude = result[0].latitude;
        const longitude = result[0].longitude;
        const options = {
            method: 'GET',
            url: 'https://airbnb13.p.rapidapi.com/search-geo',
            params: {
              ne_lat: `${latitude}`,
              ne_lng: `${longitude}`,
              sw_lat: `${latitude-0.10}`,
              sw_lng: `${longitude-0.10}`,
              checkin: '2023-09-15',
              checkout: '2023-09-16',
              adults: '1',
              children: '0',
              infants: '0',
              pets: '0',
              page: '1',
              currency: 'USD'
            },
            headers: {
              'X-RapidAPI-Key': 'eccd6d6feemsh2a777da29beaf15p14fe1ajsncb2464e044e6',
              'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
          };
          const response = await axios.request(options);
          return res.send(response.data);
    }catch(err){
        return res.send(err);
    }
}