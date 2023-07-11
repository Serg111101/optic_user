import "./shipment.scss"
import { useState, useEffect } from "react";
import { Space, Spin } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchUsps } from '../../store/action/RateAction';
import { fetchCreate } from "../../store/action/RateAction";
import { fetchFedex } from "../../store/action/FedexAction";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from 'country-state-city';
import { fetchFedexShip, fetchUspsShip } from "../../store/action/ShipAction";
import axios from "axios"
import Select from "react-select";

const URL = process.env.REACT_APP_BASE_URL


const Shipment = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { usps, loading2 } = useAppSelector(state => state.usps)
  const { loading, fedex }: any = useAppSelector(state => state.fedex)
  // const { fedexGet } = useAppSelector(state => state.fedexGet)
  const { loadingShip} =useAppSelector(state=>state.FedexShip)
  const { loadingShip1}=useAppSelector(state=>state.UspsShip)
  const [Name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [street1, setStreet1] = useState('');
  const [fedexing, setFedexing] = useState<any>();
  const [city, setCity] = useState<any>('');
  const [state, setState] = useState<any>('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState<any>('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const postser= 'service is not available';
  const [shippMethod, setShippMethod] = useState<any>()
  const [ship, setShip] = useState<any>()
  const [ship1, setShip1] = useState<any>()
  const [pickUP, setPickUP] = useState<any>()
  const [porj, setPorj] = useState<boolean>(true)

  useEffect(() => {
    name()
  }, [dispatch])

  useEffect(() => {
    setShip(usps)
    setShip1(usps)
    UspsItem()
  }, [usps])

  useEffect(() => {
    FedexItem()
  }, [fedex])



  // useEffect(() => {
  //   setFedexing(fedexGet)
  // }, [fedexGet])

  async function name() {
    const response = await axios.get(URL+'api/v1/users/shipMethods');
    console.log(response);
    
    const data1=response.data.filter((item:any)=>item.status===true)
    
    setShippMethod(data1)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPorj(!porj)
     dispatch(fetchFedex(zip))
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
        }
        ]
    ))


  }
  async function addShip(e: any, item: any) {
    e.preventDefault()
    if(localStorage.getItem("price1")){
    localStorage.removeItem("price1")
    }
    await dispatch(fetchCreate(item))

    if (item?.provider) {
       dispatch(fetchUspsShip(item))
    } else {
      await dispatch(fetchFedexShip([{
        name: Name,
        company: company,
        street1: street1,
        city: city.name,
        state: state.isoCode,
        zip: zip,
        country: country.name,
        phone: phone,
        email: email
      }
      ]))
    }
    navigate('/Pay')
  }

  function goBack() {
    setPorj(true)
    localStorage.removeItem("FedexId") 
    localStorage.removeItem("shippoId") 
  }
  function FedexItem(){
    let newfedex=[];
    let newfedex1=[]
     newfedex=fedex?.filter(function(item:any){
      if(item.serviceType === "STANDARD_OVERNIGHT")  {
        return item
      }   
      return false 
    } )
     newfedex1=fedex?.filter(function(item:any){
      if(item.serviceType === "FEDEX_GROUND")  {
        return item
      }   
      return false 
    } )
    setFedexing([newfedex,newfedex1]);
  }
  async function UspsItem(){
      let newUsps= []
      let newUsps1= []
      let newUps= []
      let newUps1= []
      newUsps=usps.filter(function(item:any){
        if(item.provider==="USPS" ){
          if(item.duration_terms === "Overnight delivery to most U.S. locations."){
            return true
          }
        }
        return false
      })
       newUsps1=usps.filter(function(item:any){
        if(item.provider==="USPS" ){
          if( item.duration_terms === "Delivery in 2 to 5 days." ){
            return true
          }
        }
        return false
      })
      setShip([newUsps,newUsps1])
      newUps = usps.filter(function (item:any) {
        if (item.provider === "UPS") {
          if (
            item.servicelevel.name === "Next Day Air®" 
          ) {
            return true; // Include the item in the filtered array
          }
        }
        return false; // Exclude the item from the filtered array
      });
      newUps1 = usps.filter(function (item:any) {
        if (item.provider === "UPS") {
          if (
            item.servicelevel.name === "3 Day Select®"
          ) {
            return true; // Include the item in the filtered array
          }
        }
        return false; // Exclude the item from the filtered array
      });
      setShip1([newUps,newUps1])
    }
    
    console.log(shippMethod);
    
    
  return (
    <div className='shippo_box'>
      {(loadingShip || loadingShip1) && <div className="lod"><Space >
      <Spin size="large">
      </Spin>
    </Space>  </div> } 
     
      {
        !porj  ? <>

        {(!loadingShip && !loadingShip1) && <div>

<div className="shippo">
  <div className="table">
    <div className="provider">
      <div> <p>Provider</p> </div>
      {
        shippMethod?.map((el: any, index: any) =>
       <div key={index} className="ShipMethods">   <p >{el.title}</p></div>
        )
      }
    </div>
    <div className="ShipMethods">
      <div>
        <div><span>Next day</span></div>
 
        <div>
          { loading ? <div><span>loading...</span></div>:<>
        {fedexing[0] !== undefined && fedexing[0].length>0 ? fedexing[0]?.map((el:any, index:number)=><p key={index} onClick={(e)=>addShip(e, el)}>    {el.ratedShipmentDetails[0].totalNetFedExCharge} {el.ratedShipmentDetails[0].currency}</p>):<span>{postser}</span> }
        </>}
        </div>
        <div>
          {loading2 ? <div><span>loading...</span></div>:<>
        { ship1[0].length>0 ? ship1[0]?.map((el:any, index:number)=><p key={index} onClick={(e)=>addShip(e, ship1[0])}>{el.amount} {el.currency}</p>):<span>{postser}</span> }
        </>}
        </div>
        <div>
        {loading2 ? <div><span>loading...</span></div>:<>
        { ship[0].length>0 ? ship[0]?.map((el:any, index:number)=><p key={index} onClick={(e)=>addShip(e, ship[0])}>{el.amount} {el.currency}</p>):<span>{postser}</span> }
        </>}
        </div>
     
    </div>
   
    </div>
    <div className="ShipMethods">
      <div>
        <div> <span>Standard</span></div>
       
        <div>
        {loading ? <div> <span>loading...</span> </div> :<>
      {fedexing[1] !== undefined && fedexing[1].length>0 ? fedexing[1]?.map((el:any, index:number)=><p key={index} onClick={(e)=>addShip(e, el)}>    {el.ratedShipmentDetails[0].totalNetFedExCharge} {el.ratedShipmentDetails[0].currency}</p>):<span>{postser}</span> }
      </> } </div>
      
        <div>{ loading2 ? <div><span>loading...</span></div>:<>
        { ship1[1].length>0 ? ship1[1]?.map((el:any, index:number)=><p key={index} onClick={(e)=>addShip(e, ship1[1])}>{el.amount} {el.currency}</p>):<span>{postser}</span> }
        </>}
        </div>
        <div>{ loading2 ? <div><span>loading...</span></div>:<>
        { ship[1].length>0 ? ship[1]?.map((el:any, index:number)=><p key={index} onClick={(e)=>addShip(e, ship[1])}>{el.amount} {el.currency}</p>):<span>{postser}</span> }
        </>}
        </div>
      

        
         </div>

    </div>
  </div>
</div>
<div className="shippo1">
  <button onClick={() => { goBack()}}> Go Back</button>

  

</div>


</div>}
            
            
          </> : 
          <>


          <div className='shippo_contents' onClick={e => e.stopPropagation()}>
            <div className='contain'>
              <span className='p1'><h1>ADD ORDERS INFORMATION</h1></span>
              <select name="shipMethod" className={pickUP ? "select" : "select1"} onChange={(e) => setPickUP(e.target.value)}>
                <option value="" selected disabled hidden>Choose shipping kind of</option>
                <option value="Shipp">Shipping</option>
                <option value="Pick Up">Pick Up</option>
              </select>
              <div className="orrder">

                {pickUP === "Shipp" && shippMethod?.map((el: any, index: any) => 

               
                    <div className="method" key={index}>
                      <img src={el.icon} alt="imagein" />
                    </div>
                  
                )}

              </div>
              {pickUP === "Pick Up" && <div className={" pickup"}>
                <h4>Pick UP</h4>
                {pickUP && <button onClick={() => { navigate('/pay') }}>Go Pay</button>}
                <div className="Rateadress">
                   <h1>Best Optic Lab. Inc</h1>
                      <p>820 Thompson Ave. Ste 30 Glendale. CA</p>

                      <p> Phone Number:+1 818-649-1799</p>
                 </div>


              </div>}
              {pickUP === "Shipp" && <form onSubmit={handleSubmit} className='shipform'>
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

                  <div >
                  </div>
                </div>
                <div className='registraciabutton'>
                  <button onClick={(e) => handleSubmit(e)}>Save</button>
                </div>
              </form>}
            </div>
          </div>
        </>
      

                   } </div>

  )
}

export default Shipment