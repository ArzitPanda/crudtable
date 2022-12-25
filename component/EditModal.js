import React, { useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { Input,Tag } from 'antd';
import axios from 'axios';
import { CloseCircleOutlined } from '@ant-design/icons';
const EditModal= ({openEdit,setEditOpen,userEdit,setUserEdit,user,setUser}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [hobbies,setHobbies] = useState(userEdit.hobbies);
  const [hobby,setHobby] = useState();
  const [email,setEmail] = useState();
const [number,setNumber] = useState();
    const [name,setName] = useState();

  const showModal = () => {
    setEditOpen(true);
  };




useEffect(()=>{



axios.get(`https://crudserver.ministerwtf.repl.co/${userEdit._id}`).then((res) => {
    console.log(res.data);
    setName(res.data.name);
    setEmail(res.data.email);
    setNumber(res.data.phone);
    setHobbies(res.data.hobbies);
}).catch((err) => {
    console.log(err);
});




},[userEdit])




  const handleOk = () => {
  
    setConfirmLoading(true);
  console.log("err");
        axios.post(`http://crudserver.ministerwtf.repl.co/update/${userEdit._id}`, {
            name:name,
            email:email,
            phone:number,
            hobbies:hobbies,
        }).then((res) => {
            console.log(" all ok");
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });


            setUser(user.map((item)=>{
                if(item._id===userEdit._id){
                    return {
                        ...item,
                        name:name,
                        email:email,
                        phone:number,
                        hobbies:hobbies,
                    }
                }
                return item;
            }))


        setEditOpen(false);
        setConfirmLoading(false);
        setHobbies([]);
        setHobby('');
        setEmail('');
        setNumber('');
        setName('');
        


   
     
  
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setEditOpen(false);
  };




const removeHobby=(index)=>{
    const newHobbies=[...hobbies];
    newHobbies.splice(index,1);
    setHobbies(newHobbies);
}



  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        width={500}
        title="update your details"
        open={openEdit}
        onOk={handleOk}
        okText="update"
        okButtonProps={{ type:'dashed' }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        
    <Space  direction='vertical' size="middle" style={{ display: 'flex' }} >
    <Input placeholder="name" type='text' value={name}  
    
    
    defaultValue={userEdit.name} 
     onChange={(e)=>{setName(e.target.value)}}/>

<Input placeholder="email" type='email' defaultValue={userEdit.email}  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
<Input placeholder="number" type='number' defaultValue={userEdit.phone}  value={number} onChange={(e)=>{setNumber(e.target.value)}}/>

<div className="flex flex-row items-center justify-start">
{hobbies && hobbies.map((hobby,index)=>{
    return (<Tag color="magenta" className='flex flex-row items-center justify-center' key={index}><Space> {hobby} <CloseCircleOutlined size={6}  onClick={()=>removeHobby(index)}/></Space> </Tag>)
})}
</div>
<Input placeholder="hobbies add enter to h0bby" type='text' value={hobby} onChange={(e)=>{setHobby(e.target.value)}}   onKeyDown={(e)=>{
    if(e.key==='Enter'){
        setHobbies([...hobbies,hobby])
        setHobby('')
    }
}} />
    </Space>
      
      
      </Modal>
    </>
  );
};
export default EditModal;