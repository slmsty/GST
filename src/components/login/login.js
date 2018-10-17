import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";
import {Input, Button,message,Modal } from 'antd';
import axios from 'axios'
import {url} from '../config'
import "./login.css";

class login extends Component {
constructor(props){
    super(props)
    this.state={
      visible1:false,
      viaibal:false,
      visible2:false,
      url:'/',
      baocunok:'',
      checked:0,
      data:[],
      id:'',
      url:'http://gst.bclzdd.com',
      access_token:'',
          token_type:'',
          shu:0,

    }
  
  }
  componentDidMount(){
    sessionStorage.setItem('account','');
      sessionStorage.setItem('password','');
    sessionStorage.setItem('userId','');
    sessionStorage.setItem('checked',0);
    sessionStorage.setItem('choice2',0);
    sessionStorage.setItem('CompanyID','');
    sessionStorage.setItem('choice','1');
   sessionStorage.setItem('orderID',0);
   sessionStorage.setItem('upload',0);
   sessionStorage.setItem('orderNo',0);
   let   a=this.getCookie("checked0");


    let  point=document.querySelector(".red") ;
      let  acc=document.querySelector(".account") ;
        let  pas=document.querySelector(".password") ;
  let  c_start=document.cookie.indexOf("checked0=");
 if(c_start == -1){
       
    point.checked=false;
   sessionStorage.setItem('checked',0);
 }
 else{
  if(a==0){ point.checked=false;
   sessionStorage.setItem('checked',0);}
  else{
 point.checked=true;
 acc.value=this.getCookie("account0");
 pas.value=this.getCookie("password0");
   sessionStorage.setItem('checked',1);

  }
   
 }
 



  }
    tiao=()=>{

  let  cou=document.querySelector(".account").value.replace(/\s/ig,'');
  let  pas=document.querySelector(".password").value.replace(/\s/ig,'');

 let  point=document.querySelector(".red");
  if(cou=="")
  {
      message.info('请输入账号');


  }
  else if(pas==""){
     message.info('请输入密码');


  }
   else{
   
       let  username=cou.trim();
       let password=pas.trim();
       
  
    
    // axios.post(`${this.state.url}/connect/token`,`client_id=client2&client_secret=secret&username=${username}&password=${password}&grant_type=password`)
    //   .then(res=>console.log(res))
    //   .catch(err=>message.info(err.response.data.error_description))

     axios.post(`${this.state.url}/connect/token`,`client_id=client2&client_secret=secret&username=${username}&password=${password}&grant_type=password`)
            .then(res =>{
                    sessionStorage.setItem('access_token',res.data.access_token);
                    sessionStorage.setItem('token_type',res.data.token_type);
                    this.setState({
      access_token:res.data.access_token,
      token_type:res.data.token_type,
        })

                  

                if(res.data==''){
                       message.info('账号或密码不正确');
                
                     }

               else

                     {
                       
                      
                          this.test();


                         if(point.checked){
           
                         this.SetCookie("checked0",1)
                         this.SetCookie("account0",cou)
                          this.SetCookie("password0",pas)
                     }
                       else{
                         this.SetCookie("checked0",0)
                      }
                         sessionStorage.setItem('uname',res.data.userName);
                         sessionStorage.setItem('uid',res.data.id);
                        sessionStorage.setItem('account',cou);
                        sessionStorage.setItem('password',pas);
                      if(this.state.shu==1){
                     this.props.history.push("./maint");}
                     else  if(this.state.shu==2){
                           
                           this.props.history.push("./main");

                     }

                     // console.log(res);

                      }
                    
                 

              
                  


            })
            .catch(err=>{
                     console.log(err);
                        if(err.response!==undefined){

              message.info(err.response.data.error_description)}})

         

   }       

  }

