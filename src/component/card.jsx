import React, { useEffect, useState } from "react";
import { RxCross2 } from 'react-icons/rx'
import Backdrop from '@mui/material/Backdrop';
import axios from "axios";




const Card =(props)=>{
    console.log("in card")
    const [val, setval ] = useState({}) 
    useEffect(()=>{
        console.log(props.value)
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${props.value}?format=json`).then((res)=>{
            console.log(res.data.Results[0]);
            setval(res.data.Results[0])
    }).catch((e)=>{
        console.log(e)
    })
    },[props.value])
    return(
        <>
        <div className="dialog">
            <div className="box">
                <div className="a5"><RxCross2/></div>
                <div className="c3 a4">{val?.Mfr_Name}</div>
                <div className="c3">{`${val?.PrincipalFirstName} (${val?.PrincipalPosition})`}</div>
                <div className="c3">{val?.Address}</div>
                <div className="c3">{val?.City}</div>
                </div>
        </div>
        </>
    )
}

export default Card