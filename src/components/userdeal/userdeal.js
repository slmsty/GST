import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";

import {Icon,Pagination,DatePicker,Input, Button,message,Modal,Spin,Table, Divider, Tag,Cascader} from 'antd'
import axios from 'axios'
import {url} from '../config'
import "./userdeal.css";


    

class userdeal extends Component {
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

    }
  
  }
  
  componentDidMount(){
  
   
      // let  c=document.querySelector("#chandi");
      // c.option.add(new Option("22","22"));
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
  
   axios.get(`${url}/account/getlist`)
   .then(res=>{
       console.log(res);
       let c=[];  
          res.data.map((item,index)=>{
                 
              let  putin={
                idx:c.length+1,
                key:(c.length+1).toString(),  
                 name: item.name,
                 userName:item.userName,
              phoneNo: item.phoneNo,
              region:'GST',
             eMail: item.eMail,
               tags: ['cool', 'teacher'],  
                id:item.id,
                password:item.password,
                employeeNumber:item.employeeNumber,

              }  
          
        c.push(putin);
          

          })
            this.setState({
             data:c,
            });
       
        })
        .catch(err=>console.log(err))
   //       axios.get(`${url}/order/getlist`)
   // .then(res=>{
   //     console.log(res);
       
   //      })
   //      .catch(err=>console.log(err))

   //      axios.get(`${url}/organization/getlist`)
   // .then(res=>{
   //     console.log(res);
       
   //      })
   //      .catch(err=>console.log(err))

   //      axios.get(`${url}/role/getlist`)
   // .then(res=>{
   //     console.log(res);
       
   //      })
   //      .catch(err=>console.log(err))
 

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
       let old=/^[0-9a-zA-Z]{5,20}$/;
         let account=document.querySelector('.account').value;
    let password=document.querySelector('.password').value;
    let phoneNo=document.querySelector('.phoneNo').value;
    let eMail=document.querySelector('.email').value ;
    let name=document.querySelector('.name').value;
    let employeeNumber=document.querySelector('.employeeNumber').value ;
         if(old.test(password)==false){

                  alert("请输入5~20位数字或字母作为密码"); 
         }
         else{
        let data=
        {name:name,
          employeeNumber:employeeNumber,
         userName: account,
         password: password,
         phoneNo: phoneNo,
         eMail: eMail,
  
}

     axios.post(`${url}/account/addAccount`,data)
   .then(res=>{
    alert('用户添加成功')
      
            this.setState({
      visible: false,

    });
       window.location.reload(true);
        })
        .catch(err=>console.log(err))

}
  

  //   let yonghuming=document.querySelector('.yonghuming').value
  //   let jiumima=document.querySelector('.jiumima').value
  //   console.log(yonghuming)
    

  // document.querySelector('.yonghuming').value=''
  //   document.querySelector('.jiumima').value=''

  }
