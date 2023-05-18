import React, { useEffect, useState } from 'react'
import "./OrderingInformation.scss"
import { useNavigate } from 'react-router-dom'
import { Aaa } from '../../components/aaa/Aaa'
// import axios from 'axios'
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

 export const OrderingInformation = () => {


  const [step2,setStep2]=useState(false);
  const [step3,setStep3]=useState(false);
  const [step4,setStep4]=useState(false);
  const [step5,setStep5]=useState(false);
  const { orders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  console.log(orders);
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <div className='Order'>
      <div className='step'>
        <div className='step1 ak'><hr />
        <div className="klor">1</div>
        </div>
        <div className={step2?'step2 ak':'step2'}><hr />
        <div className="klor">2</div>
        </div>
        <div className={step3?'step3 ak':'step3'}><hr />
        <div className="klor">3</div>
        </div>
        <div className={step4?'step4 ak':'step4'}><hr />
        <div className="klor">4</div>
        </div>
        <div className={step5?'step5 ak':'step5'}><hr />
        <div className="klor">5</div>
        </div>
      </div>
      <Aaa step2={step2} step3={step3} step4={step4} step5={step5} setStep2={setStep2} setStep3={setStep3} setStep4={setStep4} setStep5={setStep5} />
    </div>
  )
}
    //     <div className='OrderingInformation'>
    //     <div  className='Order'>
    //       <div className="head">
    //         <img src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95" alt="logo" />
    //         <p>
    //           820 Thompson Ave. Ste. 30 Glendale. CA 91201
    //           Tel: 818-649-1799
    //           Email: info@BestOpUcLab.com
    //         </p>
    //         <a href="https://bestopticlab.com/" target='_blank' >www.BestOpticLab.com</a>
    //       </div>
    //       <div className='invoices'>
    //         <div className='inv-box'>
    //           <div className='invoice'>
    //             <h2>INVOICE</h2>
    //           </div>
    //           <form>
    //             <label htmlFor="Company name">Company name</label>
    //             <input type="text" required minLength={2} maxLength={30} onChange={(e:any)=>order.compnyName=e.target.value} />
    //             <label htmlFor="Address">Address</label>
    //             <input type="text" minLength={5} maxLength={30} onChange={(e:any)=>order.addres=e.target.value} />
    //             <label htmlFor="Phone">Phone</label>
    //             <input type="text" minLength={5} maxLength={30} onChange={(e:any)=>order.phone=e.target.value} />
    //             <label htmlFor="Optician name">Optician name</label>
    //             <input type="text" minLength={2} maxLength={30} onChange={(e:any)=>order.opticianName=e.target.value}/>
    //             <hr />
    //             <label htmlFor="Patient name">Patient name</label>
    //             <input type="text" minLength={2} maxLength={30}  onChange={(e:any)=>order.patientName=e.target.value}/>
    //           </form>
    //         </div>
    //         <div className='inv-box1'>
    //           <div className='invoice1'>
    //             <h2>FRAME ENCLOSED</h2>
    //           </div>
    //           <h3>MARK ALL THAT APPLAY</h3>
    //           <div className='checked'>
    //             <form className='sec1'>
    //               <div>
    //                 <input type="checkbox" checked={frame.newFrame} onChange={()=> 
    //                 setFrame({ 
    //                   newFrame : !frame.newFrame,
    //                   OLDFRAME: frame.OLDFRAME,
    //                   SIZER:frame.SIZER,
    //                   DEMOS:frame.DEMOS,
    //                   PATIENTSCLIP:frame.PATIENTSCLIP,
    //                   DRILLMOUNTADD:frame.DRILLMOUNTADD,

    //                 })}/>
    //                 <label htmlFor="">NEW FRAME</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" checked={frame.OLDFRAME} onChange={()=> 
    //                 setFrame({ 
    //                   newFrame : frame.newFrame,
    //                   OLDFRAME:!frame.OLDFRAME,
    //                   SIZER:frame.SIZER,
    //                   DEMOS:frame.DEMOS,
    //                   PATIENTSCLIP:frame.PATIENTSCLIP,
    //                   DRILLMOUNTADD:frame.DRILLMOUNTADD,

    //                 })} />
    //                 <label htmlFor="">OLDFRAME</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" 
    //                 checked={frame.SIZER} onChange={()=> 
    //                   setFrame({ 
    //                     newFrame : frame.newFrame,
    //                     OLDFRAME: frame.OLDFRAME,
    //                     SIZER:!frame.SIZER,
    //                     DEMOS:frame.DEMOS,
    //                     PATIENTSCLIP:frame.PATIENTSCLIP,
    //                     DRILLMOUNTADD:frame.DRILLMOUNTADD,

    //                   })} />
    //                 <label htmlFor="">SIZER</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" checked={frame.DEMOS} onChange={()=> 
    //                 setFrame({ 
    //                   newFrame : frame.newFrame,
    //                   OLDFRAME:frame.OLDFRAME,
    //                   SIZER:frame.SIZER,
    //                   DEMOS: !frame.DEMOS,
    //                   PATIENTSCLIP:frame.PATIENTSCLIP,
    //                     DRILLMOUNTADD:frame.DRILLMOUNTADD,

    //                 })} />
    //                 <label htmlFor="">DEMOS</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" checked={frame.PATIENTSCLIP} onChange={()=> 
    //                 setFrame({ 
    //                   newFrame : frame.newFrame,
    //                   OLDFRAME:frame.OLDFRAME,
    //                   SIZER:frame.SIZER,
    //                   DEMOS: frame.DEMOS,
    //                   PATIENTSCLIP:!frame.PATIENTSCLIP,
    //                   DRILLMOUNTADD:frame.DRILLMOUNTADD,

    //                 })} />
    //                 <label htmlFor=""> PATIENTSCLIP</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" checked={frame.DRILLMOUNTADD} onChange={()=> 
    //                 setFrame({ 
    //                   newFrame : frame.newFrame,
    //                   OLDFRAME:frame.OLDFRAME,
    //                   SIZER:frame.SIZER,
    //                   DEMOS: frame.DEMOS,
    //                   PATIENTSCLIP:frame.PATIENTSCLIP,
    //                   DRILLMOUNTADD:!frame.DRILLMOUNTADD

    //                 })}  />
    //                 <label htmlFor="">DRILL MOUNT ADD $</label>
    //               </div>
    //             </form>
    //             <form className='sec1'>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">METAL</label>
    //               </div>

    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">PLASTIC</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SEMI RIMLESS</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">ONOLENSES</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">NEW Rx</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">DOLD Rx</label>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='frames'>
    //         <div className='fram-box'>
    //           <div className='frame'>
    //             <h2>FRAME INFORMATION</h2>
    //           </div>
    //           <form>
    //             <label htmlFor="Address">FRAME FMG</label>
    //             <input type="text" />
    //             <label htmlFor="Phone">Model</label>
    //             <input type="text" />
    //             <label htmlFor="Phone">Frame #</label>
    //             <input type="text" />
    //             <label htmlFor="Phone">eye size</label>
    //             <input type="text" />
    //             <label htmlFor="Phone">Dbl</label>
    //             <input type="text" />
    //           </form>
    //         </div>
    //         <div className='fram-box1'>
    //           <div className='frame1'>
    //             <h2>CLIP-ON COLOR</h2>
    //           </div>
    //           <div className='checked'>
    //             <form>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SHINY GOLD</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATTE GOLD</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">ANTIQUE GOLD</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SHINY SILVER</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATTE SILVER</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">PEWTER</label>
    //               </div>
    //             </form>
    //             <form>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SHINY BLACK</label>
    //               </div>

    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATTE BLACK</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SHINY COPPER</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATTE COPPER</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SHINY BROWN</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATTE BROWN</label>
    //               </div>
    //             </form>
    //           </div>
    //           <hr></hr>
    //           <div className='framecolor'>
    //             <div>
    //               <label htmlFor="">MATCH ENCLOSED FRAME COLOR</label>
    //               <input type="checkbox" />
    //             </div>
    //             <div>
    //               <label htmlFor="">SPECIFIC COLOR ON FRAME</label>
    //               <input type="text" />
    //             </div>
    //             <div>
    //               <label htmlFor="">TORTOISE & MULTICOLOR FINISH ADD $</label>
    //               <input type="text" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='lens'>
    //         <div className='lens-box'>
    //           <div className='len'>
    //             <h2>LENS FINISH</h2>
    //           </div>
    //           <div className='lensis'>
    //             <form>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor=""> GRAY</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">G-15</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">BROWN</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">GREEN</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">BLUE</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATCH SAMPLE</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">GRADIENTTINT / ADDS10</label>
    //               </div>
    //               <h2>POLARZED/ADD $</h2>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">GRAY</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">G-150 </label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">BROWN</label>
    //               </div>
    //             </form>

    //             <form>
    //               <h2>MIRROR DENSITY</h2>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor=""> FLASH</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">DARK</label>
    //               </div>
    //               <div className='line'>

    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">BACKSIDE AR/ADD $</label>
    //               </div>
    //               <p>PLEASE ALLOW ADDITIONAL TIME</p> 
    //             </form>
    //             <form >
    //               <h2>MIROR COLOR</h2>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">GOLD</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">PINK</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">COBALT</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SILVER</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">BLUE</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">ORANGE</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">RED</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">GREEN</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">BLACK</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MIRROR/ADD - $</label>
    //               </div>
    //             </form>


    //           </div>

    //         </div>

    //       </div>
    //       <div className='clip'>
    //         <div className='clip-box'>
    //           <div className='clipe'>
    //             <h2>clip style</h2>
    //           </div>
    //           <form>
    //             <div>
    //             <input type="checkbox" />
    //             <img src="../../../../image/photo1.png" alt="" />
    //             </div>
    //             <div>
    //             <input type="checkbox" />
    //             <img src="../../../../image/photo2.png" alt="" />
    //             </div>
    //             <div>
    //             <input type="checkbox" />
    //             <img src="../../../../image/photo3.png" alt="" />
    //             </div>
    //           </form>
    //           <h4>FOR ALL ORDERS ALL SALES ARE FINAL</h4>
    // <p>ONEYEARMANUFACTURER DEFECT WARRANTY ONTHEMETAL (LENSESNOT WARRANTED)
    // </p>
    //         </div>
    //         <div className='clip-box1'>
    //           <div className='clipe1'>
    //             <h2>special instruction</h2>
    //           </div>
    //           <div className='checked'>
    //             <form>

    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">A.S.A.P    ADD$</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">SUPER RUSH ADD$</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">MATTE FINISH PLASTIC FRAME $</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">POLITIC FINISH PLASTIC FRAME $</label>
    //               </div>
    //               <div>
    //                 <input type="checkbox" />
    //                 <label htmlFor="">NOSTE PADS PLASTIC FRAME</label>
    //               </div>
    //             </form>

    //           </div>


    //         </div>
    //       </div>
    //       <div className='office'>
    //         <div className='office-box'>
    //           <div className='off'>
    //             <h2>LENS FINISH</h2>
    //           </div>
    //           <div className='offic'>
    //             <form>
    //               <div>
    //                 <label htmlFor="">CLIP</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">LENSES</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">MR/ AR</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">NOSE PADS </label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">MATTE FRAME</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">POLISH FRAME</label>
    //                 <input type="text" />
    //               </div>

    //             </form>

    //             <form>

    //               <div>
    //                 <label htmlFor="">REPLATING</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">A.S.A.P</label>
    //                 <input type="text" />
    //               </div>

    //               <div>
    //                 <label htmlFor="">SUPER RUSH</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">SHIPING</label>
    //                 <input type="text" />
    //               </div>
    //               <div>
    //                 <label htmlFor="">TAX</label>
    //                 <input type="text" />
    //               </div>
    //             </form>



    //           </div>

    //         </div>

  