import "./Lens.scss"


export default function Lens() {
  return (
    <div className="lens">
      <div className="line_div">
        <div className="line"></div>
        <p>Mirror Coating</p>
        <div className="line"></div>
      </div>

      <div className="contaDiv">
        <p className="titleP">Mirror Coating</p>

        <p className="texta">
          Best Optic Lab mirror colors are available in 9 eye-catching and
          attractive color in both solid and flash densities. Solid mirror
          coatings have a higher percentage of luminous reflectance than their
          corresponding flash mirror colors. The flash mirror generally has a
          hind of the color whereas a solid mirror shows a higher concentration
          of the color.
        </p>

        <p className="titleP">Available Mirror Colors</p>
        <p className="texta">
          Black, Blue, Cobalt, Green, Gold, Orange, Pink, Red, Silver
        </p>

        <div className="butt" >
        <button className="submit" > SHOW COLOR GUIDE</button>
        </div>
      </div>

      <div className="lens">
        <div className="line_div">
          <div className="line"></div>
          <p>Anti-Reflective Coating</p>

          <div className="line"></div>
        </div>

        <div className="classBottom">
          <div className="divImage1">
            <img
              src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/86726ad0-7ec4-4528-9948-d41f887d1e57.jpg/:/rs=w:400,cg:true,m"
              alt="Image"
            />
          </div>

          <div className="Lens_textaBottom">
            <p className="textaBottomTitle">AR Coating common features:</p>

            <p className="textaM">
              Maximum light transmission for enhanced visual acuity increased
              durability, impact resistance and scratch protection. Glare-free
              vision for enhanced visual comfort and reduced eye strain. Super
              oleophobic properties help repel oils, fingerprints and smudges.
              Advance hydrophobic properties prevent against moisture and water.
              Anti-static properties help keep away dust and dirt so the lenses
              stay cleaner longer. Provides better cosmetic appearance and
              patient satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}