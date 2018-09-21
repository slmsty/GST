import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";

import {Icon,Pagination,DatePicker,Input, Button,message,Modal,Spin,Table, Divider, Tag,Cascader} from 'antd'
import axios from 'axios'
import {url} from '../config'
import "./region.css";


    

class region extends Component {
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
  
   axios.get(`${url}/organization/getlist`)
   .then(res=>{
       console.log(res);
       let c=[];  
          res.data[0].children.map((item,index)=>{
                 
              let  putin={
                key:(c.length+1).toString(),  
                 area: item.name,
                 parentID:item.parentID,
                id:item.id,
                idx:c.length+1,
                child:item.children,
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
         let account=document.querySelector('.account').value;
   
        let data=
        {
  name: account,
  parentID:"98ef99bb-459d-4529-78f5-08d61c44a396",
  
}
     axios.post(`${url}/Organization/Add`,data)
   .then(res=>{
    alert('添加大区成功')
      
            this.setState({
      visible: false,

    });
       window.location.reload(true);
        })
        .catch(err=>console.log(err))


  

  //   let yonghuming=document.querySelector('.yonghuming').value
  //   let jiumima=document.querySelector('.jiumima').value
  //   console.log(yonghuming)
    

  // document.querySelector('.yonghuming').value=''
  //   document.querySelector('.jiumima').value=''

  }
handleOk2=()=>{
   let account=document.querySelector('.account2').value;
   
        let data=
        {
  name: account,
  parentID:"98ef99bb-459d-4529-78f5-08d61c44a396",
  id:this.state.update,
}
     axios.post(`${url}/Organization/Update`,data)
   .then(res=>{
    alert('修改大区成功')
      
          this.setState({
      visible1: false,
      update:'',
    });
       window.location.reload(true);
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

   console.log( value);
 
  this.state.data.map((item,index)=>

       {if(item.id==value)
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


   this.state.data.map((item,index)=>

       {if(item.id==value)
       {
        if(item.child.length==0){
             axios.get(`${url}/Organization/Remove/${value}`)
   .then(res=>{
      
           alert('大区删除成功');
           window.location.reload(true);
        })
        .catch(err=>console.log(err))
            

        } 

        else{

               alert('请先删除大区下的办事处');


        }
 
       }

}

    )
  



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
}, {
  title: '大区名称',
  dataIndex: 'area',
  key: 'area',
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


    return (
          <div  >
          <div>
          
            
          <Button   onClick={this.useradd.bind()}>添加大区</Button>
          </div>
          <br/>
          <Modal 
          className="adduser"
                title="添加大区"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width='350px'
                okText='确定'
            cancelText='取消'>
            <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>区域名称：
              <Input type="text" style={{'lineHeight':'30px','width':'200px','marginLeft':'13px'}}  className='account'/></p>
            
              </div>
              </Modal>
                        {this.state.update==''? '':

                   this.state.data.map((item,index)=>

              item.id==this.state.update?
                  
               
                 <Modal 
                 className="adduser"
                title="修改大区名称"
                visible={this.state.visible1}
                onOk={this.handleOk2}
                onCancel={this.handleCancel2}
                width='350px'
                okText='确定'
                  cancelText='取消'>
                <div  className="add-user">
                
               
            <p style={{'lineHeight':'40px','textAlign':'left'}}>大区名称：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}} defaultValue={item.area} className='account2'/></p>
               
            
              </div>
               </Modal>:''
       
 
       



    )
                  


            }
             
             <Table columns={columns} dataSource={this.state.data} />
          </div>
        );
  }
}

export default region;