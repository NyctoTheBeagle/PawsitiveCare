import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'


const Members = () => {
  const [members, setMembers] = useState([])
    //get users
    const getMembers = async () => {
      try {
        const res = await axios.get('/api/v1/admin/getAllMembers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          setMembers(res.data.data);
        }
      } catch (error) {
        console.log(error)
      }
    }

//handle account
const handleAccountStatus = async (record, status) => {
  try {
    const res = await axios.post('/api/v1/admin/changeAccountStatus', 
    {memberId: record._id, userId : record.userId, status:status}, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (res.data.success) {
      message.success(res.data.message)
      window.location.reload();
    }
  } catch (error) {
    console.log(error)
    message.error('Something went wrong')
  }
}

    useEffect(() => {
      getMembers();
    }, []);

    const columns = [
      {
        title: 'Name',
        dataIndex:'ownersName',
        render: (text, record) => (
          <span>{record.ownersName}</span>
        )
      },
      {
        title: 'Phone',
        dataIndex: 'phone'
      },
      {
        title: 'Pets name',
        dataIndex: 'petsName'
      },
      {
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <div className='d-flex justify-content-center'>
            {record.status === 'pending' ? (<button className='btn btn-success' onClick={() => handleAccountStatus(record, "Approved")}>Approve</button>
            ) : (
            <button className='btn btn-danger w-50'>Reject <i class="pl-1 fa fa-close"></i></button>)}
          </div>
        ),
      },
    ]
  return (
    <Layout style={{ margin: 0, padding: 0 }}>
      <div style={{ backgroundColor: '#E8F4FE', minHeight: '100vh', padding: '1px' }}>
        <h1 className='text-center text-3xl font-bold mt-24 mb-4'><span class='text-primary'>Members</span> <span class='text-warning'>List</span></h1>
        <Table className='ml-10 mr-10' columns={columns} dataSource={members} />
      </div>
    </Layout>
  )
}


export default Members