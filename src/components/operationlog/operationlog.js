import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";

import {Icon,Pagination,DatePicker,Input, Button,Select,message,Modal,Spin,Table, Divider, Tag,Cascader} from 'antd'
import axios from 'axios'
import {url} from '../config'
import "./operationlog.css";

const Option = Select.Option;
    

class operationlog extends Component {
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
      role:[],
      pagination:{total:10},

    }
  
  }

  componentDidMount(){

      let id=sessionStorage.getItem('uid');
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
        let access_token=sessionStorage.getItem('access_token');
       let            token_type=sessionStorage.getItem('token_type');

   axios.get(`${url}/Account/GetOperationLog?pageno=1&pagesize=10`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
     console.log(res);if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
    if(res.data.result.length==0){}else{
      let c=[]
       res.data.result.map((item,index)=>{
              let  data={
                     key:index,
                    idx:index+1,
                    userName:item.userInfoUserName,
                    name:item.userInfoName,
                    roleList:item.operation,
                    time:item.operationTime.split('T')[0]+'    '+item.operationTime.split('T')[1].substring(0,8),


              }
        
      c.push(data);

       })
       this.setState({

              data:c,


       })

    }
       this.setState({
      pagination:{total:res.data.pageCount*10},
    });
      }
        })
        .catch(err=>console.log(err))
   
 

  }
 handleTableChange = (pagination, filters, sorter) => {
   let id=sessionStorage.getItem('uid');
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
        let access_token=sessionStorage.getItem('access_token');
       let            token_type=sessionStorage.getItem('token_type');

   let  page=pagination.current;

  axios.get(`${url}/Account/GetOperationLog?pageno=${page}&pagesize=10`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
    if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
    if(res.data.result.length==0){}else{
      let c=[]
       res.data.result.map((item,index)=>{
              let  data={
                     key:index,
                    idx:index+1+(page-1)*10,
                    userName:item.userInfoUserName,
                    name:item.userInfoName,
                    roleList:item.operation,
                    time:item.operationTime.split('T')[0]+'    '+item.operationTime.split('T')[1].substring(0,8),


              }
        
      c.push(data);

       })
       this.setState({

              data:c,


       })

    }
       this.setState({
      pagination:{total:res.data.pageCount*10},
    });
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
  xiugai=()=>{
     
      this.setState({
      visible: true,
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

}, {
  align:'center',
  title: '姓名',
  dataIndex: 'name',
  key: 'name',

},
 {title: '用户操作',
   align:'center',
  key: 'roleList',
  dataIndex: 'roleList',
 
   
  },
{
  align:'center',
  title: '登录时间',
  dataIndex: 'time',
  key: 'time',
  
} ];





    return (
          <div >
          <div   >
            
          <h1>用户日志</h1>
          </div>
        
         
 
       



             
             <Table columns={columns} dataSource={this.state.data}  pagination={this.state.pagination} onChange={this.handleTableChange}/>
          </div>
        );
  }
}

export default operationlog;