import React, { Component } from 'react';
import "./cmain.css";
import axios from 'axios'
import {url} from '../config'
import  Person from'../person/person';
import {BrowserRouter,Link} from "react-router-dom"
class cmain extends Component {
  	state={
 		persons:[{id:0,name:"101863",type:"BB 26-15-10 40 普 B-N-P1-K1",quality:"40kg",color:"彩"},
 		         {id:1,name:"101875",type:"BB 26-15-10 40 普 B-N-P1-K1",quality:"50kg",color:"普"},
 		         {id:2,name:"101892",type:"BB 26-15-10 40 普 B-N-P1-K1",quality:"40kg",color:"彩"}
            
 		         ],
 		        otherstate:"anything",
            panduan:false,
             lineinlist:[],
            companyName:""

 	}
 componentDidMount(){
  
 let timestamp = Date.parse(new Date());
  let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
  


    let   cou=sessionStorage.getItem('account');
     let   pas=sessionStorage.getItem('password');

  axios.get(`${url}/Operation/GetOperationByCompanyID?ID=${unescape(cid[2])}&timestamp=${timestamp}`)
   .then(res=>{
       console.log(res);  
        this.setState({
     lineinlist:res.data,
       
    })  
        
        })
        .catch(err=>console.log(err))

  }
  namechangr=(event,index)=>{
   
        const  personIndex=this.state.persons.findIndex(p=>{

          return  p.id===index;
        })
       const person={...this.state.persons[personIndex]};
        // console.log(event.target.value);
       person.name=event.target.value;
        const  persons=this.state.persons;
              
        persons[personIndex]=person;
         // console.log(persons);
       this.setState({
            persons:persons
      })
    
  }
 	switchNameHalder=(newname)=>{
 		// console.log("22");
 		//   dont do this.state.persons[0].age=46854; 
          let  c=this.state.panduan;  
 		this.setState({
 			 panduan:!c
 		     })
      

    
 	}
  choice=(index)=>{
       
            this.props.history.push("./choice"); 
        
  }
   render(){
  let persons=null;

         persons= (<div>
                    { this.state.lineinlist.map((item,index) => {

                            let  i=index;
                            i=i+1;
                            // console.log(i);
                     return <div   key={index}  className="line" ><div className="q">{item.productionLineName}</div>
                     <Person
                     c={item.productionLineName} 
                     key={index}    
                     name={item.category.materialNo} 
                    color={item.category.describe}
                      quality={item.sum} 
                      type={item.category.manufacturer}/></div>

                     })
                  }
                 </div>)
               
   
     return (<div className="zhu" >
              
 
                
            {persons}
 
     	</div>
     	);
   }
}

export default cmain;