import React, { Component } from 'react';
import "./maint.css";
import {Input, Button,message,Modal,Layout, Menu, Breadcrumb, Icon } from 'antd';
import Upload from '../upload/upload'
import axios from 'axios'
import {url} from '../config'
import {BrowserRouter,Link} from "react-router-dom"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class maint extends Component {
  	state={
 		
 		        otherstate:"anything",
            panduan:false,
            changepage:true,
             collapsed: false,
             shu:0,
          

 	}
   componentDidMount(){
    if(sessionStorage.getItem('account')==''||sessionStorage.getItem('password')==''){

        this.props.history.push("./");   

    }
    let id=sessionStorage.getItem('uid');
      let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
    

    this.setState({
      changepage:!this.state.changepage,
     
    })

   }
   onCollapse = (collapsed) => {
    
    this.setState({ collapsed });
  }
  category=()=>{


    this.props.history.push("./category");
  }
 
   jump=(road)=>{
        if(road==1){

         this.props.history.push("./invoice");     
        }
        else if(road==2)
         {

                  this.props.history.push("./cmain");       

         }
   }
reback=()=>{
     let c="../../";

   this.props.history.push("./");   

}
zhanshi=(shu)=>{
   

   sessionStorage.setItem('choice',shu);
   
      this.componentDidMount();
 // this.props.history.push("./main");
 
}

   render(){
 
      let  c=1;       
   
     return (
      <div   id="main"><Layout>
    <Header className="header"   style={{ overflow: 'auto', height: '70px', position: 'fixed', left: 0 ,zIndex:100}}>
      <div className="logo2" />
       <div className='userInfo' ><span>欢迎，{sessionStorage.getItem('account')} </span>|<span  onClick={this.reback.bind()}>退出</span></div>
    </Header>
    <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 ,paddingTop:'70px',zIndex:10}}>
         <Menu theme="dark" mode="inline" defaultSelectedKeys={[sessionStorage.getItem('choice')]}>
        <Menu.Item key="1" onClick={this.zhanshi.bind(this,'1')}>
          <Icon type="upload"    />
          <span className="nav-text">应收账款文档上传</span>
        </Menu.Item>
      
      </Menu>
      </Sider>
       <Layout style={{ marginLeft: 200 }}>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          
          {sessionStorage.getItem('choice')=='1'? <Upload></Upload>:null}
          
        </div>
         
       
      </Content>
    
    </Layout>

    </Layout>
  </Layout>
  </div>
     	);
   }
}

export default maint;