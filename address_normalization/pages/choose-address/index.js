import {useRouter} from 'next/router'
import Card  from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {useState,useEffect} from 'react'
import DehazeIcon from '@material-ui/icons/Dehaze';



export default function ChooseAddress(){
  const [normalizedCity,setNormalizedCity]=useState('')
  const [normalizedPostalCode,setNormalizedPostalCode]=useState('')
  const [normalizedState,setNormalizedState]=useState('')
  const [normalizedStreet,setNormalizedStreet]=useState('')
  const [normalizedUnit,setNormalizedUnit]=useState('')

  const [enteredStreet,setEnteredStreet]=useState('')
  const [enteredAppartment,setEnteredAppartment]= useState('')
  const [enteredCity,setEnteredCity]= useState('')
  const [enteredState,setEnteredState]=useState('')
  const [enteredZip,setEnteredZip]= useState('')

 const router=useRouter()

 useEffect(()=>{
   setNormalizedCity(localStorage.getItem("NormalizedCity"))
  setNormalizedPostalCode(localStorage.getItem("NormalizedPostalCode"))
   setNormalizedState(localStorage.getItem("NormalizedState"))
  setNormalizedStreet(localStorage.getItem("NormalizedStreet"))
  setNormalizedUnit(localStorage.getItem("NormalizedUnit"))


 setEnteredStreet(localStorage.getItem("EnteredStreet"))
  setEnteredAppartment(localStorage.getItem("EnteredAppartment"))
  setEnteredCity(localStorage.getItem("EnteredCity"))
  setEnteredState(localStorage.getItem("EnteredState"))
  setEnteredZip(localStorage.getItem("EnteredZip"))
 },[])

  

   const submitHandler1=()=>{
      localStorage.setItem("useNormalized","TRUE")
      router.push('/confirm-address')
   }
   const submitHandler2=()=>{
    localStorage.setItem("useNormalized","FALSE")
    router.push('/confirm-address')
   }
   
  
    return(<div style={{backgroundColor:"#ccc6c4",height:"655px"}}>
      
      <div style={{overflow:"hidden",backgroundColor:"white",height:"70px"}}><div style={{marginLeft:"1310px",marginTop:"15px"}}><DehazeIcon></DehazeIcon></div></div>      
      <Container style={{display:"flex",justifyContent:"space-between", width:"615px",height:"175px",marginTop:"300px"}}>
    <Card style={{width:"272px",height:"175px"}} onClick={submitHandler1}>
<CardContent>
<p style={{color:"#0a95c9",fontFamily:"-moz-initial"}}><LocationOnIcon/>Official USPS address</p>
<p>{normalizedStreet},{normalizedUnit}</p>
<p>{normalizedCity},{normalizedState},{normalizedPostalCode}</p>
</CardContent>
</Card><Card style={{width:"272px",height:"175px"}} onClick={submitHandler2}>
<CardContent>
<p style={{color:"#f25535",fontFamily:"-moz-initial"}}><LocationOnIcon/>Unrecognised address</p>
<p>{enteredStreet},{enteredAppartment}</p>
<p>{enteredCity},{enteredState},{enteredZip}</p>
</CardContent>
</Card></Container></div>)
}



