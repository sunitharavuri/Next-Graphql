import {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer';
import DehazeIcon from '@material-ui/icons/Dehaze';

export default function EnterAddress(){
 //form state
 const [street,setStreet]=useState()
  const [appartment,setAppartment]=useState()
  const [city,setCity]=useState()
  const [state,setState]=useState()
  const [zip,setZip]=useState()

  const router=useRouter()

  const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
  const removeTypename = (variables) =>
   JSON.parse(JSON.stringify(variables), omitTypename);
  
  const GQL_API = 'API-KEY ';
   function fetchGraphQLQuery({
    query,
    variables,
    accessToken,
    client,
  }) {
    // we convert to gql tag to support strings
    const graphqQuery = gql`
      ${query}
    `;
  
    const headers = accessToken && client ?
      {
        client,
        'access_token': accessToken,
        'Content-Type': 'application/json',
        'app': 'mover',
      } : {
        'Content-Type': 'application/json',
        'app': 'mover',
      };
  
    return fetch(GQL_API, {
      method: 'POST',
      headers,
      mode: 'cors',
      body: JSON.stringify({
        query: print(graphqQuery),
        variables: variables ? removeTypename(variables) : undefined,
      }),
    })
      .then((response) => response.json())
      .catch(function handleGraphQLError(error) {
        console.error('Error occcured within graphql query', error);
      });
  }
  
 
const submitHandler=(e)=>{
  e.preventDefault()
  localStorage.setItem("EnteredStreet",street)
  localStorage.setItem("EnteredAppartment",appartment)
  localStorage.setItem("EnteredCity",city)
  localStorage.setItem("EnteredState",state)
  localStorage.setItem("EnteredZip",zip)
  const query = gql`
  query normalizeAddress($address: AddressInput!){
    normalizedAddress(input: $address){
      normalizedAddress {
        city
        state
        street
        unit
        postalCode
      }
    }
  }`

  const variables = {
    "address": {
      "street": street,
      "unit": appartment,
      "state": state,
      "city": city,
      "postalCode": zip
    }
  }
  const data = fetchGraphQLQuery({
    query,
    variables,
    accessToken: "10QCfM8TV1QDIuPfKB4nLw",
    client: "O2RsZElp8fdF3yBZiM_zVg",
  });

  data.then(({data: response}) =>{if(response.normalizedAddress.normalizedAddress!==null){
    console.log(response.normalizedAddress.normalizedAddress)
    localStorage.setItem("NormalizedCity",response.normalizedAddress.normalizedAddress.city)
    localStorage.setItem("NormalizedPostalCode",response.normalizedAddress.normalizedAddress.postalCode)
    localStorage.setItem("NormalizedState",response.normalizedAddress.normalizedAddress.state)
    localStorage.setItem("NormalizedStreet",response.normalizedAddress.normalizedAddress.street)
    localStorage.setItem("NormalizedUnit",response.normalizedAddress.normalizedAddress.unit)

    router.push('/choose-address')
  }else{
    localStorage.setItem("useNormalized","FALSE")
    router.push('/confirm-address')
  }
    
  });
}

   return(  <div style={{backgroundColor:"#ccc6c4",height:"790px"}}>
        <div style={{overflow:"hidden",backgroundColor:"white",height:"70px"}}><div style={{marginLeft:"1310px",marginTop:"15px"}}><DehazeIcon></DehazeIcon></div></div>
<div ><form  style={{width:'496px',position:'absolute',marginTop:"150px", marginLeft:"410px"}}>
            <div style={{marginLeft:"200px"}}>  <Image src="/vehicle.png" width={45}  
        height={45}></Image></div>     
<div>                <h4 style={{marginLeft:"100px"}}>What address are you moving FROM?</h4></div>
    <div ><input id="address" style={{width:"496px", height:"64px", borderRadius:"4px"}} 
    type="text" name='streetaddress' placeholder="STREET ADDRESS" required value={street}
     onChange={(event)=>{setStreet(event.target.value)}}/></div>
     
     <br></br>

   <div> <input style={{width:"496px", height:"64px",  borderRadius:'4px',blend:"Pass Through"}}  id="appartment"
    type="text" name='appartment' placeholder="APPARTMENT" required   value={appartment}
    onChange={(event)=>{setAppartment(event.target.value)}}/></div>
    
    <br></br>

   <div> <input  style={{width:"496px", height:"64px",  borderRadius:'4px',blend:"Pass Through"}} id="city" 
   type="text" name='city' placeholder="CITY" required value={city}
     onChange={(event)=>{setCity(event.target.value)}}/></div>
     
     <br></br>

   <div style={{display:'flex',justifyContent:"space-between"}}>
     
      <input style={{width:"235px", height:"64px",  borderRadius:'4px',blend:"Pass Through"}}  id="state"
       type="text" name='state' placeholder="STATE" required  value={state}
    onChange={(event)=>{setState(event.target.value)}}/>

    <input style={{width:"235px", height:"64px",  borderRadius:'4px',blend:"Pass Through"}}  id="zip" 
     type="text" name="zip" placeholder="ZIP" required value={zip}
     onChange={(event)=>{setZip(event.target.value)}}/>
     
     </div>
     
     <br></br>

    <button style={{width:"336px", height:"56px",alignItems:"center" ,backgroundColor:"#226180",
    
    marginLeft:"80px",borderRadius:"4px"}}   type="submit" onClick={submitHandler} >NEXT</button>


  </form></div>
   </div>)
}