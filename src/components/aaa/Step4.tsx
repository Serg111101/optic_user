import './Aaa.scss'
import { useState } from 'react';
import { Step5 } from './Step5';

export const Step4 = ({step4,step5,setStep4,setStep5}:any) => {
    const arr = ['aaa', 'bbb', 'ccc'];
    const aaa = ['aaa1', 'aaa2', 'aaa3', 'aaa4', 'aaa5'];
    const bbb = ['bbb1', 'bbb2', 'bbb3', 'bbb4', 'bbb5'];
    const ccc = ['ccc1', 'ccc2', 'ccc3', 'ccc4', 'ccc5'];

    const [test1, setTest1] = useState('');
    const [test2, setTest2] = useState('');
   
  return (<>
  {step5?<Step5  step5={step5} setStep5={setStep5} />:
    <div className='Step2'>
        <div className='Aaa'>
            <div className='testing'>
                <div className='test1'>
                    <label htmlFor="cars">Test 1</label>
                    <select name="cars" id="cars" onChange={(e) => setTest1(e.target.value)}>
                        <option value="test1" >Test1</option>
                        {arr.map(el =>
                            <option value={el}>{el}</option>
                        )}
                    </select>
                </div>
                {test1 === 'aaa' ?
                    <div className='test2'>
                        <label htmlFor="test2">Test 2</label>
                        <select name="" id="" onChange={(e) => setTest2(e.target.value)}>
                            <option value="test2">test2</option>
                            {aaa.map(el =>
                                <option value={el}>{el}</option>
                            )}
                        </select>
                    </div>
                    : test1 === 'bbb' ?
                        <div className='test2'>
                            <label htmlFor="test2">Test 2</label>
                            <select name="" id="" onChange={(e) => setTest2(e.target.value)}>
                                <option value="test2">test2</option>
                                {bbb.map(el =>
                                    <option value={el}>{el}</option>
                                )}
                            </select>
                        </div> : test1 === 'ccc' && <div className='test2'>
                            <label htmlFor="test2">Test 2</label>
                            <select name="" id="" onChange={(e) => setTest2(e.target.value)}>
                                <option value="test2">test2</option>
                                {ccc.map(el =>
                                    <option value={el}>{el}</option>
                                    )}
                            </select>
                        </div>
                }
                {test1!==''&&test1!=='test1' && test2!=='' && test2!=='test2' && <button onClick={()=>setStep5(true)}>save</button> }
            </div>
            <div className="img">
                {
                    test1 === 'aaa' ?
                    <div>
                        <img src="../../../../image/photo1.png" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod fugiat eius hic veniam totam quibusdam laborum necessitatibus qui, quisquam quaerat quo recusandae earum repellat laudantium eum neque corrupti voluptate!
                        Nostrum voluptates, odio minima quae voluptatibus cupiditate maxime? Sint dolorem quisquam accusamus ut quia in dolore, suscipit consequuntur soluta asperiores quidem aspernatur facere dolor error odio dicta odit molestias necessitatibus.00</p>
                    </div>:
                    test1==='bbb'?
                    <div>
                        <img src="../../../../image/photo2.png" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quam aliquam, soluta magnam nostrum corporis est minus laborum provident placeat quasi obcaecati. Beatae officiis, modi, dolores exercitationem dignissimos consequatur voluptates fugit fuga nesciunt nemo, asperiores facere iure nam. A nam, voluptatum reiciendis iusto, modi eum asperiores commodi porro odio, accusantium quisquam facere? Dolor, maiores fuga deleniti nam dolorem deserunt sequi a enim repellendus officia adipisci mollitia aliquam asperiores excepturi velit ut nemo iste hic provident ipsam. Itaque quaerat, voluptatem similique, odio sint vitae fugit mollitia laborum aspernatur sapiente quia asperiores dolores perferendis tempore quas recusandae veritatis! Mollitia animi delectus ullam eveniet ratione iusto reprehenderit molestias numquam placeat explicabo, sequi nemo accusantium perferendis dicta, soluta in molestiae similique vel, voluptates obcaecati odio eum illo. Soluta eum possimus ex, corporis accusantium aliquam consequuntur fugit explicabo voluptate veritatis aut, earum ducimus corrupti? Nemo ad eveniet odio, sunt officia libero eum quis ipsa qui reprehenderit quidem dignissimos quos molestias quaerat debitis reiciendis ratione perferendis sit? Consectetur qui accusantium ullam rem, nam dignissimos iusto, suscipit reprehenderit doloremque vitae odit quaerat voluptate minus nobis earum recusandae!
                        </p>
                    </div>:
                    test1==='ccc'&&
                    <div>
                        <img src="../../../../image/photo3.png" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi unde animi earum dicta, doloribus dolores repudiandae aperiam veniam est voluptatibus at assumenda magni expedita nesciunt eos hic magnam distinctio architecto quae corrupti blanditiis impedit. Sit dolor numquam qui itaque similique sequi tempore voluptatem at cupiditate. Deleniti, ut? Temporibus explicabo architecto placeat quis facere et, iure qui eligendi in veniam nulla quidem ipsa, cumque necessitatibus nobis cupiditate saepe! Rerum, inventore ratione saepe illum, ut similique, consequatur eveniet sit maxime officia tempore. Repellendus molestias a repudiandae temporibus sequi tempore harum ullam eligendi blanditiis fugit quidem quae odit, eum quasi! Commodi facilis id totam veniam, suscipit sunt temporibus exercitationem laboriosam, tempora repellat facere? Est tempora at iusto expedita alias modi, consectetur eveniet voluptatibus velit accusantium odio, esse obcaecati veniam! Voluptatem voluptas ipsum, neque magni quasi veniam, iusto perferendis fugit dicta possimus aliquid exercitationem earum quo qui? Ipsum quibusdam quod inventore voluptatum pariatur nemo.
                        </p>
                    </div>
                }
            </div>
        </div>
    </div>}
    </>
  )
}

