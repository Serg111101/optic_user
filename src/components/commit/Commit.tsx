import './Commit.scss'
import { useState } from 'react'
import axios from 'axios'

export const Commit = ({ setCommit }: any) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [erorrName, setErorrName] = useState(false)
    const [erorrEmail, setErorrEmail] = useState(false)
    const [erorrText, setErorrText] = useState(false)

const URL = process.env.REACT_APP_BASE_URL


    async function SendMessage() {
        if (name === '' || email === '' || text === '') {
            name === '' &&setErorrName(true);
            email === '' && setErorrEmail(true);
            text === '' && setErorrText(true)
        } else {
            const newMessage = {
                name: name,
                email: email,
                message: text
            }

            await axios.post(URL + 'api/v1/users/sendMessage', newMessage)
            setCommit(false)
            
        }
    }

    return (
        <div className='Commit-input' onClick={(e) => e.stopPropagation()}>
            <span>Name</span><div style={{background:erorrName ?'red':''}} className='inpcom1'><input type="text" placeholder='Name...' value={name} onChange={(e) =>{ setName(e.target.value);setErorrName(false)}} /></div>
            <span>Email</span><div style={{background:erorrEmail ?'red':''}} className='inpcom1'><input type="email" placeholder='Email...' value={email} onChange={(e) => {setEmail(e.target.value);setErorrEmail(false)}} /></div>
            <span>Text</span><div style={{background:erorrText ?'red':''}} className='inpcom1'><textarea placeholder='Text...' value={text} onChange={(e) => {setText(e.target.value);setErorrText(false)}}/></div>
            <div className="buttons">
                <div className="bbb">
                    <button className='save' onClick={() => SendMessage()}>Send to Commit</button>
                </div>
                <div className="bbb">
                    <button className='back' onClick={() => setCommit(false)}>Back</button>
                </div>
            </div>
        </div>
    )
}
