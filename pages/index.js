import Head from 'next/head'
import Image from 'next/image'
import { Layout,Button } from 'antd'
// import { Footer, Header } from 'antd/es/layout/layout'
import { Space, Table, Tag } from 'antd';
import  {PlusCircleOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalCustom from '../component/Modal';
import EditModal from '../component/EditModal';
export default function Home() {
  const [open, setOpen] = useState(false);
  const [user,setUser]=useState([])
  const {Footer,Header,Content}= Layout;


const [EditOpen,setEditOpen]=useState(false);
const [userEdit,setUserEdit]=useState({});



useEffect(() => {
  
  axios.get('http://crudserver.ministerwtf.repl.co').then((res) => {
   setUser(res.data);
   console.log(res.data);
}).catch((err) => {
  console.log(err);
});




  }, [user.length]);










  const showModal = () => {
    setOpen(true);
  };



  const showEditModal = () => {
    setEditOpen(true);
  };








const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Hobbies',
    key: 'hobbies',
    dataIndex: 'hobbies',
    render: (_,{hobbies}) => (
      <>
        {hobbies.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_,record) => (
      <Space size="middle">
       <Button type='primary' className='text-black bg-yellow-300 hover:bg-yellow-700'
        onClick={()=>{
          setUserEdit(record);
          console.log(record);
          setEditOpen(true);
        }}
       
       
       >edit</Button>
       <Button type='dashed' onClick={()=>{

        axios.delete(`http://crudserver.ministerwtf.repl.co/${record._id}`).then((res) => {
          console.log(res.data);  
      }).catch((err) => {
        console.log(err);
      });
   const newUser = user.filter((item) => item._id !== record._id);
    setUser(newUser);
        }}
       



     >delete</Button>
      
      </Space>
    ),
  },
];
















  
  return (
   <>
     <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalCustom open={open} setOpen={setOpen}   user={user} setUser={setUser}/>
      <EditModal openEdit={EditOpen} setEditOpen={setEditOpen} userEdit={userEdit} user={user} setUser={setUser}/>
   <Layout>
     
     <Header><a href={`mailto:info@redpositive.in?subject='alldata'&body=${user.map(data=>{
      return `\n Name: ${data.name} Phone: ${data.phone} Email: ${data.email} Hobbies: ${data.hobbies} \n`

     })}` }className='text-white'>Click to Send an Email</a></Header>
     <Content>
 
 <div className='w-full flex items-end p-2'><Button onClick={showModal}><PlusCircleOutlined /></Button></div>
 <Table columns={columns} dataSource={user}  pagination={{ pageSize: 7 }} />
 
     </Content>
     <Footer>footer</Footer>
    </Layout>
   </>
  )
}
