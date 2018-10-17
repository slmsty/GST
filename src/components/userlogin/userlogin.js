import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";

import {Icon,Pagination,DatePicker,Input, Button,Select,message,Modal,Spin,Table, Divider, Tag,Cascader} from 'antd'
import axios from 'axios'
import {url} from '../config'
import "./userlogin.css";

const Option = Select.Option;
    

class userlogin extends Component {
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
      update:'',
      organization:[],
      role:0,
      mouth:[1,2,3,4,5,6,7,8,9,10,11,12],

    }
  
  }
  
  componentDidMount(){
  
 

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



Export=()=>{

  if(this.state.role==0){

        message.info('没有选择未登录时间。');
  }
  else{
       window.location.href=`${url}/account/ExportExpireUser/${this.state.role}`;
  
  }
}

ass=(value)=>{


   return value.backgroundColor='black';

}
handleChange=(value)=>{
      let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');

   axios.get(`${url}/account/getExpireUser/${value}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{ console.log(res);
       if(res.data.message=="Please Login First."){
         
         message.info('用户信息失效，请重新登录！')

     }else{
       if(res.data.data.length!=0){
           let c=[];
          
           res.data.data.map((item,index)=>{

              let  data={

                  idx:index+1,
                  key:(index+1).toString(),  
                   name: item.name,
                   organ:item.organization,
                   roleList:item.role,
                   userName:item.userName,
                  phoneNo: item.phoneNo,
                 eMail: item.eMail,
                  lastLoginTime:item.lastLoginTime,
                  id:item.id,
                  password:item.password,
                  employeeNumber:item.employeeNumber,
                  
          
              }

              c.push(data)


           })
        
           this.setState({
            
            data4:c,
             
            });
       }
       else{
            this.setState({
            
            data4:[],
             
            });
            }

       }
        })
        .catch(err=>console.log(err))
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
userinfo=(value1,value2)=>{

  if(value1=='不可用'){
   axios.get(`${url}/Account/EnableUser/${value2}`)
   .then(res=>{
         alert('用户启用成功');
       window.location.reload(true);
        })
        .catch(err=>alert('用户启用失败'))
   }
else{

    axios.get(`${url}/Account/DisableUser/${value2}`)
   .then(res=>{
         alert('用户禁用成功');
       window.location.reload(true);
        })
        .catch(err=>alert('用户禁用失败'))


}
}

useradd=()=>{
   
     this.setState({
         visible:true,

     });
  
}
  render() {
      
    const columns = [{
  title: '序号',
  className:'ltable',
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
  dataIndex: 'organ'
  },{title: '角色',
   align:'center',
  key: 'roleList',
  dataIndex: 'roleList'}
  ,{title: '上次登录时间',
   align:'center',
  key: 'lastLoginTime',
  dataIndex: 'lastLoginTime'}
];

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: '1',
    label: '1'},{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  
}];




    return (
          <div >
          <p  style={{ 'float':'left'}}>
              选择未登录时间：&nbsp;
       
              <Select
                
                 style={{ width: '200px'}}
                 placeholder="请选择未登录时间"
   
                 onChange={this.handleChange}
              >
                { this.state.mouth.map((item,index)=>

                     <Option key={index} value={item}>{item}个月以上未登录</Option>

                    )}
                  </Select></p>&nbsp;&nbsp;<Button onClick={this.Export} >文档导出</Button>
              <br/><br/>
             <Table columns={columns} dataSource={this.state.data4} />
          </div>
        );
  }
}

export default userlogin;