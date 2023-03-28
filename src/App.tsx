import React, { CSSProperties, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import renerimg from '../src/assets/desktop/icon-refresh.svg';
import sunimg from '../src/assets/desktop/icon-sun.svg';
import arrodown from '../src/assets/desktop/icon-arrow-down.svg'
import arroup from '../src/assets/desktop/icon-arrow-up.svg'

const timezone = "http://worldtimeapi.org/api/ip";
const countryapi = 'http://ip-api.com/json/';
const quoteesapi = 'https://api.quotable.io/random';

const width = '375px';
const display= 'flex';
const marginTop= '40px';
const color= 'black';
const background = '#ffffffb7'
const flexDirection = 'column'
const justifyContent = 'space-around'
const alignItems = 'center'
const gap = '9px'
const fontWeight = '500'


const divStyle :any= {
  width:width,
  display:display,
  marginTop:marginTop,
  color:color,
  background:background,
  flexDirection:flexDirection,
  justifyContent:justifyContent,
  alignItems:alignItems,
  gap:gap,
  fontWeight:fontWeight

}

interface timezoneinterface {
  timezone: string;
  day_of_year: number;
  day_of_week: number;
  week_number: number;



}


interface countryinterface {
  countryCode: string;
  city: string;
}



interface quoteint{
  content:string;
  author:string;
}

function App() {
  const [zonestate, setZonestate] = useState<timezoneinterface | null>(null);
  const [country,setCountry] = useState<countryinterface|null>(null)
  const [quote, setquote ] = useState<quoteint|null>(null)
  const [greeting, setGreeting] =useState<null|string>(null)
  const [time, setTime]= useState<string>(new Date().toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false 
    
      
}))

  useEffect(()=>{
    const getData = async () => {
      try {
        const [zone, country, quotes] = await Promise.all([
          axios.get(timezone),
          axios.get(countryapi),
          axios.get(quoteesapi)
        ]);
    
        setZonestate(zone.data);
        setCountry(country.data);
        setquote(quotes.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  } 
  ,[]);


   useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      setTime(date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false 
      
    }));
      if (hours >= 5 && hours < 12) {
        setGreeting('GOOD MORNING');
      } else if (hours >= 12 && hours <= 18) {
        setGreeting('GOOD AFTERNOON');
      } else if (hours > 18 || hours < 5) {
        setGreeting('GOOD NIGHT');
      }
    }, 10000);
    console.log('useffect time render')
    return () => {
      clearInterval(intervalId);
    };
  }, []);



  console.log('Main render')
  const [toggle, setToggle]=useState<any>(true);
     
  return (
    <div className="App zina">
      <div className='blur'> 
    <div className={toggle? 'yuti':'yuti active'}> 
      <div className='quote'>
      <p>{quote?.content}</p>
      <p className='author'>{quote?.author}</p>
      </div>

      <div className='render'>
        <img src={renerimg} alt="" />
      </div>

      <div className='greeetingdiv'>
        <img src={sunimg} alt="" />
        <h3>{greeting}</h3>
      </div>


      <div className='time'> 
      <h1>{time}</h1>

      </div>

      <div className='location'>
      <p>IN {country?.countryCode}, {country?.city}</p>
      </div>

      <div className='more'
      onClick={()=>setToggle(!toggle)}
      >
       <p> MORE </p> 
       <div className='black'> 
       <img src={toggle ? arrodown : arroup} alt="" />
       </div>
      </div>

      <div style={toggle ? {display:'none'} : divStyle}>
        <div className='zone'>

        <p> Timezone : {zonestate?.timezone} </p>

        </div>
      <p> Day of year: {zonestate?.day_of_year}</p>
      <p> Day of week: {zonestate?.day_of_week}</p>
      <p> Week number: {zonestate?.week_number}</p>
      <p> Timezone: {zonestate?.timezone}</p>
      </div>
   
     </div>

    
     
    </div>
    </div>
  
  );
}

export default App;
