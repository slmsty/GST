import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";
import {Input, Pagination,Button,message,Modal,Upload, Icon,Table, Divider, Tag} from 'antd';
import axios from 'axios'
import {url} from '../config'
import './upmassage.css';


class upmassage extends Component {
constructor(){
    super()
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
       asdf:true,
       lianjie:'1',


    }
  }
 
   componentDidMount(){
     if(sessionStorage.getItem('upload')==1){

            this.setState({
        lianjie:'/account/import',

     });
          



     }else{

            this.setState({

             lianjie:'/organization/import',


          })

     }
   
      
   }
  
  render() {
     const columns = [{
  title: '序号',
  dataIndex: 'idx',
  key: 'idx',
  render: text => <a href="javascript:;">{text}</a>,
},{
  title: '文件名',
  dataIndex: 'version',
  key: 'version',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '导入人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '导入时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">修改</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  idx:1,
  version:'1.0.1',
  name: '李主任',
  age: 32,
  time:'2018-08-02',
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  idx:2,
    version:'1.0.2',
    time:'2018-08-02',
  name: '张经理',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  idx:3,
  version:'1.0.3',
  name: '赵经理',
  age: 32,
  time:'2018-08-03',
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
     const props = {
  name: 'file',
  action: `${url}/Account/Import`,
  headers: {
    authorization: 'authorization-text',
  },
showUploadList:false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败，请确认文档格式是否正确`);
    }
  }
}
const props2 = {
  name: 'file',
  action: `${url}/Organization/Import`,
  headers: {
    authorization: 'authorization-text',
  },
showUploadList:false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败，请确认文档格式是否正确`);
    }
  }
}



    return (<div  className="upload">
        <div   className="inupload">
          &nbsp;&nbsp;&nbsp;
  {sessionStorage.getItem('upload')==1?     <Upload {...props}>
    <Button>
    
      <Icon type="upload" /> 点击上传文件
    </Button>

  </Upload>:<Upload {...props2}>
    <Button>
    
      <Icon type="upload" /> 点击上传文件
    </Button>

  </Upload>



}  &nbsp;&nbsp;
  {sessionStorage.getItem('upload')==1?   <a    href="excel/3.xlsx"   download='用户信息模板.xlsx'>用户信息模板下载</a>:
                                <a    href="excel/2.xlsx"   download='组织机构模板.xlsx'>组织机构模板下载</a>



}
    
  <br/><br/>
  <p    className='p' style={{'color':'red'}}> 1.下载模板，并根据模板的样式填写数据<br/>
      2.点击上传文件按钮，选择要上传的文件。<br/>
      3.当一个人拥有多个角色和办事处时，请用英文逗号分割并写在同一栏内。


   </p>
  </div>
     
  



          </div>
    );
  }
}

export default upmassage;