handleOk2=()=>{
   let old=/^[0-9a-zA-Z]{5,20}$/;
   let account=document.querySelector('.account2').value;
    let password=document.querySelector('.password2').value;
    let phoneNo=document.querySelector('.phoneNo2').value
    let eMail=document.querySelector('.email2').value 
    let name=document.querySelector('.name2').value;
    let employeeNumber=document.querySelector('.employeeNumber2').value ;

if(old.test(password)==false){

                  alert("请输入5~20位数字或字母作为密码"); 
         }
         else

{
        let data=
        {
          name:name,
          employeeNumber:employeeNumber,
  userName: account,
  password: password,
  phoneNo: phoneNo,
  eMail: eMail,
  id:this.state.update,
}
axios.post(`${url}/account/update`,data)
   .then(res=>{
        alert('修改成功');

        this.setState({
      visible1: false,
      update:'',
       });
          window.location.reload(true);
        })
        .catch(err=>console.log(err))
}
  

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

group=()=>{
 let  d=[];
     let   c=document.querySelector('.search').value
      let value=document.querySelector('#idSelect').value;
      if(value==1){
        let cid=document.cookie.match(new RegExp("(^| )pcompany=([^;]*)(;|$)"));
           axios.get(`${url}/account/getlist`)
   .then(res=>{
        
       this.setState({
     invodata:res.data,
    
    });  
    this.state.invodata.map((item,index)=>

      item.no.indexOf(c, 0)==-1? "":d.push(item)


)
 this.setState({
     invodata:d,
    fendata:d.slice(0,10),
      
    }); 

         
        })
        .catch(err=>console.log(err))

      }
     else if(value==2){
        axios.get(`${url}/Invoice/getListNoGroup?id=1`)
   .then(res=>{
        
       this.setState({
     invodata:res.data,
  
      
    });  
    this.state.invodata.map((item,index)=>

      item.no.indexOf(c, 0)==-1? "":d.push(item)


)
 this.setState({
     invodata:d,
    fendata:d.slice(0,10),
      
    }); 

         
        })
        .catch(err=>console.log(err))
     }
     else if(value==0){
      let cid=document.cookie.match(new RegExp("(^| )pcompany=([^;]*)(;|$)"));
           axios.get(`${url}/Invoice/getListByCompanyID?id=${unescape(cid[2])}`)
   .then(res=>{
      
        this.setState({
     invodata:res.data,
  
      
    }); 
 
    this.state.invodata.map((item,index)=>

      item.no.indexOf(c, 0)==-1? "":d.push(item)


)
 this.setState({
     invodata:d,
    fendata:d.slice(0,10),
      
    }); 
       
        })
        .catch(err=>console.log(err))

     }
    
     

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


  axios.get(`${url}/Account/Remove/${value}`)
   .then(res=>{
         alert('用户删除成功');
       window.location.reload(true);
        })
        .catch(err=>alert('用户删除失败'))

  



}
upload=(value)=>{

     sessionStorage.setItem('upload',value);

     sessionStorage.setItem('choice',5);
     window.location.reload(true);

}
useradd=()=>{
   console.log(1)
     this.setState({
         visible:true,

     });
  
}
  render() {
      
    const columns = [{
  title: '序号',
  dataIndex: 'idx',
  key: 'idx',
  render: text => <a href="javascript:;">{text}</a>,
},{
  title: '账号',
  dataIndex: 'userName',
  key: 'userName',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',

},
{
  title: '工号',
  dataIndex: 'employeeNumber',
  key: 'employeeNumber',
  
},
{
  title: '电话',
  dataIndex: 'phoneNo',
  key: 'phoneNo',
}, {
  title: '所在机构',
  dataIndex: 'region',
  key: 'region',
}, {
  title: '角色',
  dataIndex: 'region',
  key: 'region',
},  {
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

// function onChange(value) {
//   console.log(value);
// }


    return (
          <div  className="invoice">
          <div>
            
          <Button   onClick={this.useradd.bind()}>添加新用户</Button> &nbsp;  <a   onClick={this.upload.bind(this,1)} >文档导入</a>
          </div>
          <br/>
          <Modal 
          className="adduser"
                title="用户添加"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width='350px'
                okText='确定'
            cancelText='取消'>
            <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>账号：
              <Input type="text" style={{'lineHeight':'30px','width':'200px','marginLeft':'13px'}}  className='account'/></p>
            <p style={{'lineHeight':'40px','textAlign':'left'}}>密码：&nbsp;&nbsp;
              <Input type="password" style={{'lineHeight':'30px','width':'200px'}}  className='password'/></p>
             <p style={{'lineHeight':'40px','textAlign':'left'}}>电话：&nbsp;&nbsp;
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='phoneNo'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>E-Mail：
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='email'/></p>
              <p style={{'lineHeight':'40px','textAlign':'left'}}>姓名：&nbsp;&nbsp;
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='name'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>工号：
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='employeeNumber'/></p>
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
                width='350px'
                okText='确定'
                  cancelText='取消'>
                <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>账号：
                <Input type="text" style={{'lineHeight':'30px','width':'200px','marginLeft':'13px'}} defaultValue={item.userName} className='account2'/></p>
              <p style={{'lineHeight':'40px','textAlign':'left'}}>密码：&nbsp;&nbsp;&nbsp;&nbsp;
              <Input type="password" style={{'lineHeight':'30px','width':'200px'}}  className='password2' defaultValue={item.password}/></p>
              <p style={{'lineHeight':'40px','textAlign':'left'}}>电话：&nbsp;&nbsp;&nbsp;&nbsp;
               <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='phoneNo2'  defaultValue={item.phoneNo}/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>E-Mail：&nbsp;
               <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='email2' defaultValue={item.eMail}/></p>
                <p style={{'lineHeight':'40px','textAlign':'left'}}>姓名：&nbsp;&nbsp;
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='name2'  defaultValue={item.name}/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>工号：
              <Input type="text" style={{'lineHeight':'30px','width':'200px'}}  className='employeeNumber2'  defaultValue={item.employeeNumber}/></p>
               </div>
               </Modal>:''
       
 
       



    )
                  


            }
             
             <Table columns={columns} dataSource={this.state.data} />
          </div>
        );
  }
}

export default userdeal;