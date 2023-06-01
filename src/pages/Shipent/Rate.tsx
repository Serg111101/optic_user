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
import { fetchFedexShip, fetchUspsShip } from "../../store/action/ShipAction";
import axios from "axios"
import Select from "react-select";

const Shipment = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { usps } = useAppSelector(state => state.usps)
  
  const { loading, fedex }: any = useAppSelector(state => state.fedex)
  const { create } = useAppSelector(state => state.create)
  const { uspsGet } = useAppSelector(state => state.uspsGet)
  const { fedexGet } = useAppSelector(state => state.fedexGet)
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
  const [postser, setPostse] = useState('service is not available');

  const [mass, setMass] = useState<any>(true)
  const [massin, setMassin] = useState<any>(true)
  const [shippMethod, setShippMethod] = useState<any>()
  const [ship, setShip] = useState<any>()
  const [ship1, setShip1] = useState<any>()
  const [pickUP, setPickUP] = useState<boolean>(false)
  const [porj, setPorj] = useState<boolean>(true)
  const [shipload, setShipload] = useState(true)

  useEffect(() => {

    dispatch(fetchUspsGet());
    dispatch(fetchFedexGet())
    name()
  }, [dispatch])

  useEffect(() => {
    setShip(usps)
    setShip1(usps)

    setShipload(false)
  }, [usps])

  useEffect(() => {
    setFedexing(fedex)
    setShipload(false)

  }, [fedex])

  useEffect(() => {
    setShip(uspsGet)
    setShip1(uspsGet)
    // setShipload(true)
  }, [uspsGet])

  useEffect(() => {
    setFedexing(fedexGet)
    // setShipload(true)
  }, [fedexGet])


 let sum:any = localStorage.getItem('price')
 const price = JSON.parse(sum)


  const headArr: any = [];

  if (fedexing?.length > 0) {
    headArr.push("Fedex")
  }
  if (ship?.length > 0) {
    const provider = ship.map((item: any) => {
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

  async function name() {
    const response = await axios.get('http://localhost:3000/api/v1/users/shipMethods');
    console.log(response.data);
    setShippMethod(response.data)

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPorj(false)
    if (pay?.length === 0 && !pickUP) {
      await dispatch(fetchFedex())
      await dispatch(fetchUsps(

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
    for (let i = 0; i < pay.length; i++) {

      if (pay[i] === "Ship in Fedex" && !pickUP) {
        await dispatch(fetchFedex())

      }
      if (pay[i] === "Ship in UPS" || pay[i] === "Ship in USPS" && !pickUP) {
        await dispatch(fetchUsps(

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

    }

    setPorj(false)
    if (pickUP) {
      navigate('/Pay')
    }
  }
  async function addShip(e: any, item: any) {
    e.preventDefault()
    console.log(item);

    // localStorage.removeItem('shipId')
    await dispatch(fetchCreate(item))

    if (item?.provider) {
      await dispatch(fetchUspsShip(item))


    } else {

      await dispatch(fetchFedexShip())


    }
    navigate('/Pay')
  }
  const [pay, setPay] = useState<any>([])

  async function addShiping(n: any) {

    if (pay.length === 0) {

      setPay([n])
    }
    pay.map((el: any, index: any) => {
      if (el === n) {
        pay.splice(index, 1)

        setPay(pay)
      } else {
        setPay([...pay, n])
      }
    })


  }


  return (
    <div className={'shippo_box'}>
      
      {
        !porj ? <>
          {shipload ? <div>Loading....</div> :
            <div>

              <div className="shippo">
                <div className="table">
                  <div className="provider">
                    <div>Provider</div>
                    {
                      headArr.map((el: any, index: any) =>
                        <div key={index} >{el}</div>
                      )
                    }
                  </div>
                  <div className="ShipMethods">
                    <div>
                    <div>Next day</div>
                      {fedexing?.length > 0 && fedexing.map((item: any, index: any) => {
                        if (item.serviceType == "STANDARD_OVERNIGHT") {
                          return <>{item.serviceType == "STANDARD_OVERNIGHT" ?
                            <p onClick={(e) => { addShip(e, item) }} key={index}>
                              {item.ratedShipmentDetails[0].totalNetFedExCharge} {item.ratedShipmentDetails[0].currency}
                            </p> : <p>{postser}</p>
                          } </>
                        }
                      })}</div>

                    <div>
                      {ship1?.length > 0 && ship1.map((item: any, index: any) => {

                        if (item.provider == "UPS") {
                          console.log(item.servicelevel.name);

                          if (item.servicelevel.name == "Next Day Air®") {

                            return <>{item.servicelevel.name == "Next Day Air®" ? <p
                              onClick={(e) => { addShip(e, item) }} key={index}>
                              {item.amount} {item.currency}
                            </p> : <p>{postser}
                            </p>}

                            </>
                          }
                        }
                      })}


                    </div>
                    <div>
                      {ship?.length > 0 && ship.map((item: any, index: any) => {
                        if (item.provider === "USPS") {
                          if (item.duration_terms == "Overnight delivery to most U.S. locations.") {
                            return <>{item.duration_terms == "Overnight delivery to most U.S. locations." ? <p
                              onClick={(e) => { addShip(e, item) }} key={index}>
                              {item.amount} {item.currency}
                            </p> : <p>{postser}</p>}</>

                          }
                        }

                      })}

                    </div>
                  </div>
                  <div className="ShipMethods">
                    <div>
                    <div>Standard</div>
                      {fedexing?.length > 0 && fedexing.map((item: any, index: any) => {
                        if (item.serviceType == "FEDEX_GROUND") {
                          return <>{item.serviceType == "FEDEX_GROUND" ?
                            <p onClick={(e) => { addShip(e, item) }} key={index}>
                              {item.ratedShipmentDetails[0].totalNetFedExCharge} {item.ratedShipmentDetails[0].currency}
                            </p> : <p>{postser}</p>
                          } </>
                        }
                      })}</div>

                    <div>
                      {ship?.length > 0 && ship.map((item: any, index: any) => {

                        if (item.provider === "UPS") {
                          if (item.servicelevel.name == "3 Day Select®") {

                            return <>{item.servicelevel.name == "3 Day Select®" ? <p
                              onClick={(e) => { addShip(e, item) }} key={index}>
                              {item.amount} {item.currency}
                            </p> : <p>{postser}</p>}</>
                          }
                        }
                      })}


                    </div>
                    <div>
                      {ship?.length > 0 && ship.map((item: any, index: any) => {
                        if (item.provider === "USPS") {

                          if (item.duration_terms == "Delivery in 2 to 5 days.") {
                            return <>{item.duration_terms == "Delivery in 2 to 5 days." ? <p
                              onClick={(e) => { addShip(e, item) }} key={index}>
                              {item.amount} {item.currency}
                            </p> : <p>{postser}</p>}</>

                          }
                        }

                      })}

                    </div>
                  </div>
                </div>

                {/* <table className="table">
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Next Day</th>
                      <th>Standart</th>
                    </tr>
                  </thead>
                  <tbody>{
                    headArr.map((el: any, index: any) => {
                      return <tr key={index}><th>{el}</th>
                        {fedexing?.length > 0 && fedexing.map((item: any, index: any) => {
                        {fedexing?.length > 0 && el == "Fedex" && fedexing.map((item: any, index: any) => {
                          if (el == "Fedex" && item.serviceType == "STANDARD_OVERNIGHT" ||  item.serviceType === "FEDEX_GROUND") {
                           if (item.serviceType == "STANDARD_OVERNIGHT" || item.serviceType == "FEDEX_GROUND") {
                             return <>{item.serviceType == "STANDAD_OVERNIGHT" ||  item.serviceType == "FEDEX_GROUND" ?
                          <th onClick={(e) => { addShip(e, item) }} key={index}>
                            {item.ratedShipmentDetails[0].totalNetFedExCharge} {item.ratedShipmentDetails[0].currency}
                          </th>: <th>dhs</th>
=======
                          </th>: <th>{postser}</th>
>>>>>>> origin/Hovo
                             } </>
                           }
                         }
                       })}
                        {ship?.length > 0 && ship.map((item: any, index: any) => {
                          if (item.provider == el && el == "USPS") {
                            if (item.duration_terms == "Delivery in 2 to 5 days." ||   item.duration_terms == "Overnight delivery to most U.S. locations.") {
                            return <>{item.duration_terms == "Delivery in 2 to 5 days." || item.duration_terms == "Overnight delivery to most U.S. locations."?<th
                          onClick={(e) => { addShip(e, item) }} key={index}>
                          {item.amount} {item.currency}
                        </th>:<th>{postser}</th>}</>
                           }
                         } else if (item.provider == el) {
=======
                         } else if (item.provider == el && el === "UPS") {
>>>>>>> origin/Hovo
                           if (item.servicelevel.name == "Next Day Air®" || item.servicelevel.name == '3 Day Select®') {
                             return <>{item.servicelevel.name == "Next Day Air®" || item.servicelevel.name == '3 Day Select®'?<th
                          onClick={(e) => { addShip(e, item) }} key={index}>
                          {item.amount} {item.currency}
                        </th>:<th>{postser}</th>}</>
                           }
                         }
                       })}

                      </tr>
                    })
                  }</tbody>
                </table> */}

              </div>
              <div className="shippo1">
                <button onClick={() => { setPorj(true) }}> Go Back</button>

              </div>


            </div>}</> : <>
          <div className='shippo_contents' onClick={e => e.stopPropagation()}>
            <div className='contain'>
              <span className='p1'><h1>ADD ORDERS INFORMATION</h1></span>
              <div className="orrder">
                {shippMethod?.map((el: any, index: any) => {


                  if (el.status === true && !pickUP) {
                    return <div className="method" key={index}>
                      <img src={el.icon} />
                      <label htmlFor="">{el.title}</label>
                      <input type="checkbox" onChange={(e) => { addShiping(el.title) }} />
                    </div>
                  }
                })}
                        
              </div>
              <div className={pickUP ? " pickup1" : "pickup"}>
                <label htmlFor="">Pick UP</label>
                <input type="checkbox" onChange={(e) => setPickUP(e.target.checked)} />
                {pickUP && <button onClick={()=>{navigate('/pay')}}>Go Pay</button>  }
                </div>
           {!pickUP &&   <form onSubmit={handleSubmit} className='shipform'>
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
      }

    </div>

  )
}

export default Shipment