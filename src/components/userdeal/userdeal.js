  import React, { Component } from 'react';
  import {BrowserRouter,Link} from "react-router-dom";

  import {Icon,Pagination,DatePicker,Input, Button,Select,message,Modal,Spin,Table, Divider, Tag,Cascader,Switch} from 'antd'
  import axios from 'axios'
  import {url} from '../config'
  import "./userdeal.css";

  const Option = Select.Option;
      

  class userdeal extends Component {
  constructor(props){
      super(props)
      this.state={
        visible:false,
        visible1:false,
        viaibal:false,
        visible2:false,
        url:'/',
        baocunok:'',
        checked:0,
        data:[],
        invodata:[],
        fendata:[],
        xuhao:0,
        fan:true,
        data:[],
        data2:[],
        data3:[],
        data4:[],
        update:'',
        organization:[],
        role:[],
        pass:[false,false,false,false,false],
        settings:[],
        test:0,
        adtvalue:'',
        page:1,
       pagination:10,

      }
    
    }
      componentWillMount() {
        this._isMounted = true
       
}


  componentWillUnmount() {
        this._isMounted = false
}
    componentDidMount(){
      let id=sessionStorage.getItem('uid');
      let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
    axios.get(`${url}/role/getlist`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
        if(res.data.message=="Please Login First."){

       

     }else if(
            res.data.message=='No Rights'
      ){
           

     }
     else{
            
              this.setState({
               data2:res.data,
              });
         }
          })
          .catch(err=>console.log(err))
        
      axios.get(`${url}/organization/getlist`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
         if(res.data.message=="Please Login First."){

       

     }else if(
            res.data.message=='No Rights'
      ){
           

     }

     else{
         let c=[];  
          c.push(res.data[0]);
            res.data[0].children.map((item,index)=>{
                  c.push(item);  
            
               item.children.map((ite,index)=>{

                c.push(ite);

               })
          
          
           

            })
              
             
              this.setState({
              
               data3:c,
               
              });}
         
          })
          .catch(err=>console.log(err))
       
        let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
    
     axios.get(`${url}/account/getlist?pageno=1&pagesize=10`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else if(
            res.data.message=='No Rights'
      ){
          message.info('用户没有权限，退出到登录页面');

      window.location.href="../";   

     }
     else{console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                  idx:c.length+1,
                  key:(c.length+1).toString(),  
                   name: item.name,
                   organ:item.organization,
                   roleList:item.roleList,
                   organizationList:item.organizationList,
                   role:item.role,
                   userName:item.userName,
                   phoneNo: item.phoneNo,
                   eMail: item.eMail,
                   userinfo:cc,
                   id:item.id,
                   imei:item.imei,
                   password:item.password,
                   employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
              });}
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
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
    xiugai=()=>{
       
        this.setState({
        visible: true,
      });
    }

    handleOk = (e) => {
      let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
         let old=/^[0-9a-zA-Z]{5,20}$/;
           let account=document.querySelector('.account').value.replace(/\s/ig,'');
      // let password=document.querySelector('.password').value.replace(/\s/ig,'');
      let phoneNo=document.querySelector('.phoneNo').value.replace(/\s/ig,'');
      let eMail=document.querySelector('.email').value.replace(/\s/ig,'');
      let imei=document.querySelector('.imei').value.replace(/\s/ig,'');
      let name=document.querySelector('.name').value.replace(/\s/ig,'');
      let employeeNumber=document.querySelector('.employeeNumber').value ;
           let  regex = /^[1][3,4,5,7,8][0-9]{9}$/;
           let  email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
         
           if(this.state.test==1){
             message.warning('不要频繁点击');
               
           }else{
             this.setState({
        test: 1,
      });
  if(regex.test(phoneNo)==false){
                      message.warning('请输入正确的电话号码');
                    
                    this.setState({
        test: 0,
      });
           }
           else  if(email.test(eMail)==false){
              message.warning('请输入正确的电子邮箱');
                 this.setState({
        test: 0,
      });         
                     
           }
 else  if(account==''){

                    alert("请填写账号");  
                     this.setState({
        test: 0,
      });         
           }
  else  if(name==''){

                    alert("请填写姓名"); 
                     this.setState({
        test: 0,
      });         
           }
  else  if(employeeNumber==''){

                    alert("请填写工号"); 
                     this.setState({
        test: 0,
      });         
           }
          
           else{
          let data=
          { 
            name:name,
            employeeNumber:employeeNumber,
            userName: account,
            phoneNo: phoneNo,
            eMail: eMail,
            imei:imei,
            organizationList:this.state.organization,
            roleList:this.state.role,
          

    
  }
let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
       axios.post(`${url}/Account/AddAccount`,data,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
     if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
             
           if(res.data!='用户添加成功!'){
            console.log(res);
            
               message.info(res.data)
           
        
          this.setState({
      
          test:0,
      });

           }
           else{

              message.success(res.data)

    
           document.querySelector('.account').value='';
      
      document.querySelector('.phoneNo').value='';
     document.querySelector('.email').value='';
      document.querySelector('.imei').value='';
     document.querySelector('.name').value='';
     document.querySelector('.employeeNumber').value='';
           this.setState({
                visible: false,
                organizationList:[],
                roleList:[],
                test:0
      }); 
    
        this.refresh();}}
          })
          .catch(err=>console.log(err))

  }
    
}

    }
     handleTableChange = (pagination, filters, sorter) => {
   let id=sessionStorage.getItem('uid');
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
        let access_token=sessionStorage.getItem('access_token');
       let            token_type=sessionStorage.getItem('token_type');

   let  page=pagination.current;
if(this.state.adtvalue==''){

  axios.get(`${url}/account/getlist?pageno=${page}&pagesize=10`,{
    headers:{
            Authorization: `${ token_type } ${ access_token }`
          }
        })
   .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }
         else{
          // console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                   idx:c.length+1,
                   key:(c.length+1).toString(),  
                   name: item.name,
                   organ:item.organization,
                   roleList:item.roleList,
                   organizationList:item.organizationList,
                   role:item.role,
                   userName:item.userName,
                   phoneNo: item.phoneNo,
                   eMail: item.eMail,
                   userinfo:cc,
                   id:item.id,
                    imei:item.imei,
                   password:item.password,
                   employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
               page:page,
              });}
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
          })
        .catch(err=>console.log(err))
   }else{
       axios.get(`${url}/Account/getlist?pageno=${page}&pagesize=10&orgid=${this.state.adtvalue}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                  idx:c.length+1,
                  key:(c.length+1).toString(),  
                  name: item.name,
                  organ:item.organization,
                  roleList:item.roleList,
                  organizationList:item.organizationList,
                  role:item.role,
                  userName:item.userName,
                  phoneNo: item.phoneNo,
                  eMail: item.eMail,
                  userinfo:cc,
                  id:item.id,
                   imei:item.imei,
                  password:item.password,
                  employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
               page:page,
              });
            }
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
          })
        .catch(err=>console.log(err))








   }
  }
  handleOk2=()=>{
      let old=/^[0-9a-zA-Z]{5,20}$/;
      let account=document.querySelector('.account2').value.replace(/\s/ig,'');
      // let password=document.querySelector('.password2').value.replace(/\s/ig,'');
      let phoneNo=document.querySelector('.phoneNo2').value.replace(/\s/ig,'');
      let eMail=document.querySelector('.email2').value.replace(/\s/ig,'');
      let imei=document.querySelector('.imei1').value.replace(/\s/ig,'');
      let name=document.querySelector('.name2').value.replace(/\s/ig,'');
      let employeeNumber=document.querySelector('.employeeNumber2').value.replace(/\s/ig,'');
      let  regex = /^[1][3,4,5,7,8][0-9]{9}$/;
       let  email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
   if(regex.test(phoneNo)==false){

                    alert("请输入正确的电话号码"); 
           }
   else  if(email.test(eMail)==false){

                    alert("请输入正确的电子邮箱"); 
           }

   else  if(account==''){

                    alert("请填写账号"); 
           }
   else  if(name==''){

                    alert("请填写姓名"); 
           }
  else  if(employeeNumber==''){

                    alert("请填写工号"); 
           }
           else

  {
          let data=
          { 
            imei:imei,
            // password:password,
            name:name,
            employeeNumber:employeeNumber,
            userName: account,
            phoneNo: phoneNo,
            eMail: eMail,

            id:this.state.update,
            organizationList:this.state.organization,
            roleList:this.state.role,
        }

       let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');

   axios.post(`${url}/account/update`,data,{headers:{

            Authorization: `${ token_type } ${ access_token }`

                    }
            }
          )
     .then(res=>{
             
  if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }
     else{
             
           if(res.data!='用户修改成功!'){
            console.log(res);
            
               message.info(res.data)
           
        
          this.setState({
      
          test:0,
      });

           }
        
       else{

       message.success(res.data)

       this.setState({

            visible1: false,
            update:'',
            organizationList:[],
            roleList:[],
         
         });

            this.refresh();

          }}


         
          })
          .catch(err=>console.log(err))
  }
    

  }
  refresh=()=>{
        
       let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
      if(this.state.adtvalue==''){

  axios.get(`${url}/account/getlist?pageno=${this.state.page}&pagesize=10`,{
    headers:{
            Authorization: `${ token_type } ${ access_token }`
          }
        })
   .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }
         else{
          // console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                   idx:c.length+1,
                   key:(c.length+1).toString(),  
                   name: item.name,
                   organ:item.organization,
                   roleList:item.roleList,
                   organizationList:item.organizationList,
                   role:item.role,
                   userName:item.userName,
                   phoneNo: item.phoneNo,
                   eMail: item.eMail,
                   userinfo:cc,
                   id:item.id,
                    imei:item.imei,
                   password:item.password,
                   employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
              
              });}
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
          })
        .catch(err=>console.log(err))
   }else{
       axios.get(`${url}/account/getlist?pageno=${this.state.page}&pagesize=10`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                  idx:c.length+1,
                  key:(c.length+1).toString(),  
                  name: item.name,
                  organ:item.organization,
                  roleList:item.roleList,
                  organizationList:item.organizationList,
                  role:item.role,
                  userName:item.userName,
                  phoneNo: item.phoneNo,
                  eMail: item.eMail,
                  userinfo:cc,
                  id:item.id,
                   imei:item.imei,
                  password:item.password,
                  employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
             
              });
            }
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
          })
        .catch(err=>console.log(err))








   }





  }
  handleOk3=()=>{
     
       let passwordLength=document.querySelector('.passwordLength').value;
       let lockTimes=document.querySelector('.lockTimes').value;
       let unlockTimeLong=document.querySelector('.unlockTimeLong').value
       let resetPasswordTimes=document.querySelector('.resetPasswordTimes').value 
       let exclude=document.querySelector('.exclude').value ;
       let unloginLong=document.querySelector('.unloginLong').value;
       let smsUserName=document.querySelector('.smsUserName').value;
       let smsPassword=document.querySelector('.smsPassword').value;
       let smsOrganizationCode=document.querySelector('.smsOrganizationCode').value;



          let data=
          {
            passwordLength:passwordLength,
            lockTimes:lockTimes,
            unlockTimeLong:unlockTimeLong,
            resetPasswordTimes:resetPasswordTimes,
            exclude: exclude,
            unloginLong: unloginLong,
            capitalRequire:this.state.pass[0],
            lowercaseLetterRequire:this.state.pass[1],
            specialLetterRequire:this.state.pass[2],
            numberRequire:this.state.pass[3],
            disableWhenUnlogin:this.state.pass[4],
            smsUserName:smsUserName,
            smsPassword:smsPassword,
            smsOrganizationCode:smsOrganizationCode,
  }
  let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
  axios.post(`${url}/Account/SetSettings`,data,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
          alert('修改密码格式成功');
    
          this.setState({
        visible2: false,
        update:'',
        roleList:[],
         });
            }
          })
          .catch(err=>console.log(err))

    

  }
  handleCancel2=()=>{

          this.setState({
        visible1: false,
         update:'',
      });


   }
   handleCancel=()=>{

          this.setState({
        visible: false,
      });
 document.querySelector('.account').value='';
      
      document.querySelector('.phoneNo').value='';
     document.querySelector('.email').value='';
      document.querySelector('.imei').value='';
     document.querySelector('.name').value='';
     document.querySelector('.employeeNumber').value='';
     document.querySelector('.role').defaultValue='';
     document.querySelector('.organization').defaultValue='';

   }
   
    handleCancel3=()=>{

          this.setState({
        visible2: false,
         pass:[false,false,false,false,false],
      });


   }
  getCookie=(name)=>//取cookies函数        
  {   
      var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
      if(arr != null) return unescape(arr[2]); return null;
  }




  zhansh=(orderNo)=>{

         sessionStorage.setItem('orderNo',orderNo);
        sessionStorage.setItem('choice',3);
   


        window.location.reload(true);


  }


  update=(value)=>{

   
   
    this.state.data.map((item,index)=>

         {if(item.id===value)
         {
            let  c=[];
            let  d=[];
       

              console.log(item.roleList,item.organizationList);
          this.setState({
            organization:item.organizationList,
                  role:item.roleList,
                  update:value,
                  visible1:true,

            })  
   
         }

  }

      )



  }
  remove=(value)=>{
let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
     if(this.state.data4.length==1){
             if(this.state.page==1){}
              else{

                     let  a=this.state.page-1;
                     this.setState({

                          page:a,
                        
                     });


              }
               

     }

    axios.get(`${url}/Account/Remove/${value}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
           message.success('用户删除成功');
         this.refresh();
          })
          .catch(err=>message.alert('用户删除失败'))

    



  }
  userinfo=(value1,value2,value3)=>{
    let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
   if(value3==1){
    if(value1=='不可用'){
     axios.get(`${url}/Account/EnableUser/${value2}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
            message.success('用户启用成功');
        this.refresh();
          })
          .catch(err=>message.error('用户启用失败'))
     }
  else{

      axios.get(`${url}/Account/DisableUser/${value2}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
           message.success('用户禁用成功');
        this.refresh();
          })
          .catch(err=>message.error('用户禁用失败'))


  }
    }
    else{
          if(value1=='未锁定'){
     
           message.info('用户已处于未锁定状态');
        
     }
  else{

      axios.get(`${url}/Account/UnlockUser/${value2}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
          message.success('用户解锁成功');
        this.refresh();
          })
          .catch(err=>message.error('用户解锁失败'))


  }





    }
  }
  ass=(value)=>{


     return value.backgroundColor='black';

  }
  handleChange=(value)=>{
      this.setState({
              
              role:value,
               
              });
      
  }
  handleChange1=(value)=>{
    this.setState({
              
              organization:value,
               
              });
   
  }
  upload=(value)=>{

       sessionStorage.setItem('upload',value);

       sessionStorage.setItem('choice',5);
       window.location.reload(true);

  }
  changePasswordRole=()=>{
    let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
  axios.get(`${url}/Account/GetSettings`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
        
                console.log(res);
              this.setState({
               settings:res.data,
               pass:[res.data.capitalRequire,res.data.lowercaseLetterRequire,
                         res.data.specialLetterRequire,res.data.numberRequire,res.data.disableWhenUnlogin,res.data.smsOrganizationCode,res.data.smsPassword,res.data.smsUserName
                      ],
                visible2:true,

              });
         
          })
          .catch(err=>console.log(err))
   



  }
  resetPassword=(value,userName,employeeNumber,phoneNo)=>{
let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
          let data={
               id:value,
               }
        

        axios.post(`${url}/Account/ResetPassword`,data,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
         .then(res=>{
   console.log(res);
if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
       message.info(res.data.message);
        }
         })
       .catch(err=>console.log(err.response))
        


  }
  useradd=()=>{

       this.setState({
           visible:true,

       });
    
  }
  handle=(as,value)=>{
       
        let z=[];
        let d=[];
       let id=sessionStorage.getItem('uid');
      let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
         if(value=='0'){
             axios.get(`${url}/account/getlist?pageno=1&pagesize=10`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                  idx:c.length+1,
                  key:(c.length+1).toString(),  
                   name: item.name,
                   organ:item.organization,
                   roleList:item.roleList,
                   organizationList:item.organizationList,
                   role:item.role,
                   userName:item.userName,
                phoneNo: item.phoneNo,
               eMail: item.eMail,
                userinfo:cc,
                  id:item.id,
                  password:item.password,
                  employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
               adtvalue:'',
              });}
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
          })
          .catch(err=>console.log(err))
   
       


         } else { 

        axios.get(`${url}/account/getlist?pageno=1&pagesize=10&orgid=${value}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
     .then(res=>{
         if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{console.log(res);
         let c=[];  
            res.data.result.map((item,index)=>{

                  let  cc="不可用";
                  if(item.actived==true){


                    cc="可用";
                  }
                  let dd='已锁定'
                   if(item.locked==false){


                    dd="未锁定";
                  }
                let  putin={
                  idx:c.length+1,
                  key:(c.length+1).toString(),  
                   name: item.name,
                   organ:item.organization,
                   roleList:item.roleList,
                   organizationList:item.organizationList,
                   role:item.role,
                   userName:item.userName,
                phoneNo: item.phoneNo,
               eMail: item.eMail,
                userinfo:cc,
                  id:item.id,
                  password:item.password,
                  employeeNumber:item.employeeNumber,
                   locked:dd,
                }  
            
          c.push(putin);
            

            })
              this.setState({
               data:c,
               data4:c,
               adtvalue:value,
              });}
              this.setState({
      pagination:{total:res.data.pageCount*10},
    });
         
          })
          .catch(err=>console.log(err))
         
}

       
  }
  onChangepass=(value,checked)=>{
    let  c=this.state.pass;
    c[value]=checked;

       this.setState({
           pass:c,

       });
   

  }
    render() {
        
      const columns = [{
    title: '序号',

    dataIndex: 'idx',
    key: 'idx',
    align:'center',
    render: text =><span> {text}</span>,
  },{
    align:'center',
    title: '账号',
    dataIndex: 'userName',
    key: 'userName',
    render: text => <span>{text}</span>,
  }, {
    align:'center',
    title: '姓名',
    dataIndex: 'name',
    key: 'name',

  },
  {
    align:'center',
    title: '工号',
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
    
  },
  {  
    align:'center',
    title: '电话',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
  }, {title: '组织机构',
     align:'center',
    key: 'organ',
    dataIndex: 'organ',
   },{title: '角色',
     align:'center',
    key: 'role',
    dataIndex: 'role',
    }, {title: '账号状态',
     align:'center',
    key: 'userinfo',
    dataIndex: 'userinfo',
    render: (userinfo,record) => (
      <span>
       <a  onClick={this.userinfo.bind(this,userinfo,record.id,1)} >{userinfo}</a>
      </span>
    )
    }, {title: '锁定状态',
     align:'center',
    key: 'locked',
    dataIndex: 'locked',
    render: (locked,record) => (
      <span>
       <a  onClick={this.userinfo.bind(this,locked,record.id,0)} >{locked}</a>
      </span>
    )
    }, {
      align:'center',
    title: '操作',
    key: 'action',
    className:'action',
    render: (text, record) => (
     <div  className='action'>

        <a  onClick={this.update.bind(this,record.id)}>修改</a>
        <Divider type="vertical" />
        <a onClick={this.remove.bind(this,record.id)}>删除</a>
      </div>
    ),
  }];





      return (
            <div >
            <div style={{'float':'left'}}>
              <Button   onClick={this.changePasswordRole.bind()}   >修改密码格式</Button> &nbsp;  
            <Button   onClick={this.useradd.bind()}   >添加新用户</Button> &nbsp;  
     
             
               &nbsp; &nbsp;
               按组织机构查询： 
                <Select
                 
                   style={{ width: '200px' }}
                   placeholder="请选择组织机构"
                   defaultValue={this.state.organization}
                   onChange={this.handle.bind(this,1)}
                >
                <Option key='-1' value='0'>全部</Option>
                  { this.state.data3.map((item,index)=>

                         index=='0'?  '':<Option key={index} value={item.id}>{item.name}</Option>

                      )}
                    </Select>&nbsp; &nbsp;
               <a   onClick={this.upload.bind(this,1)} >文档导入</a>      
            </div>
            <br/><br/>
            <Modal 
            className="adduser"
                  title="用户添加"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  width='500px'
                  okText='确定'
              cancelText='取消'>
              <div  className="add-user">
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>账号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='account'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>电话：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='phoneNo'/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>imei号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='imei'/></p>
                 <p style={{'lineHeight':'40px','textAlign':'left'}}>E-Mail：&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='email'/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='name'/></p>
                 <p style={{'lineHeight':'40px','textAlign':'left'}}>工号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='employeeNumber'/></p>
                   <p style={{'lineHeight':'40px','textAlign':'left'}}>角色：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Select
                  mode="multiple"
                   style={{ width: '200px' }}
                   placeholder="请选择角色"
                    className='role'
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                   onChange={this.handleChange}
                >
                  { this.state.data2.length==0? '':this.state.data2.map((item,index)=>

                       <Option key={index} value={item.id}>{item.name}</Option>

                      )}
                    </Select>
                </p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>组织机构：
                <Select
                  className='organization'
                  mode="multiple"
                   style={{ width: '200px' }}
                   placeholder="请选择组织机构"
                   getPopupContainer={triggerNode => triggerNode.parentNode}
                   onChange={this.handleChange1}
                >
                  {this.state.data3.length==0? '':this.state.data3.map((item,index)=>
                       index=='0'?  '':<Option key={index} value={item.id}>{item.name}</Option>

                      )}
                    </Select>
                </p>
                </div>
                </Modal>
                {this.state.update==''? '':

                     this.state.data.map((item,index)=>

                item.id==this.state.update?
                    
                 
                   <Modal 
                   className="adduser"
                  title="用户修改"
                  visible={this.state.visible1}
                  onOk={this.handleOk2}
                  onCancel={this.handleCancel2}
                  width='500px'
                  okText='确定'
                    cancelText='取消'>
                  <div  className="add-user">
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>账号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  readOnly='true' defaultValue={item.userName} className='account2'/></p>
                 <p style={{'lineHeight':'40px','textAlign':'left','display':'none'}} >密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input type="text" style={{'lineHeight':'30px','width':'200px'}} defaultValue={item.password} className='password2'/></p>
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>imei号：&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  defaultValue={item.imei} className='imei1'/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>电话：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='phoneNo2'  defaultValue={item.phoneNo}/></p>
                 <p style={{'lineHeight':'40px','textAlign':'left'}}>E-Mail：&nbsp;&nbsp;&nbsp;&nbsp;
                 <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='email2' defaultValue={item.eMail}/></p>
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='name2'  defaultValue={item.name}/></p>
                 <p style={{'lineHeight':'40px','textAlign':'left'}}>工号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='employeeNumber2'  defaultValue={item.employeeNumber}/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>角色：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               
                <Select
                  mode="multiple"
                   style={{ width: '200px' }}
                   placeholder="请选择角色"
                   defaultValue={this.state.role}
                   onChange={this.handleChange}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {this.state.data2.length==0? '':this.state.data2.map((item,index)=>

                       <Option key={index} value={item.id}>{item.name}</Option>

                      )}
                    </Select>
                </p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>组织机构：
                
                <Select
                  mode="multiple"
                   style={{ width: '200px' }}
                   placeholder="请选择组织机构"
                   defaultValue={this.state.organization}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                   onChange={this.handleChange1}
                >
                  {this.state.data.length==0? '': this.state.data3.map((item,index)=>

                         index=='0'?  '':<Option key={index} value={item.id}>{item.name}</Option>

                      )}
                    </Select>
                </p>

                <p><Button   onClick={this.resetPassword.bind(this,item.id,item.userName,item.employeeNumber,item.phoneNo)}> 重置密码</Button> </p>
                 </div>
                 </Modal>:''
         
   
         



      )
                    


              }
               <Modal 
            className="adduser"
                  title="密码规则"
                  visible={this.state.visible2}
                  onOk={this.handleOk3}
                  onCancel={this.handleCancel3}
                  width='500px'
                  okText='确定'
              cancelText='取消'>
              <div  className="add-user">
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>密码长度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='passwordLength'  defaultValue={this.state.settings.passwordLength}/></p>
              <p style={{'lineHeight':'40px','textAlign':'left'}}>密码输入次数上限：
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='lockTimes'  defaultValue={this.state.settings.lockTimes}/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>自动解锁时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='unlockTimeLong' defaultValue={this.state.settings.unlockTimeLong}/></p>
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>短信接口账号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='smsUserName'  defaultValue={this.state.settings.smsUserName}/></p>
              <p style={{'lineHeight':'40px','textAlign':'left'}}>短信接口密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='smsPassword'  defaultValue={this.state.settings.smsPassword}/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>短信接口组织机构码：
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='smsOrganizationCode' defaultValue={this.state.settings.smsOrganizationCode}/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>记录历史密码个数：
                <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='resetPasswordTimes' defaultValue={this.state.settings.resetPasswordTimes}/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>禁用关键字：（英文逗号分隔）
                <Input type="text" style={{'lineHeight':'30px','width':'300px'}}  className='exclude' defaultValue={this.state.settings.exclude}/></p>
                 <span style={{'lineHeight':'40px','textAlign':'left'}}>必须包含大写字母：&nbsp;&nbsp;
                {this.state.pass[0]==false?
                <span><Switch  onChange={this.onChangepass.bind(this,0)} /></span>:
                  <Switch  defaultChecked onChange={this.onChangepass.bind(this,0)} />
                }&nbsp;&nbsp;</span>
                <span style={{'lineHeight':'40px','textAlign':'left'}}>必须包含小写字母：&nbsp;&nbsp;
                 {this.state.pass[1]==false?
               <span><Switch  onChange={this.onChangepass.bind(this,1)} /></span>:
                  <Switch defaultChecked onChange={this.onChangepass.bind(this,1)} />
                }</span>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>必须包含特殊字符：&nbsp;&nbsp;
                 {this.state.pass[2]==false?
               <span><Switch  onChange={this.onChangepass.bind(this,2)} /></span>:
                  <Switch defaultChecked onChange={this.onChangepass.bind(this,2)} />
                }&nbsp;&nbsp;
                <span style={{'lineHeight':'40px','textAlign':'left'}}>必须包含数字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.state.pass[3]==false?
                <span><Switch  onChange={this.onChangepass.bind(this,3)} /></span>:
                  <Switch defaultChecked onChange={this.onChangepass.bind(this,3)} />
                }</span>

                </p>
                 
                 <p style={{'lineHeight':'40px','textAlign':'left'}}>账户失效时间：&nbsp;&nbsp;
                 {this.state.pass[4]==false?
               <span><Switch  onChange={this.onChangepass.bind(this,4)} /></span>:
                  <Switch defaultChecked  onChange={this.onChangepass.bind(this,4)} />
                }</p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>设置具体失效时间：&nbsp;&nbsp;
                <Input type="text" style={{'lineHeight':'30px','width':'50px'}}  className='unloginLong' defaultValue={this.state.settings.unloginLong}/>个月</p>
                </div>
                </Modal>
               <Table columns={columns} dataSource={this.state.data4} pagination={this.state.pagination} onChange={this.handleTableChange}/>
            </div>
          )
    }
  }
     
  export default userdeal;