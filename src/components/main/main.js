import React, { Component } from 'react';
import "./main.css";
import {Input, Button,message,Modal,Layout, Menu, Breadcrumb, Icon } from 'antd';
import Upload from '../upload/upload'
import Role from '../role/role'
import Region from '../region/region'
import Regiont from '../regiont/regiont'
import Userdeal from '../userdeal/userdeal'
import Userlogin from '../userlogin/userlogin'
import Useractive from '../useractive/useractive'
import Upmassage from '../upmassage/upmassage'
import Operationlog from '../operationlog/operationlog'
import axios from 'axios'
import {url} from '../config'
import {BrowserRouter,Link} from "react-router-dom"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class main extends Component {
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
    // axios.get(`${url}/Account/GetOperationLog?pageno=1&pagesize=10&operation=批量导入应收账款数据EXCEL`,{headers:{
    //         Authorization: `${ token_type } ${ access_token }`
    //       }})
    //  .then(res=>{
    //     if(res.data.message=="Please Login First."){

       

    //  }else if(
    //         res.data.message=='No Rights'
    //   ){       console.log(res);
    //           this.setState({
    //            shu:0
    //           });
    //           // alert('用户没有权限，点击退出登录');
    //           //  window.location.href="../";
    //  }
    //  else{
            
              
             
        
    //      }
    //       })
    //       .catch(err=>console.log(err))
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
        {this.state.shu==1?  <Menu theme="dark" mode="inline" defaultSelectedKeys={[sessionStorage.getItem('choice')]}>
        <Menu.Item key="1" onClick={this.zhanshi.bind(this,'1')}>
          <Icon type="upload"    />
          <span className="nav-text">应收账款文档上传</span>
        </Menu.Item>
      
      </Menu>:''}{this.state.shu==2?
       <Menu theme="dark" mode="inline" defaultSelectedKeys={[sessionStorage.getItem('choice')]}>
       <SubMenu key="sub1" title={<span><Icon type="user" />用 户 管 理</span>}>
            <Menu.Item key="1"   onClick={this.zhanshi.bind(this,'1')}>
            
              <span className="nav-text" >人员管理</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.zhanshi.bind(this,'2')} >
              
              <span className="nav-text">角色管理</span>
            </Menu.Item>
          </SubMenu>

        <SubMenu key="sub2" title={<span> <Icon type="appstore-o" />组织机构管理</span>}>
        <Menu.Item key="3"  onClick={this.zhanshi.bind(this,'3')}>
         
          <span className="nav-text">区 域 管 理</span>
        </Menu.Item>
        <Menu.Item key="4"  onClick={this.zhanshi.bind(this,'4')}>
          
          <span className="nav-text">办事处管理</span>
        </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={ <span className="nav-text"><Icon type="area-chart"    />账 号 管 理</span>}>
          <Menu.Item key="7"  onClick={this.zhanshi.bind(this,'7')}>
         
          <span className="nav-text">近期未登录用户</span>
        </Menu.Item>
        <Menu.Item key="8"  onClick={this.zhanshi.bind(this,'8')}>
          
          <span className="nav-text">账户登录表</span>
        </Menu.Item>
        <Menu.Item key="9"  onClick={this.zhanshi.bind(this,'9')}>
          
          <span className="nav-text">用户日志</span>
        </Menu.Item>
        </SubMenu>
        <Menu.Item key="6" onClick={this.zhanshi.bind(this,'6')}>
          <Icon type="upload"    />
          <span className="nav-text">应收账款文档上传</span>
        </Menu.Item>
      
      </Menu>:''}
      </Sider>
       <Layout style={{ marginLeft: 200 }}>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      {this.state.shu==1?   <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          
          {sessionStorage.getItem('choice')=='1'? <Upload></Upload>:null}
          
        </div>:''}
         {this.state.shu==2? 
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          {sessionStorage.getItem('choice')=='1'? <Userdeal></Userdeal>:null}
          {sessionStorage.getItem('choice')=='2'? <Role></Role>:null}
          {sessionStorage.getItem('choice')=='3'? <Region></Region>:null}
          {sessionStorage.getItem('choice')=='4'? <Regiont></Regiont>:null}
          {sessionStorage.getItem('choice')=='5'? <Upmassage></Upmassage>:null}
          {sessionStorage.getItem('choice')=='6'? <Upload></Upload>:null}
          {sessionStorage.getItem('choice')=='7'? <Userlogin></Userlogin>:null}
          {sessionStorage.getItem('choice')=='8'? <Useractive></Useractive>:null}
          {sessionStorage.getItem('choice')=='9'? <Operationlog></Operationlog>:null}         
        </div>:''}
      </Content>
    
    </Layout>

    </Layout>
  </Layout>
  </div>
     	);
   }
}

export default main;