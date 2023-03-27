import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import "../component/ui.css"
import axios from "axios";
import Card from "./card";
import { Backdrop } from "@mui/material";




const Homepage = () =>{
     const [data, setData] = useState([])
     const [open, setOpen] = useState(false)
     const [refresh, setGresh] = useState(false)
     const [value, setValue] = useState({})
     const [name, setName] = useState("")
     const handleClose = ()=>{
        setOpen(!open)
     }

    useEffect(()=>{
           axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=1").then((res)=>{
            console.log(res.data.Results)
            setData(res.data.Results)
           }).catch((e)=>{
            console.log(e)
           })
    },[refresh])

    const handleclick = (b) =>{
        setValue(b)
        // setName(data[a].Mfr_Name)
        setOpen(true)

    }

    const handleSearch =(val)=>{
      
       if(val == ""){
        setGresh(!refresh)
       }
       const find = data.filter(pro=>(pro.Mfr_Name.toLowerCase().includes(val.toLowerCase())))

       setData(find)

    }
    
    
    return (
        <div className="main">
           
            <div className="head">
                VEHICLE MANUFACTURERS
            </div>
            <div className="features">
                <div className="container">
                    <label htmlFor="search">Search :</label>
                    <input className="search" type="search" name="search" id="search" onChange={(e)=>{
                        handleSearch(e.target.value)
                    }}/>
                </div>
                <div className="container">
                    <label htmlFor="search">Filter by Vehicle Type</label>
                    <select name="vehicles" id="vehicles" >
                        <option value="1">ALL</option>
                        <option value="2">Passenger Car</option>
                        <option value="3">Truck</option>
                        <option value="4">Multipurpose Passenger Vehicle</option>
                        <option value="5">Motorcycle</option>
                        <option value="6">Trailor</option>
                        <option value="6">Low Speed vehicle</option>
                        <option value="7">Off Road Vehicle</option>
                        <option value="8">Bus</option>
                        <option value="9">Incomplete Vehicle</option>
                    </select>
                </div>
            </div>

            <div className="body">
                <div className="body-head" >
                    <div className="a1">Name</div>
                    <div className="a2">Country</div>
                    <div className="a3">Type</div>
                </div>
                <div className="table">
                {
                    data.map((data, index)=>{
                        if(index%2 == 0){
                            return <div style={{cursor:"pointer"}} onClick={()=>{handleclick(data?.Mfr_CommonName)}} className="body-content c1">
                            <div className="a1" >{data?.Mfr_Name}</div>
                            <div className="a2">{data?.Country}</div>
                            <div className="a3">{data?.VehicleTypes[0]?.Name}</div>
                            </div>
                        }else{
                            return <div style={{cursor:"pointer"}} onClick={()=>{handleclick(data?.Mfr_CommonName)}} className="body-content c2">
                            <div className="a1">{data?.Mfr_Name}</div>
                            <div className="a2">{data?.Country}</div>
                            <div className="a3">{data?.VehicleTypes[0]?.Name}</div>
                            </div>
                        }
                    })
                }
                </div>
                
                
            </div>
            <Backdrop open={open} onClick={handleClose}><Card className="card" value={value}/></Backdrop>
            
        </div>
    )
}
export default Homepage