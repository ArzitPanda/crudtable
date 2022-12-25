import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { Input,Tag } from 'antd';
import axios from 'axios';
const ModalCustom = ({open,setOpen,user,setUser}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [hobbies,setHobbies] = useState([]);
  const [hobby,setHobby] = useState('');
  const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');
    const [name,setName] = useState('');

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
  
    setConfirmLoading(true);

        axios.post('https://crudserver.ministerwtf.repl.co', {
            name:name,
            email:email,
            phone:number,
            hobbies:hobbies,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });

setUser([...user,{name:name,email:email,phone:number,hobbies:hobbies}]);

        setOpen(false);
        setConfirmLoading(false);
        setHobbies([]);
        setHobby('');
        setEmail('');
        setNumber('');
        setName('');



   
     
  
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        width={500}
        title="enter your details"
        open={open}
        onOk={handleOk}
        okText="Submit"
        okButtonProps={{ disabled: hobbies.length===0 ,type:'dashed' }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        
    <Space  direction='vertical' size="middle" style={{ display: 'flex' }} >
    <Input placeholder="name" type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>

<Input placeholder="email" type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
<Input placeholder="number" type='number' value={number} onChange={(e)=>{setNumber(e.target.value)}}/>

<div>
{hobbies.map((hobby,index)=>{
    return (<Tag color="magenta" key={index}>{hobby}</Tag>)
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
export default ModalCustom;