import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";
import {Input, Pagination,Button,message,Modal,Upload, Icon,Table, Divider, Tag} from 'antd';
import axios from 'axios'
import {url} from '../config'
import "./upload.css";

class upload extends Component {
constructor(props){
    super(props)
    this.state={
      visible1:false,
      viaibal:false,
      visible2:false,
      url:'/',
      baocunok:'',
      checked:0,
      ifid:[],
       ifidta:[],
       xuha:0,
       invorfid:100,
       asdf:true


    }
  }
  componentDidMount(){

      let id=sessionStorage.getItem('uid');
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
        let access_token=sessionStorage.getItem('access_token');
       let            token_type=sessionStorage.getItem('token_type');

   axios.get(`${url}/Arrear/GetImportLog?pageno=1&pagesize=10&operation=批量导入应收账款数据EXCEL`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
    console.log(res);
   if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else  if(
            res.data.message=='No Rights'
      ){
              
           message.info('用户没有权限，请退出登录');
             
     }

    else{
    if(res.data.result.length==0){}else{
      let c=[]
       res.data.result.map((item,index)=>{
        let success;
        if(item.success==true){
               success='成功'

        }
        else{

             success='失败'

        }
              let  data={
                     key:index,
                    idx:index+1,
                    userName:item.userInfoUserName,
                    name:item.userInfoName,
                    roleList:item.operation,
                    time:item.importTime.split('T')[0]+'    '+item.importTime.split('T')[1].substring(0,8),
                     success:success,

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
        let token_type=sessionStorage.getItem('token_type');

   let  page=pagination.current;

  axios.get(`${url}/Arrear/GetImportLog?pageno=${page}&pagesize=10&operation=批量导入应收账款数据EXCEL`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
    if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
    if(res.data.result.length==0){}else{
      let c=[]
       res.data.result.map((item,index)=>{
         let success;
        if(item.success==true){
               success='成功'

        }
        else{

             success='失败'

        }
              let  data={
                     key:index,
                    idx:index+1+(page-1)*10,
                    userName:item.userInfoUserName,
                    name:item.userInfoName,
                    roleList:item.operation,
                    time:item.importTime.split('T')[0]+'    '+item.importTime.split('T')[1].substring(0,8),
                    success:success,


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
 
 download=()=>{

   var url='../../image/kidde.jpg';  

   document.querySelector("#ifile").src=url;
}
  
  
  render() {
    
     const columns = [{
  title: '序号',
  dataIndex: 'idx',
  key: 'idx',
   align:'center',
  render: text => <a href="javascript:;">{text}</a>,
},
{
  title: '账号',
   align:'center',
  dataIndex: 'userName',
  key: 'userName',
}
,
 {
  title: '姓名',
   align:'center',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '导入时间',
   align:'center',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '导入结果',
   align:'center',
  dataIndex: 'success',
  key: 'success',
}];


     let access_token=sessionStorage.getItem('access_token');
       let token_type=sessionStorage.getItem('token_type');
   
     const props = {
  name: 'file',
  action: `${url}/Arrear/Import`,
  headers: {
      authorization: `${ token_type } ${ access_token }`,
  },
showUploadList:false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      if(info.file.response.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
     if(info.file.response.message=='No Rights'){
     
       message.info('用户没有权限');
     }
     else if(info.file.response.message=='0 item has been updated!'){
      console.log(info)
      message.success(`文档上传成功`);

      window.location.reload(true);

    }
else{
   console.log(info)
  message.info('文档上传失败');
 window.location.reload(true);
}

  }
      

    } else if (info.file.status === 'error') {
      message.error(`文件上传失败`);
window.location.reload(true);
    }
  }
}




    return (<div  >
        <div   className="inupload">
            <Upload {...props}>
    <Button>
    
      <Icon type="upload" /> 点击上传文件
    </Button>

  </Upload>&nbsp;&nbsp;&nbsp;
    <a    href="excel/1.xlsx"   download='应收账款数据模板.xlsx'>应收账款模板下载</a>
  <br/><br/>
  <p  style={{'color':'red'}}> 1.下载模板，并根据模板的样式填写数据。
      2.点击上传文件按钮，选择要上传的文件。


   </p>
  </div>
     
    <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination} onChange={this.handleTableChange}/>



          </div>
    );
  }
}

export default upload;