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
  let arrr5: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[10]) {
      arrr5.push(el);
    }
  });
  const [test, setTest] = useState(headArr[5]);
  const [test1, setTest1] = useState(headArr[6]);
  const [test2, setTest2] = useState(headArr[7]);
  const [test3, setTest3] = useState(headArr[8]);
  const [test4, setTest4] = useState(headArr[9]);
  const [test5, setTest5] = useState(headArr[10]);

  function aaaa1(testing: any) {
    orders?.map((el: any) => {
      if (el.column_name === testing) {
        setTotals([
          ...totals.filter((elem: any) => {
            if (elem.table_name !== el.table_name) {
              return el;
            }
          }),
          el,
        ]);
      }
    });
  }

 
 
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
                        aaaa1(e.target.value);
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
                          aaaa1(e.target.value);
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
                    aaaa1(e.target.value);
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
                    aaaa1(e.target.value);
                    setTest3(e.target.value);
                    // setFin(e.target.value)
                  }}
                >
                  <option value={headArr[8]}>{headArr[8]}</option>
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
                    aaaa1(e.target.value);
                    setTest4(e.target.value);
                  }}
                >
                  <option value={headArr[9]}>{headArr[9]}</option>
                  {arrr4.map((item: any, index: number) => (
                    <option value={item.column_name} key={item.id}>
                      {item.column_name}
                    </option>
                  ))}
                </select>
              )}

              {test4 !== headArr[9] && <h2>{headArr[10]}</h2>}
              {test4 !== headArr[9] && (
                <div>
                  <select
                    placeholder={headArr[10]}
                    onChange={(e) => {
                      aaaa1(e.target.value);
                      setTest5(e.target.value);
                      // setVersion(e.target.value);
                    }}
                  >
                    <option value={headArr[5]}>{headArr[10]}</option>
                    {arrr5.map((item: any, index: number) => (
                      <option value={item.column_name} key={item.id}>
                        {item.column_name}
                      </option>
                    ))}
                  </select>
                  {arrr5.map(
                    (el: any, i: number) =>
                      test5 == el.column_name && (
                        <img src={el.value} alt={el.column_name} key={el.id} />
                      )
                  )}
                </div>
              )}
            </div>
            {test5!== headArr[10] && (
              <button
                onClick={() => {
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
