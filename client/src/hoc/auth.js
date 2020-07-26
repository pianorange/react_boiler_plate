import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions'


export default function (SpecificComponent, option, adminRoute = null) {

    //null => 아무나 출입 가능한 페이지
    //true => 로그인한 유저만 출입 가능 페이지
    //false => 로그인한 유저는 출입 불가능 페이지

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            //기능추가순서
            //action을 user_actions에 정의하고
            //types에 action명 정의하고
            //user_reducer에 리듀서 추가하고 
            dispatch(auth()).then(response => {
                console.log(response);

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    //로그인 한 사람만 들어가야 되는 페이지면 
                    //로그인페이지로 전이시킨다
                    if(option === true) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    //admin이 아닐 때 기본 페이지로 보내줌
                    if(adminRoute && !payload.isAdmin) {
                        props.history.push('/')

                    } else {
                        //option 이 false 일때 (로그인 유저는 못가는 페이지 일때)
                        //기본페이지로 보내줌
                        //ex) 로그인한 유저가 유저등록 페이지로 간다던가
                        //로그인한 유저가 다시 로그인페이지로 전이시도 
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }


    return AuthenticationCheck
}