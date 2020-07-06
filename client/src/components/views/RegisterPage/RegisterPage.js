import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions'

function RegisterPage(props) {

    const dispatch = useDispatch();

    //React hook 에서 state 사용시 useState

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const EmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const PasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const NameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const ConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        //submit버튼 기본동작 방지 안하면 page refreh됨
        event.preventDefault();

        console.log('Email', Email)
        console.log('Password',Password)

        if(Password !== ConfirmPassword) {
            return alert('Password not match');
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        //loginUser는_actions폴더에 임의로 만들어야함 
        dispatch(registerUser(body))
        .then (response =>{
            if(response.payload.success) {
                
                props.history.push('/login')
            } else{
                alert('Faild to sign up');
            }
        })
    }

    return (
        <div style={{ 
            display:'flex', justifyContent:'center', alignItems:'center'
            , width: '100%',height: '100vh'  
            }}
         >
             {console.log(this.props)}
             {console.log(this.props.history)}
             
             {console.log(this.props.location)}
            <form style={{ display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={EmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={NameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={PasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={ConfirmPasswordHandler} />
                <br />
                <button>
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
