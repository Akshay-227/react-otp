import React from 'react'
import { useState } from 'react'
import OtpInput from './OtpInput'

const PhoneOtpLogin = () => {
    const [phoneNumber, setPhoneNumber]=useState('')
    const [showOtpFeild, setShowOtpField]=useState(false)
    const handlePhoneNumber=(event)=>{
        setPhoneNumber(event.target.value)
    }
    const handlePhoneSubmit=(event)=>{
        event.preventDefault()
        //phone validation
        const regex=/[^0-9]/g;
        if(phoneNumber.length<10 || regex.test(phoneNumber)){
            alert('Invalid Phone Number')
        }

        //call BE API
        //show OTP field
        else{
            setShowOtpField(true)
        }
    }

    const onOtpSubmit=(otp)=>{
        console.log('login success', otp);
    }
  return (
    <div>
        {
            !showOtpFeild?<form action="" onSubmit={handlePhoneSubmit}>

            <input value={phoneNumber} type="text" placeholder='Enter Phone Number' name="" id="" onChange={(e)=>handlePhoneNumber(e)} />
            <button type='submit'>Submit</button>
        </form>:<div>
            <p>Enter OTP sent to your {phoneNumber}. </p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
        }
    </div>
  )
}

export default PhoneOtpLogin