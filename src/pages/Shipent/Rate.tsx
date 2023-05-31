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
  console.log();
  
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
  const [mass, setMass] = useState<any>('')
  const [shippMethod, setShippMethod] = useState<any>()
  const [fedexs, setFedexs] = useState<any>({
    fedex: true,
    UPS: true
  })
  const [ship, setShip] = useState<any>()
  const [porj, setPorj] = useState<boolean>()

  useEffect(() => {

    dispatch(fetchUspsGet());
    dispatch(fetchFedexGet())
    name()
  }, [dispatch])

  useEffect(() => {
    setShip(usps)
  }, [usps])

  useEffect(() => {
    setFedexing(fedex)
  }, [fedex])

  useEffect(() => {
    setShip(uspsGet)
  }, [uspsGet])

  useEffect(() => {
    setFedexing(fedexGet)
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
    if (pay?.length === 0) {
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
      if (pay[i] === "Ship in Fedex") {
        await dispatch(fetchFedex())

      }
      if (pay[i] === "Ship in UPS"||pay[i] === "Ship in USPS") {
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
    console.log(n);

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
  console.log(ship);



  return (
    <div className={'shippo_box'}>
      {
        !porj ? <>
          {porj? <div>Loading....</div> :
            <div>

              <div className="shippo">


                <table className="table">
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
                        {fedexing?.length > 0 && el == "Fedex" && fedexing.map((item: any, index: any) => {
                          if (el == "Fedex" && item.serviceType == "STANDARD_OVERNIGHT" ||  item.serviceType === "FEDEX_GROUND") {
                           if (item.serviceType == "STANDARD_OVERNIGHT" || item.serviceType == "FEDEX_GROUND") {
                             return <>{item.serviceType == "STANDAD_OVERNIGHT" ||  item.serviceType == "FEDEX_GROUND" ?
                          <th onClick={(e) => { addShip(e, item) }} key={index}>
                            {item.ratedShipmentDetails[0].totalNetFedExCharge} {item.ratedShipmentDetails[0].currency}
                          </th>: <th>{postser}</th>
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
                         } else if (item.provider == el && el === "UPS") {
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
                </table>
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

                  if (el.status === true) {
                    return <div key={index} className="method">
                      <img src={el.icon} />
                      <label htmlFor="">{el.title}</label>
                      <input type="checkbox" onChange={(e) => { addShiping(el.title) }} />
                    </div>
                  }
                })}
           
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
              </form>
            </div>
          </div>
        </>
      }

    </div>

  )
}

export default Shipment