  test=()=>{
               let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
           axios.get(`${url}/Account/GetOperationLog?pageno=1&pagesize=10&operation=批量导入应收账款数据EXCEL`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
        if(res.data.message=="Please Login First."){

       

     }else if(
            res.data.message=='No Rights'
      ){       console.log(res);
              this.setState({
               shu:0
              });
            message.info('该用户没有权限')
     }
     else{
            axios.get(`${url}/role/getlist`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
        if(res.data.message=="Please Login First."){

       

     }else if(
            res.data.message=='No Rights'
      ){
            this.setState({
               shu:1,
              });
         
     }
     else{
            
              this.setState({
               shu:2,
              });
         }
          })
          .catch(err=>console.log(err))
              
             
        
         }
          })
          .catch(err=>console.log(err))
 






  }
  
  SetCookie=(name,value)=>//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
  

  handleOk = (e) => {
   


    let  cou=document.querySelector('.yonghuming').value.replace(/\s/ig,'');
  let  pas=document.querySelector('.jiumima').value.replace(/\s/ig,'');
 
  if(cou=="")
  {
 message.info('请输入账号');
 

  }
  else if(pas==""){
 message.info('请输入密码');


  }
   else{
      let data={
         name:cou.trim(),
        password:pas.trim()

      }
      let acou=false;
      let  pass=false;
      this.state.data.map((item,index)=>{

           
           if(item.userName==cou){

                  acou=true;
                  this.setState({
                      
                     id:item.id,


                  });
    
           }
           if(item.password==pas){

                  pass=true;

           }




      })
       if(acou==false){
         message.info('账号不正确');
     


       }else if(pass==false){
 message.info('密码不正确');
         

       }else{
         document.querySelector('.yonghuming').value=''; 
                    document.querySelector('.jiumima').value='';
           
        this.setState({
      visible: false,
      visible2: true,
    });


       }
       
 

  }
}
  handleOk2=()=>{

   
            let old=/^[0-9a-zA-Z]{5,20}$/;

         let  newpassword=document.querySelector('.xinmima').value.replace(/\s/ig,'');
         let  newpassword2=document.querySelector('.querenmima').value.replace(/\s/ig,'');
         let oldpasswordset=new Set(newpassword.split(""));
         
         if(newpassword==''){
 message.info('请输入新密码');
        

         }
         else if(newpassword2=='')
         {
           message.info('请确认新密码');
            

         }
         else if(newpassword!=newpassword2){
               message.info('两次密码输入不一致！');
                 
          

         }
         else if(old.test(newpassword)==false){
                message.info('请输入5~20位数字或字母作为密码');
             
         }
         else  if(oldpasswordset.size==1){
                message.info('密码不能完全一致');
         
         }
         else{
               let  data={
                    
                   id:this.state.id,
                   password:newpassword


               }
                axios.post(`${url}/Account/ChangePassword`, data)
            .then(res =>{
                   message.info('修改密码成功');
               
                    this.setState({
                       visible: false,
                          visible2: false,
                    

                    }) ;
                    document.querySelector('.xinmima').value=''; 
                    document.querySelector('.querenmima').value='';
              


            })
            .catch(err=>console.log(err))

 
            

         }
        
  }

 handleCancel=()=>{

        this.setState({
      visible: false,
    });
   document.querySelector('.yonghuming').value=''; 
                    document.querySelector('.jiumima').value='';

 }
 handleCancel2=()=>{
            this.setState({
               visible2: false,
                 });


                document.querySelector('.xinmima').value=''; 
              document.querySelector('.querenmima').value='';



 }
 radioclick=()=>{
      let checked = sessionStorage.getItem('checked');
     let  point=document.querySelector(".red") ;
        if(checked==1){
        
               point.checked=false;
               sessionStorage.setItem('checked',0);
          
        }
        else{
        
            point.checked=true;
               sessionStorage.setItem('checked',1);
              
        }

 }
getCookie=(name)=>//取cookies函数        
   { 

    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
    }
    


  render() {

   

    return (<div  className="login" >
      <div className="lheader"> <div className="logo" ></div>
       <div className="title" >海湾安全技术有限公司</div></div>
      <div className="background">
      
       <div  className="board">
              <div className="boardin"><h2  className="hhh">海湾后台管理系统</h2>
               <input className="account" type="text"placeholder="请输入账号 " /><br/><br/>                               
               <input className="password" type="password" placeholder="请输入密码"/><br/> <br/>
               <input type="radio" name="colors" className="red"  onClick={this.radioclick} />记住密码<br/><br/>
              <Button type="primary"  onClick={this.tiao}>登录 </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
                <Modal
                title="修改密码"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width='350px'
              >
                <p style={{'lineHeight':'40px','textAlign':'center'}}>用户名：
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='yonghuming'/></p>
            <p style={{'lineHeight':'40px','textAlign':'center'}}>旧密码：
              <Input type="password" style={{'lineHeight':'30px','width':'200px'}}  className='jiumima'/></p>
            
              </Modal>

              <Modal
                title="Change Password"
                visible={this.state.visible2}
                onOk={this.handleOk2}
                onCancel={this.handleCancel2}
                width='350px'
             >
                <p style={{'lineHeight':'40px','textAlign':'center'}}>新密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input type="password" style={{'lineHeight':'30px','width':'200px','marginLeft':'13px'}}  className='xinmima'/></p>
            <p style={{'lineHeight':'40px','textAlign':'center'}}>确认新密码：
              <Input type="password" style={{'lineHeight':'30px','width':'200px'}}  className='querenmima'/></p>
            
              </Modal>

               
               
               </div>
       </div>
       </div>
      
      </div>
    );
  }
}

export default login;