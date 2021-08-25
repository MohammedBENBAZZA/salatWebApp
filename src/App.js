
import './App.css';
import { useState } from 'react';



function App() {
  const [query, setQuery] = useState('');
  const [adhan, setAdhan] = useState({});
  var axios = require("axios").default;


  var options = {
    method: 'GET',
    url: 'https://muslimsalat.p.rapidapi.com/(location)/(times)/(date)/(daylight)/(method).json',
    params: { location: 'paris', method: '5', date: '', times: 'daily' },
    headers: {
      'x-rapidapi-host': 'muslimsalat.p.rapidapi.com',
      'x-rapidapi-key': 'Your key'
    }
  };

  const api = {
    key: "Your key",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  let d = new Date();
  let today = d.toLocaleString('fr').split(',')[0].replace('/', '-').replace('/', '-');

  const search = evt => {
    if (evt.key === "Enter") {

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod !== "404") {
            options.params.location = `${query}`;
            options.params.date = today;
            axios.request(options).then(function (response) {

              setAdhan(response.data);
              setQuery('');
            }).catch(function (error) {
              console.error(error);

            });
          }
          else {
            setAdhan({})
          }
        }).catch(function (error) {
          console.log(error)
        });
    }
  }
  const hourChanger = Hour => {
    let hour = Hour.split(" ");
    let h = hour[1];

    if (h === "am") {
      return hour[0];
    }
    else if (h === "pm") {
      let t = hour[0].split(":");
      let newH = parseInt(t[0]) + 12;


      return `${newH}:${t[1]}`

    }



  }




  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for your city ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof adhan.items != "undefined") ? (
          <>
            <div className="infos-box">
              <div className="location-box">
                <div className="location"><i className="fas fa-map-marker-alt"></i> {adhan.city}, {adhan.country}</div>
                <div className="date">{ }</div>

              </div>
            </div>

            <div className="adhan-box">
              <div className="salat-name">
                الصبح
              </div>
              <div className="time">
                {hourChanger(adhan.items[0].fajr)}
              </div>

            </div>
            <div className="adhan-box">
              <div className="salat-name">
                الظهر
              </div>
              <div className="time">
                {hourChanger(adhan.items[0].dhuhr)}
              </div>
            </div>
            <div className="adhan-box">
              <div className="salat-name">
                العصر
              </div>
              <div className="time">
                {hourChanger(adhan.items[0].asr)}
              </div>

            </div>

            <div className="adhan-box">
              <div className="salat-name">
                المغرب
              </div>
              <div className="time">
                {hourChanger(adhan.items[0].maghrib)}
              </div>
            </div>
            <div className="adhan-box">
              <div className="salat-name">
                العشاء
              </div>
              <div className="time">
                {hourChanger(adhan.items[0].isha)}
              </div>
            </div>
          </>
        ) : ('')}

      </main>

    </div>
  );
}

export default App;
