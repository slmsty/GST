import React, { Component } from 'react';
import {BrowserRouter,Link} from "react-router-dom";

import {Icon,Pagination,DatePicker,Input, Select,Button,message,Modal,Spin,Table, Divider, Tag,Cascader} from 'antd'
import axios from 'axios'
import {url} from '../config'
import "./regiont.css";

const Option = Select.Option;
    

class regiont extends Component {
constructor(props){
    super(props)
    this.state={
      visible:false,
      visible1:false,
      viaibal:false,
      visible2:false,
      visible3:false,
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
       data4:[],
       merge:'',
      update:'',
      id:0,
      id1:0,
      ac:1,

    }
  
  }
  
  componentDidMount(){

  let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
      // let  c=document.querySelector("#chandi");
      // c.option.add(new Option("22","22"));
      let cid=document.cookie.match(new RegExp("(^| )pcompany1=([^;]*)(;|$)"));
  
   axios.get(`${url}/organization/getlist`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{
       if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
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
            let d=[];
            
           this.state.data.map((item,index)=>
                
                item.child.map((iem,index)=>
                            {

                            let  putin={
                              phoneNo:iem.phoneNo,
                              address:iem.address,
                key:this.state.ac,  
                 name: iem.name,
                 parentID:iem.parentID,
                id:iem.id,
                idx:this.state.ac,
                child:iem.children,
              } 
                    this.setState({
             ac:this.state.ac+1,

             
            });    
                       d.push(putin)
}

                  )
                 


        )
           
            this.setState({
             data2:d,
             data3:d,
             
            });
       }
        })
        .catch(err=>console.log(err))
        
 

  }
    map=(value)=>{
          let  d=[]
           this.setState({
             ac:1,

             
            });   
        if(value==0){

                this.state.data2.map((item,index)=>

               {
                       
                      d.push(item);
                        d[d.length-1].idx=d.length;
                           d[d.length-1].key=d.length;

                     
                  }
              )
              this.setState({
            
             data3: d,
             
            }); 

        }
        else{

             this.state.data2.map((item,index)=>

               {if(item.parentID==value)
                       {
                      d.push(item);
                        d[d.length-1].idx=d.length;
                           d[d.length-1].key=d.length;

                     }
                  }
              )
              this.setState({
            
             data3: d,
             
            }); 

          
        }



    }
     map1=(value)=>{


        this.setState({
            
             id: value,
             
            }); 



     }
     map2=(value)=>{


        this.setState({
            
             id1: value,
             
            }); 



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
         let address=document.querySelector('.address').value;
         let phoneNo=document.querySelector('.phoneNo').value;
      
  let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
    let map=this.state.id;
   if(map==0){alert('请选择相应的大区')}
          
      else if(account==''){


        alert('请输入办事处名称');
      }
     else{
          let data=
        {
  address:address,
  phoneNo:phoneNo,
  name: account,
  parentID:map,
  
}
     axios.post(`${url}/Organization/Add`,data,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
     message.success(`办事处添加成功`);
      
            this.setState({
      visible: false,

    });
       window.location.reload(true);}
        })
        .catch(err=>console.log(err))


     }

       


  

  

  }
