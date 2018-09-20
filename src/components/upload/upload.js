import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";
import {Input, Pagination,Button,message,Modal,Upload, Icon,Table, Divider, Tag} from 'antd';
import axios from 'axios'
import {url} from '../config'
import "./upload.css";

class upload extends Component {
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
       asdf:true


    }
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
  action: `${url}/Arrear/Import`,
  headers: {
    authorization: 'authorization-text',
  },
showUploadList:false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}




    return (<div  className="upload">
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
     
    <Table columns={columns} dataSource={data} />



          </div>
    );
  }
}

export default upload;