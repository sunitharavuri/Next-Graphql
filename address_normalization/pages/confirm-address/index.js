import Container from '@material-ui/core/Container';
import Image from 'next/image'
import Link from 'next/link'
import {useEffect,useState} from 'react'
import { useRouter} from 'next/router'
import DehazeIcon from '@material-ui/icons/Dehaze';



export default function ConfirmAddress(){
    
const Router=useRouter()

  const [street,setStreet]=useState('')
  const [appartment,setAppartment]= useState('')
  const [city,setCity]= useState('')
  const [state,setState]=useState('')
  const [zip,setZip]= useState('')
    useEffect(()=>{
        const me=localStorage.getItem('useNormalized')
        
       
       if(me=="TRUE"){
        setStreet(localStorage.getItem("NormalizedStreet"))
   setAppartment(localStorage.getItem("NormalizedUnit"))
    setCity(localStorage.getItem("NormalizedCity"))
    setState(localStorage.getItem("NormalizedState"))
   setZip(localStorage.getItem("NormalizedPostalCode"))
  
    }else{
        setStreet(localStorage.getItem("EnteredStreet"))
        setAppartment(localStorage.getItem("EnteredAppartment"))
         setCity(localStorage.getItem("EnteredCity"))
         setState(localStorage.getItem("EnteredState"))
        setZip(localStorage.getItem("EnteredZip"))
      
    }
       
    },[])


    return (<div style={{backgroundColor:"#ccc6c4",height:"655px"}}>
        <div style={{overflow:"hidden",backgroundColor:"white",height:"70px"}}><div style={{marginLeft:"1310px",marginTop:"15px"}}><DehazeIcon></DehazeIcon></div></div>
        <Container style={{marginTop:"200px",marginLeft:"530px",height:"175px",width:"450px"}}>
    <div style={{marginLeft:"120px"}}> <Image src="/vehicle.png" width={45} height={45} ></Image></div>
   <div style={{marginLeft:"28px"}}><h4>Does this address look correct?</h4></div>
   <h4 style={{marginLeft:"60px"}}>{street},{appartment}<br></br>{city},{state},{zip}</h4>
   <div><button onClick={()=>{Router.push('/address')}} style={{borderRadius:"6px",height:"60px",paddingLeft:"70px",paddingRight:"70px"}}><p  style={{color:"blue"}}>ENTER NEW ADDRESS</p></button></div>
</Container></div>)

    
   
}

