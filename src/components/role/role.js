import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";

import {Icon,Pagination,Alert,DatePicker,Input, Button,message,Modal,Spin,Table, Divider, Tag,Cascader,Select} from 'antd'
import axios from 'axios'
import {url} from '../config'
import "./role.css";
const Option = Select.Option;

    

class role extends Component {
constructor(){
    super()
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
      update:'',
      role:[],
      organization:[],

    }
  
  }
  
  componentDidMount(){
       axios.get(`${url}/Role/GetRightsList`)
   .then(res=>{
         console.log(res);
        this.setState({
             role:res.data,

        });
        
        })
        .catch(err=>console.log(err))
   
      // let  c=document.querySelector("#chandi");
      // c.option.add(new Option("22","22"));
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
  
   axios.get(`${url}/role/getlist`)
   .then(res=>{
       console.log(res);
       let c=[];  
          res.data.map((item,index)=>{

                        let   rol=[];
                      if(item.rightList!=undefined){
                    item.rightList.map((ite,index)=>{
                            
                                let  as=ite;
                           this.state.role.map((itm,index)=>{

                                        if(as==itm.id){

                                            rol.push(itm);


                                        }




                   }) 

                    })   
                  }
                   
              let  putin={
                key:(c.length+1).toString(),  
                 role: item.name,
                 rightList:rol,
                id:item.id,
                 idx:c.length+1,
                 
              }  
          
        c.push(putin);
          

          })
            this.setState({
             data:c,
            });
       
        })
        .catch(err=>console.log(err))
        

   //      axios.get(`${url}/organization/getlist`)
   // .then(res=>{
   //     console.log(res);
       
   //      })
   //      .catch(err=>console.log(err))

      
 

  }
 
 getlist=()=>{
axios.get(`${url}/role/getlist`)
   .then(res=>{
       console.log(res);
       let c=[];  
          res.data.map((item,index)=>{

                        let   rol=[];
                      if(item.rightList!=undefined){
                    item.rightList.map((ite,index)=>{
                            
                                let  as=ite;
                           this.state.role.map((itm,index)=>{

                                        if(as==itm.id){

                                            rol.push(itm);


                                        }




                   }) 

                    })   
                  }
                   
              let  putin={
                key:(c.length+1).toString(),  
                 role: item.name,
                 rightList:rol,
                id:item.id,
                 idx:c.length+1,
                 
              }  
          
        c.push(putin);
          

          })
            this.setState({
             data:c,
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
         let name=document.querySelector('.account').value;
    let rightList=sessionStorage.getItem('role');


  
        let data=
        {
     name: name,
     rightList:this.state.organization,
  
     }
     axios.post(`${url}/role/add`,data)
   .then(res=>{
     message.success(`角色添加成功`);
document.querySelector('.account').value='';
      this.getlist();
            this.setState({
      visible: false,

    });
       
        })
        .catch(err=>message.error('角色添加失败'))


  

  

  }
handleOk2=()=>{
  let account=document.querySelector('.account2').value;
    
        let data=
        {
   rightList:this.state.organization,       
  name: account,
  id:this.state.update,
}
axios.post(`${url}/role/update`,data)
   .then(res=>{
   
     message.success(`修改成功`);
     document.querySelector('.account2').value='';
        this.setState({
      visible1: false,
      update:'',
       });
          this.getlist();
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
zhu=()=>{
   
     
       sessionStorage.setItem('choice',1);
      this.props.history.push("./main");   
}
tui=()=>{
   
    this.props.history.push("./");     


}


fenye=(event)=>{

  
    let c=event-1;
    let d=c*10;

     this.setState({
     
     fendata:this.state.invodata.slice(d,d+10),
     xuhao:d,
      
    })  

}
zhansh=(orderNo)=>{

       sessionStorage.setItem('orderNo',orderNo);
      sessionStorage.setItem('choice',3);
 


      window.location.reload(true);


}


update=(value)=>{

   // console.log( this.state.data);
 
  this.state.data.map((item,index)=>

       {if(item.id===value)
       {
        this.setState({
         
                update:value,
                visible1:true,

          })  
 
       }

}

    )



}
remove=(value)=>{
    axios.get(`${url}/Role/Remove/${value}`)
   .then(res=>{
           message.success(`删除成功`);
   
        this.getlist();
        })
        .catch(err=>console.log(err))

  




}
useradd=()=>{
   console.log(1)
     this.setState({
         visible:true,

     });
  
}
handleChange=(value)=>{
   sessionStorage.setItem('role',`${value}`);
  
  
 
   
}
handleChange1=(value)=>{
  this.setState({
            
            organization:value,
             
            });
  
}
  render() {
      
    const columns = [{
  title: '序号',
  dataIndex: 'idx',
  key: 'idx',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '角色名称',
  dataIndex: 'role',
  key: 'role',
}, 
  {
  title: '角色权限',
  key: 'rightList',
  dataIndex: 'rightList',
  render: rightList => (
    <span>
      {rightList.map(rightList => <Tag color="blue" key={rightList.name}>{rightList.name}</Tag>)}
    </span>
  ),
},
{
  title: '操作',
  key: 'action',
  render: (text, record) => (
   <span>
  <a  onClick={this.update.bind(this,record.id)}>修改</a>
      <Divider type="vertical" />
      <a onClick={this.remove.bind(this,record.id)}>删除</a>
    </span>
  ),
}];

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: '1',
    label: '1',},{
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

// function onChange(value) {
//   console.log(value);
// }
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


    return (
          <div  >
          <div>
            
           
          <Button  onClick={this.useradd.bind()}>添加角色</Button>
          </div>
          <br/>
          <Modal 
          className="adduser"
                title="新建角色"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width='500px'
                okText='确定'
            cancelText='取消'>
            <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>角色名称：
              <Input type="text" style={{'lineHeight':'30px','width':'200px','marginLeft':'13px'}}  className='account'/></p>
                 <p style={{'lineHeight':'40px','textAlign':'left'}}>角色权限：
              <Select
                mode="multiple"
                 style={{ width: '200px' }}
                 placeholder="请选择组织机构"
   
                 onChange={this.handleChange1}
              >
                { this.state.role.map((item,index)=>
                     <Option key={index} value={item.id}>{item.name}</Option>

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
                title="修改角色"
                visible={this.state.visible1}
                onOk={this.handleOk2}
                onCancel={this.handleCancel2}
                width='350px'
                okText='确定'
                  cancelText='取消'>
                <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>角色名称：
                <Input type="text" style={{'lineHeight':'30px','width':'200px','marginLeft':'13px'}} defaultValue={item.role} className='account2'/></p>
                  <p style={{'lineHeight':'40px','textAlign':'left'}}>角色权限：
              <Select
                mode="multiple"
                 style={{ width: '200px' }}
                 placeholder="请选择组织机构"
   
                 onChange={this.handleChange1}
              >
                { this.state.role.map((item,index)=>
                     <Option key={index} value={item.id}>{item.name}</Option>

                    )}
                  </Select>
              </p>
               </div>
               </Modal>:''
       
 
       



    )
                  


            }
             
             <Table columns={columns} dataSource={this.state.data} />
          </div>
        );
  }
}

export default role;