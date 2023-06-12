import "./Aaa.scss";
import { useEffect, useState } from "react";
import { Step4 } from "./Step4";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";

export const Step3 = ({
  headArr,
  stepArr,
  setStepArr,
  step3,
  step4,
  step5,
  final,
  setStep3,
  setStep4,
  setStep5,
  setFinal,
  totals,
  setTotals,
  orders,
}: any) => {
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [check, setCheck] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [check3, setCheck3] = useState(false)
  const [check4, setCheck4] = useState(false)
  const [check5, setCheck5] = useState(false)


  function navv() {
    if (step4 == false) {
      sessionStorage.removeItem("setp4");
      sessionStorage.setItem("step4", "true");
      const stepp4: any = sessionStorage.getItem("step4");
      step4 = JSON.parse(stepp4);
      setStep4(step4)
    }
  }
  function navving() {
    if (step3 == true) {
      sessionStorage.removeItem("setp3");
      sessionStorage.setItem("step3", "false");
      const stepp3: any = sessionStorage.getItem("step3");
      step3 = JSON.parse(stepp3);
      setStep3(step3)
    }
  }
  let arr: any = sessionStorage.getItem('orders')
  useEffect(() => {
    if (arr !== null && arr !== '[]' && stepArr === null) {
      setStepArr(JSON.parse(arr))
    }
  }, [stepArr, arr])

  function ChangeItem(tableName: string) {
    const newArr: any = stepArr?.map((el: any) => {
      if (el.table_name === tableName) {
        el.is_active = !el.is_active
        setCheck5(!el?.is_active)
      }
      return el
    })
    sessionStorage.setItem('orders', JSON.stringify(newArr))
    setStepArr(null)

  }
  function ChangeItem2(tableName: string, columnName: string) {

    const newArr: any = stepArr?.map((el: any) => {
      if (el.table_name === tableName) {
        if (el.column_name === columnName) {
          el.is_active = true
        } else {
          el.is_active = false
        }
      }
      return el
    })
    sessionStorage.setItem('orders', JSON.stringify(newArr))
    setStepArr(null)

  }
  function checkFilter(tableName: string, set: any) {
    for (let i = 0; i < stepArr?.length; i++) {
      if (stepArr[i].table_name === tableName) {
        if (stepArr[i].is_active === true) {
          set(true)
          break

        } else {
          set(false)

        }
      }
    }
  }
  function Checking(checkd: boolean, setCheckd: (a: boolean) => void, tableName: string,setValuex:(a:string)=>void) {
    if (checkd === true) {
      const newArr: any = stepArr?.map((el: any) => {
        if (el.table_name === tableName) {
          el.is_active = false

        }
        return el
      })
      sessionStorage.setItem('orders', JSON.stringify(newArr))
      setStepArr(null)
      setValuex('')
      setCheckd(false)
    } else {
      setCheckd(true)
    }
  }

  return (
    <div>
      {step4 ? (
        <Step4
          headArr={headArr}
          stepArr={stepArr}
          setStepArr={setStepArr}
          step4={step4}
          step5={step5}
          final={final}
          setStep4={setStep4}
          setStep5={setStep5}
          setFinal={setFinal}
          totals={totals}
          setTotals={setTotals}
          orders={orders}
        />
      ) : (
        <div className="step3">
          <div className="step3_option">
            <div className="step3_optionDiv1">
              <div className="step3_option_item_1">
                <input type="checkbox" checked={check} value={headArr[5]} id={headArr[5]} onChange={() => { Checking(check, setCheck, headArr[5],setValue) }} />
                <label htmlFor={headArr[5]}>
                  <h3>{headArr[5]}</h3>
                  <span></span>
                </label>
              </div>
              <div className="step3_option_item_2">
                <select disabled={!check} onChange={(e) => { setValue(e.target.value); ChangeItem2(headArr[5], e.target.value) }} value={value} >
                  {!value && <option >!!!!!!!!!!!!!!!!!!!</option>}

                  {stepArr?.map((item: any, index: number) => {
                    if (item?.table_name === headArr[5]) {
                      // if(item.is_active){func(item.table_name,setCheck)}
                      if (item.is_active && value === '') {
                        setValue(item.column_name)
                        checkFilter(item.table_name, setCheck)
                      }
                      return (<option value={item.column_name} key={item.id}>
                        {item.column_name}
                      </option>)
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="step3_optionDiv2">
              <div className="step3_option_item_1">
                <input type="checkbox" checked={check2} value={headArr[6]} id={headArr[6]} onChange={() => { Checking(check2, setCheck2, headArr[6],setValue1) }} />
                <label htmlFor={headArr[6]}>
                  <h3>{headArr[6]}</h3>
                  <span></span>
                </label>
              </div>
              <div className="step3_option_item_2">
                <select disabled={!check2} onChange={(e) => { setValue1(e.target.value); ChangeItem2(headArr[6], e.target.value) }} value={value1} >
                  {!value1 && <option >!!!!!!!!!!!!!!!!!!!</option>}

                  {stepArr?.map((item: any) => {
                    if (item?.table_name === headArr[6]) {
                      if (item.is_active && value1 === '') {
                        setValue1(item?.column_name)
                        checkFilter(item.table_name, setCheck2)

                      }
                      return (<option value={item.column_name} key={item.id}>
                        {item.column_name}
                      </option>)
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="step3_optionDiv3">
              <div className="step3_option_item_1">
                <input checked={check3} type="checkbox" value={headArr[7]} id={headArr[7]} onChange={() => { Checking(check3, setCheck3, headArr[7],setValue2) }} />
                <label htmlFor={headArr[7]}>
                  <h3>{headArr[7]}</h3>
                  <span></span>
                </label>
              </div>
              <div className="step3_option_item_2">
                <select disabled={!check3} onChange={(e) => { setValue2(e.target.value); ChangeItem2(headArr[7], e.target.value) }} value={value2} >
                  {!value2 && <option >!!!!!!!!!!!!!!!!!!!</option>}

                  {stepArr?.map((item: any) => {
                    if (item?.table_name === headArr[7]) {
                      if (item.is_active && value2 === '') {
                        setValue2(item?.column_name)
                        checkFilter(item.table_name, setCheck3)

                      }
                      return (<option value={item.column_name} key={item.id}>
                        {item.column_name}
                      </option>)
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="step3_optionDiv4">
              <div className="step3_option_item_1">
                <input type="checkbox" checked={check4} value={headArr[8]} id={headArr[8]} onChange={() => { Checking(check4, setCheck4, headArr[8],setValue3) }} />
                <label htmlFor={headArr[8]}>
                  <h3>{headArr[8]}</h3>
                  <span></span>
                </label>
              </div>
              <div className="step3_option_item_2">
                <select disabled={!check4} onChange={(e) => { setValue3(e.target.value); ChangeItem2(headArr[8], e.target.value) }} value={value3} >
                  {!value3 && <option >!!!!!!!!!!!!!!!!!!!</option>}

                  {stepArr?.map((item: any) => {
                    if (item?.table_name === headArr[8]) {
                      if (item.is_active && value3 === '') {
                        setValue3(item?.column_name)
                        checkFilter(item.table_name, setCheck4)

                      }
                      return (<option value={item.column_name} key={item.id}>
                        {item.column_name}
                      </option>)
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="step3_optionDiv5">
              <div className="step3_option_item_1">
                <input checked={check5} type="checkbox" value={headArr[9]} id={headArr[9]} onClick={() => ChangeItem(headArr[9])} />
                <label htmlFor={headArr[9]}>
                  <h3>{headArr[9]}</h3>
                  <span></span>
                </label>
              </div>
              {
                stepArr?.map((el: any) => {
                  if (el.table_name === headArr[9]) {
                    // setCheck5(el.is_active)
                    if (el.is_active === true && check5 === false) { setCheck5(true) }
                    if (el.is_active === false && check5 === true) { setCheck5(false) }
                    return <div >
                      {el.is_active === true && <p>{el.column_name}</p>}
                    </div>
                  }
                })
              }
            </div>
            <div className="step3_buttons">
              <button onClick={() => { navving() }}>Go back</button>
              <button onClick={() => { navv() }}>Next</button>
            </div>
          </div>
          <div className="step3_image">
            <img src="./images/1.webp" alt="" />
          </div>
        </div>
      )}

    </div>
  );
};