handleOk2=()=>{


   let account=document.querySelector('.account2').value;
         let address=document.querySelector('.address2').value;
         let phoneNo=document.querySelector('.phoneNo2').value;
     
  let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');
    let map=this.state.id1;
   if(map==0){alert('请选择相应的大区')}
          
      else if(account==null){


        alert('请输入办事处名称');
      }
     else{
          let data=
        {
  address:address,
  phoneNo:phoneNo,
  name: account,
  parentID:map,
  id:this.state.update,
}
     axios.post(`${url}/Organization/Update`,data,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
     message.success(`办事处修改成功`);
      
            this.setState({
      visible1: false,
      update:'',
    });

   
       window.location.reload(true);}
        })
        .catch(err=>console.log(err))


     }

 

}
handleOk3=()=>{
 this.setState({
      visible3: false,
       merge:'',
    });


}
handleCancel2=()=>{

        this.setState({
      visible1: false,
       update:'',
    });


 }
 handleCancel3=()=>{

        this.setState({
      visible3: false,
       merge:'',
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



zhansh=(orderNo)=>{

       sessionStorage.setItem('orderNo',orderNo);
      sessionStorage.setItem('choice',3);
 


      window.location.reload(true);


}


update=(value)=>{

   
 
  this.state.data2.map((item,index)=>

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
merge=(value)=>{

 
  this.state.data2.map((item,index)=>

       {if(item.id==value)
       {
        this.setState({
         
                merge:value,
                visible3:true,

          })  
 
       }

}

    )



}
remove=(value)=>{

  let access_token=sessionStorage.getItem('access_token');
       let    token_type=sessionStorage.getItem('token_type');

        let  id=value;
axios.get(`${url}/Organization/Remove/${id}`,{headers:{
            Authorization: `${ token_type } ${ access_token }`
          }})
   .then(res=>{if(res.data.message=="Please Login First."){

         message.info('用户信息失效，请重新登录！')

     }else{
         alert('办事处删除成功');
       window.location.reload(true);}
        })
        .catch(err=>alert('办事处删除失败'))



}
upload=(value)=>{

     sessionStorage.setItem('upload',value);
    
     sessionStorage.setItem('choice',5);
     window.location.reload(true);

}
useradd=()=>{




     this.setState({
         visible:true,

     });
  
}
handle=(value,value1)=>{
  console.log(value1+'  '+value);
    
}
  render() {
      
    const columns = [{
  title: '序号',
  align:'center',
  dataIndex: 'idx',
  key: 'idx',
},{
  title: '办事处名称',
  align:'center',
  dataIndex: 'name',
  key: 'name',
},  {
  title: '办事处地址',
  align:'center',
  dataIndex: 'address',
  key: 'address',
},{
  title: '办事处电话',
  align:'center',
  dataIndex: 'phoneNo',
  key: 'phoneNo',
}, {
  className:'action',
  align:'center',
  title: '操作',
  key: 'action',
  render: (text, record) => (
   <span>
      <a  onClick={this.merge.bind(this,record.id)}>合并</a>
      <Divider type="vertical" />
      <a  onClick={this.update.bind(this,record.id)}>修改</a>
      <Divider type="vertical" />
      <a onClick={this.remove.bind(this,record.id)}>删除</a>
    </span>
  ),
}];






    return (
          <div  >
          <div style={{'float':'left'}}>
            
             <Select id="map"  style={{'width':'150px'}} defaultValue="0" onChange={this.map}>
               <Option  key='0'   value='0'>所有大区</Option>
         {this.state.data.length==0?

            '' :this.state.data.map((item,index)=>
                <Option  key={index+1}   value={item.id} >{item.area}</Option>
                
                )}
        </Select>

            &nbsp;&nbsp;
          <Button   onClick={this.useradd.bind()}>添加办事处</Button> &nbsp;&nbsp;&nbsp;&nbsp; <a   onClick={this.upload.bind(this,2)} >文档导入</a>
          </div>
          <br/><br/>
          <Modal 
          className="adduser"
                title="办事处添加"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width='350px'
                okText='确定'
            cancelText='取消'>
            <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>选择大区：&nbsp;&nbsp;&nbsp;&nbsp;
               <Select className="map"  style={{'width':'150px'}}  onChange={this.map1}>
               
         {this.state.data.length==0?

             '':this.state.data.map((item,index)=>
                <Option  key={index+1}   value={item.id} >{item.area}</Option>
                
                )}
        </Select></p>
            <p style={{'lineHeight':'40px','textAlign':'left'}}>办事处名称：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}}  className='account'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>办事处地址：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}}  className='address'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>办事处电话：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}}  className='phoneNo'/></p>
            
              </div>
              </Modal>
              {this.state.update==''? '':

                   this.state.data2.map((item,index)=>

              item.id==this.state.update?
                  
               
                 <Modal 
                 className="adduser"
                title="修改办事处"
                visible={this.state.visible1}
                onOk={this.handleOk2}
                onCancel={this.handleCancel2}
                width='350px'
                okText='确定'
                  cancelText='取消'>
                <div  className="add-user">
                <p style={{'lineHeight':'40px','textAlign':'left'}}>选择大区：&nbsp;&nbsp;&nbsp;&nbsp;
               <Select className="map"  style={{'width':'150px'}}  onChange={this.map2}  >
               
         {this.state.data.length==0?

            '':this.state.data.map((item,index)=>
                <Option  key={index+1}   value={item.id} >{item.area}</Option>
                
                )}
        </Select></p>
            <p style={{'lineHeight':'40px','textAlign':'left'}}>办事处名称：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}} defaultValue={item.name} className='account2'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>办事处地址：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}} defaultValue={item.address} className='address2'/></p>
               <p style={{'lineHeight':'40px','textAlign':'left'}}>办事处电话：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}} defaultValue={item.phoneNo} className='phoneNo2'/></p>
            
              </div>
               </Modal>:''
       
 
       



    )
                  


            }
             
   {this.state.merge==''? '':

                   this.state.data2.map((item,index)=>

              item.id==this.state.merge?
                  
               
                 <Modal 
                 className="adduser"
                title="合并办事处"
                visible={this.state.visible3}
                onOk={this.handleOk3}
                onCancel={this.handleCancel3}
                width='350px'
                 style={{'textAlign':'center'}}
                okText='确定'
                  cancelText='取消'>
                <div  >
                
            <p style={{'lineHeight':'40px','textAlign':'center'}}>办事处名称：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}} defaultValue={item.name} className='account2'/></p>
               <p style={{'lineHeight':'40px','textAlign':'center'}}>其他办事处： 
                <Select
                 
                   style={{ width: '150px' }}
                   placeholder="请选其他办事处"
                    mode="multiple"
                   onChange={this.handle.bind(this,1)}
                >
               
                  { this.state.data2.map((item,index)=>

                         item.id==this.state.merge ?  '':<Option key={index} value={item.id}>{item.name}</Option>

                      )}
                    </Select>&nbsp; &nbsp;</p>
               <p style={{'lineHeight':'40px','textAlign':'center'}}>合并后名称：
              <Input type="text" style={{'lineHeight':'30px','width':'150px'}} defaultValue={item.phoneNo} className='newname'/></p>
            
              </div>
               </Modal>:''
       
 
       



    )
                  


            }



             <Table columns={columns} dataSource={this.state.data3} />
          </div>
        );
  }
}

export default regiont;