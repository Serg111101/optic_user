import React from 'react'
import "./modal.scss"
import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchUsps } from '../../store/action/RateAction';
import { Country, State, City } from 'country-state-city';
import Select from "react-select";

export default function Modal({active, setActive}) {
 
     const navigate=useNavigate()
    const dispatch = useAppDispatch()


    const [Name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [street1, setStreet1] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('')
    const [zip,setZip] = useState('')
    const [country,setCountry] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')

    const [lenght,setLenght] = useState('');
    const [widht,setWidht] = useState('')
    const [height,setHeight] = useState('')
    const [unit,setUnit] = useState('')
    const [weight,setWeight] = useState('')
    const [mass,setMass] = useState('')




   
    const units = [
          { value: "cm", label: "cm" },
          { value: "in", label: "in" },
          { value: "ft", label: "ft" },
          { value: "m", label: "m" },
          { value: "mm", label: "mm" },
          { value: "yd", label: "yd" },
        ]
      
        const masss = [
          { value: "g", label: "g" },
          { value: "kg", label: "kg" },
          { value: "lb", label: "lb" },
          { value: "oz", label: "oz" },
         
        ]
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    

    
 
    dispatch(fetchUsps(

        [{
                      name: Name,
        company: company,
        street1: street1,
        city: city.name,
        state: state.name,
        zip: zip,
        country: country.name,
        phone: phone,
        email: email
                    },
                  {
                    height: height,
                    distance_unit:unit.value,
                    length: lenght,
                    width: widht,
                    weight: weight,
                    mass_unit: mass.value
                  }
                  
                  
                  ]

    ))
    setActive(!active)
   
       
    
          }
          
        
          return (
            

    <div className={active ? 'modal active' : "modal"} onClick={()=>setActive(false)}>
        <div className={active ? 'modal_content active' : "modal_content"} onClick={e=>e.stopPropagation()}>
              <div className='contain'>
                <p className='p1'><h1>ADD ORDERS INFORMATION</h1></p>
                <form onSubmit={handleSubmit} className='containform'>
                    <div className='inputers'>
                        <p>Name</p>
                      <input
                     type="text"
                     id="depName"
                   
                   
                     onChange={(e) => setName(e.target.value)}
                     value={Name}
                     required
                 />
                      


                         <p>Company</p>
                     <input 
                     type="text"
                     id="create-item"
                     onChange={(e) =>setCompany(e.target.value)}
                     value={company}
                     required
                   
                 />
                  <p>street1</p>
                  <input type="text"
                     onChange={(e) => setStreet1(e.target.value)}
                    value={street1}
                   
                  />


             <p>country</p>
              <Select 
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
               
                value={country}
                onChange={(item) => {
                  setCountry(item);
                }}
              />
             <p>state</p>

              <Select 
                options={State?.getStatesOfCountry(country?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
              
                value={state}
                onChange={(item) => {
                  setState(item);
                }}
              />
              <p>city</p>
              <Select 
                options={City.getCitiesOfState(
                state?.countryCode,
                state?.isoCode
                )}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                
                value={city}
                onChange={(item) => {
                  setCity(item);
                }}
              />

            
                   <p>zip</p>
                  <input type="text"
                  onChange={(e) => setZip(e.target.value)}
                  value={zip}
             
                  />
                   
                   <p>phone</p>
                  <input type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
             
                  />
                   <p>email</p>
                  <input type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
             
                  />




                   <p>lenght</p>
                  <input type="text"
                  onChange={(e) => setLenght(e.target.value)}
                  value={lenght}
             
                  />
                   <p>widht</p>
                  <input type="text"
                  onChange={(e) => setWidht(e.target.value)}
                  value={widht}
             
                  />
                   <p>weight</p>
                  <input type="text"
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
             
                  />
                   <p>height</p>
                  <input type="text"
                  onChange={(e) => setHeight(e.target.value)}
                  value={height}
             
                  />
                   <p>unit</p>
                   <Select 
                   options={units}
                   value={unit}
                   onChange={(item) => {
                    setUnit(item)
                   }}
                 />
                   <p>mass</p>
                   <Select 
                   options={masss}
                   value={mass}
                   onChange={(item) => {
                    setMass(item)
                   }}
                 />
                <div >
          
               
  
  
                </div>


                      
                    </div>
                   
                    <div className='registraciabutton'>

                       <button>Save</button>

                    
                    </div>
                             

                    </form>
                  </div>
              </div>
        </div>

    
  )
}

