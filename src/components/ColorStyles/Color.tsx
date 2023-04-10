import React from 'react' 
import "./Color.scss"
  export function Color() { 
    const colorArray = [ 
     '/image/color1.png', 
     '/image/color2.png', 
     '/image/color3.png', 
     '/image/color4.png', 
     '/image/color5.png', 
     '/image/color6.png', 
     '/image/color7.png', 
     '/image/color8.png', 
     '/image/color9.png', 
   ]; 
   
    return ( 
     <div className='color'> 
   
       <div className='line_div1'> 
         <div className='line1'></div> 
         <p>Mirror Colors</p> 
         <div className='line1'></div> 
       </div> 
       <div  className='gridContainer' > 
           {colorArray.map((_, index) => ( 
             <div 
               key={index} 
               className='gridik'
             > <img src={colorArray[index]} /> </div> 
           ))} 
         </div> 
            <ul className='liText' >
              <li>
              Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.  
              </li>
            </ul>
         
  </div> 
    ); 
 } 