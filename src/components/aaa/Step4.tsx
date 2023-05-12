import "./Aaa.scss";
import { Step5 } from "./Step5";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";
import { useEffect, useState } from "react";

export const Step4 = ({
  step4,
  step5,
  setStep4,
  setStep5,
  totals,
  setTotals,
  orders,
}: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const [input, setInput] = useState([0]);
  const [val, setVal] = useState(false);
  let arr1 = orders?.map((item: any) => item.table_name);
  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const headArr = removeDuplicates(arr1);
  const [fin, setFin] = useState("");

  // function addOrder1(id: number, table: string, col: string, e: any) {
  //   const newTotals = totals.filter((item: any) => item.columnName !== col);
  //   setTotals([
  //     ...newTotals,
  //     {
  //       id: id,
  //       tableName: table,
  //       columnName: col,
  //       value: e,
  //     },
  //   ]);
  // }

  let arrr: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[5]) {
      arrr.push(el);
    }
  });
  let arrr1: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[6]) {
      arrr1.push(el);
    }
  });
  let arrr2: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[7]) {
      arrr2.push(el);
    }
  });

  let arrr3: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[8]) {
      arrr3.push(el);
    }
  });
  let arrr4: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[9]) {
      arrr4.push(el);
    }
  });
  const [test, setTest] = useState(headArr[5]);
  const [test1, setTest1] = useState(headArr[6]);
  const [test2, setTest2] = useState(headArr[7]);
  const [test3, setTest3] = useState(headArr[8]);
  const [test4, setTest4] = useState(headArr[9]);
  console.log(headArr);

  function aaaa() {
    orders?.map((el: any) => {
      if (el.column_name === test) {
        setTotals([...totals, el]);
        console.log(totals);
      }
      if (el.column_name === test1) {
        setTotals([...totals, el]);
        console.log(totals);
      }
      if (el.column_name === test2) {
        setTotals([...totals, el]);
        console.log(totals);
      }
      if (el.column_name === test3) {
        setTotals([...totals, el]);
        console.log(totals);
      }
    });
  }

  function mapp() {
    totals.map((el: any) => {
      if (el.columnName === fin) {
        if (el.value == "") {
          setVal(false);
        } else if (el.value !== "" || el.value !== null) {
          setVal(true);
        }
      }
    });
  }
  useEffect(() => {
    mapp();
  }, [val, totals]);

  return (
    <>
      {step5 ? (
        <Step5
          step5={step5}
          setStep5={setStep5}
          totals={totals}
          setTotals={setTotals}
          orders={orders}
        />
      ) : (
        <div className="Step2">
          <div className="Aaa">
            <div>
              {
                <div>
                  <h2>{headArr[5]}</h2>
                  <div>
                    <select
                      onChange={(e) => {
                        setTest(e.target.value);
                        // setFin(e.target.value)
                      }}
                    >
                      <option value={headArr[5]}>{headArr[5]}</option>
                      {arrr.map((item: any, index: number) => (
                        <option value={item.column_name} key={item.id}>
                          {item.column_name}
                        </option>
                      ))}
                    </select>
                    {test !== headArr[5] && <h2>{headArr[6]}</h2>}
                    {test !== headArr[5] && (
                      <select
                        onChange={(e) => {
                          setTest1(e.target.value);
                          // setFin(e.target.value)
                        }}
                      >
                        <option value={headArr[6]}>{headArr[6]}</option>
                        {arrr1.map((item: any, index: number) => (
                          <option value={item.column_name} key={item.id}>
                            {item.column_name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              }
              {test1 !== headArr[6] && <h2>{headArr[7]}</h2>}
              {test1 !== headArr[6] && (
                <select
                  onChange={(e) => {
                    setTest2(e.target.value);
                    // setFin(e.target.value)
                  }}
                >
                  <option value={headArr[7]}>{headArr[7]}</option>
                  {arrr2.map((item: any, index: number) => (
                    <option value={item.column_name} key={item.id}>
                      {item.column_name}
                    </option>
                  ))}
                </select>
              )}

              {test2 !== headArr[7] && <h2>{headArr[8]}</h2>}
              {test2 !== headArr[7] && (
                <select
                  onChange={(e) => {
                    setTest3(e.target.value);
                    // setFin(e.target.value)
                  }}
                >
                  <option value={headArr[7]}>{headArr[7]}</option>
                  {arrr3.map((item: any, index: number) => (
                    <option value={item.column_name} key={item.id}>
                      {item.column_name}
                    </option>
                  ))}
                </select>
              )}
              {test3 !== headArr[8] && <h2>{headArr[9]}</h2>}
              {test3 !== headArr[8] && (
                <select
                  onChange={(e) => {
                    setTest3(e.target.value);
                    setFin(e.target.value);
                  }}
                >
                  <option value={headArr[3]}>{headArr[7]}</option>
                  {arrr4.map((item: any, index: number) => (
                    <option value={item.column_name} key={item.id}>
                      {item.column_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {fin && fin.length > 0 && (
              <button
                onClick={() => {
                  aaaa();
                  setStep5(true);
                }}
              >
                save
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
