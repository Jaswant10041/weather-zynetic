import axios from "axios";

const weatherForecast = async(city) => {
    try{
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bb60a37ba6d01f853b6bcd5f5899b110&units=metric`)
        console.log(response)
        const arr=response.data.list.slice(0,5);
        return arr;
    } 
    catch(err){
        console.log(err);
    }
}
export default weatherForecast;