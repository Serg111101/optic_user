import "./shipment.scss"
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchUsps } from '../../store/action/RateAction';
import { fetchCreate } from "../../store/action/RateAction";
import { fetchFedex } from "../../store/action/RateAction";
import { fetchUspsGet } from "../../store/action/RateAction";
import { fetchFedexGet } from "../../store/action/RateAction";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from 'country-state-city';
import Select from "react-select";

const Shipment = () => {
  const dispatch = useAppDispatch()
  const navigate=useNavigate()
  const { usps } = useAppSelector(state => state.usps)
  const { fedex }:any = useAppSelector(state => state.fedex)
  // const {create} = useAppSelector(state => state.create)
  const { uspsGet } = useAppSelector(state => state.uspsGet)
  const { fedexGet } = useAppSelector(state => state.fedexGet)
  const [Name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [street1, setStreet1] = useState('');
  const [fedexing, setFedexing] = useState<any>('');
  const [city, setCity] = useState<any>('');
  const [state, setState] = useState<any>('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState<any>('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [lenght, setLenght] = useState('');
  const [widht, setWidht] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState<any>('')
  const [weight, setWeight] = useState('')
  const [mass, setMass] = useState<any>('')
  const [fedexs, setFedexs] = useState<any>({
    fedex: true,
    UPS: true
  })
  const [ship, setShip]=useState<any>()
  const [porj, setPorj]=useState<boolean>()  
  const units = [
    { value: "cm", label: "cm" },
    { value: "in", label: "in" },
    { value: "ft", label: "ft" },
    { value: "m", label: "m" },
    { value: "mm", label: "mm" },
    { value: "yd", label: "yd" },
  ]
  const masss = [
    { value: "G", label: "g" },
    { value: "KG", label: "kg" },
    { value: "LB", label: "lb" },
    { value: "OZ", label: "oz" },
  ];
  // const [rate, SetRate]=useState<boolean>(false)
  // const [crate,setCrate] = useState()

  useEffect(()=>{
 
  dispatch(fetchUspsGet());
       dispatch(fetchFedexGet())
    },[dispatch])
    
useEffect(()=>{
setShip(usps)
setPorj(true)
},[usps])

useEffect(()=>{
  setFedexing(fedex)
  setPorj(true)
    },[fedex])

useEffect(()=>{
setShip(uspsGet)
setPorj(true)
  },[uspsGet])

  useEffect(()=>{
    setFedexing(fedexGet)
    setPorj(true)
  },[fedexGet])
   let headArr: any = [];
  
      if(ship?.length > 0){
      const provider = ship.map((item:any)=> {
       return item.provider
      })
      removeDuplicates(provider)
    }
   function removeDuplicates(arr1: any[]) {
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(fetchFedex( ))
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
          distance_unit: unit.value,
          length: lenght,
          width: widht,
          weight: weight,
          mass_unit: mass.value.toLowerCase()
        }
        ]
      ))
  }
  async function addShip(e:any,item:any){
    e.preventDefault()
    // localStorage.removeItem('shipId')
   await dispatch(fetchCreate(item))
    navigate('/Pay')
  }

 


  return (
    <div className={'shippo_box'}>
      {/* {loading?<div>loading...........</div>:<> */}
      {
        porj ? <div>

        <div  className="shippo">
           <h2>provider Fedex</h2>
           <div className="alos">
          {fedexing.length>0 && fedexing?.map((item:any,index:any)=><div className="fed" key={index}>
            <span>estimated_days{item?.serviceDescription?.description}</span>
            <p>duration_terms {item?.serviceType}</p>
            <div>
           <label htmlFor={item?.ratedShipmentDetails}> amount {item?.ratedShipmentDetails[0]?.totalNetFedExCharge} {item?.ratedShipmentDetails[0]?.currency}</label>
           <input type="radio" name="drone" id={item.object_id}  />
            </div>
      
        <button className="save" onClick={(e)=>{addShip(e, item)}} >Save</button>

          </div>)

          }    </div>      
          {headArr.length >= 0 && headArr?.map((el:any)=> <div key={el} className="asa">
            <h2>{el}</h2>
            <div className="alo">
            {ship.length > 0 && ship.map((item: any) => item.provider === el&& <div className="shipps" key={item.object_id}>
  
        
        <span>estimated_days {item.estimated_days}</span>
        <p>duration_terms {item.duration_terms}</p>
        <div>   
        <label htmlFor={item.object_id}> amount {item.amount} {item.currency}</label>
        <input type="radio" name="drone" id={item.object_id}  />
        
        </div>
        <button className="save" onClick={(e)=>{addShip(e, item)}} >Save</button>
          
      </div>
        )} </div> </div>)
       }
        </div>
        <div className="shippo1">
      <button onClick={()=>{setPorj(false)}}> Go Back</button>

        </div>
    

          </div>:<>
          <div className={'shippo_contents'} onClick={e => e.stopPropagation()}>
            <div className='contain'>
              <span className='p1'><h1>ADD ORDERS INFORMATION</h1></span>
              <div className="orrder">
              <label htmlFor="">FEDEX</label>
              <input type="checkbox" onChange={(e) => { setFedexs({ UPS: e.target.checked, fedex: fedexs.fedex }) }} />
              <label htmlFor="">ups/usps</label>
              <input type="checkbox" onChange={(e) => { setFedexs({ fedex: e.target.checked, UPS: fedexs.UPS }) }} />
              </div>
          
              <form onSubmit={handleSubmit} className='shipform'>
                <div className='inputer'>
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
                    onChange={(e) => setCompany(e.target.value)}
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
                    getOptionLabel={(options:any) => {
                      return options["name"];
                    }}
                    getOptionValue={(options:any) => {
                      return options["name"];
                    }}

                    value={country}
                    onChange={(item:any) => {
                      setCountry(item);
                    }}
                  />
                  <p>state</p>

                  <Select
                    options={State?.getStatesOfCountry(country?.isoCode)}
                    getOptionLabel={(options:any) => {
                      return options["name"];
                    }}
                    getOptionValue={(options:any) => {
                      return options["name"];
                    }}

                    value={state}
                    onChange={(item:any) => {
                      setState(item);
                    }}
                  />
                  <p>city</p>
                  <Select
                    options={City.getCitiesOfState(
                      state?.countryCode,
                      state?.isoCode
                    )}
                    getOptionLabel={(options:any) => {
                      return options["name"];
                    }}
                    getOptionValue={(options:any) => {
                      return options["name"];
                    }}

                    value={city}
                    onChange={(item:any) => {
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
                  <input type="number"
                    onChange={(e) => setLenght(e.target.value)}
                    value={lenght}
                  />
                  <p>widht</p>
                  <input type="number"
                    onChange={(e) => setWidht(e.target.value)}
                    value={widht}
                  />
                  <p>weight</p>
                  <input type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                  />
                  <p>height</p>
                  <input type="number"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                  />
                  <p>unit</p>
                  <Select
                    options={units}
                    value={unit}
                    onChange={(item:any) => {
                      setUnit(item)
                    }}
                  />
                  <p>mass</p>
                  <Select
                    options={masss}
                    value={mass}
                    onChange={(item:any) => {
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
        </>
                  }
                 {/* <div>{rate && <Ship/>}</div>  */}
          {/* </>  }   */}
    </div>

  )
}

export default Shipment