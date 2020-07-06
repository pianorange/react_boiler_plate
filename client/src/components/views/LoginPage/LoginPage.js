import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions'

function LoginPage(props) {
    const dispatch = useDispatch();

    //React hook 에서 state 사용시 useState

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const EmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const PasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        //submit버튼 기본동작 방지 안하면 page refreh됨
        event.preventDefault();

        console.log('Email', Email)
        console.log('Password',Password)

        let body = {
            email: Email,
            password: Password
        }

        //리덕스 안쓰면 아래처럼 바로 직접 설정해서 통신가능하지만 dispatch(action)하도록한다
        // Axios.post('/api/users/login', body)
        // .then(response => {

        // })

        //loginUser는_actions폴더에 임의로 만들어야함 
        dispatch(loginUser(body))
        .then (response =>{
            if(response.payload.loginSuccess) {
                props.history.push('/')
            } else{
                alert('Error');
            }
        })

        
    }

    return (
        <div style={{ 
            display:'flex', justifyContent:'center', alignItems:'center'
            , width: '100%',height: '100vh'  
            }}
         >
            <form style={{ display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={EmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={PasswordHandler} />
                <br />
                <button>
                    login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
