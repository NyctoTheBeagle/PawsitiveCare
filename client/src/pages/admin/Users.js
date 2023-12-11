import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {
  const [ users, setUsers ] = useState([])

  //get users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  //antD table col
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email', 
    },
    {
      title: 'Member',
      dataIndex: 'isMember',
      render: (text, record) => (
        <span>{record.isMember ? 'Yes' : 'No' }</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          <button className='btn btn-danger w-50'>Block <i class="pl-2 fa fa-ban"></i></button>
        </div>
      ),
    },
  ];
  return (
    <Layout style={{ margin: 0, padding: 0 }}>
        <div style={{ backgroundColor: '#E8F4FE', minHeight: '100vh', padding: '1px' }}>
       <h1 className='text-center text-3xl font-bold mt-24 mb-4'><span class='text-warning'>Guests</span> <span class='text-primary'>List</span></h1>
        <Table className='ml-10 mr-10 mt-3' columns={columns} dataSource={users} />
      </div>
    </Layout>
  )
}

export default Users