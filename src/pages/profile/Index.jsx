import { Tabs } from 'antd'
import React from 'react'
import Products from './Products'
import AddProducts from './AddProducts'

const Index = () => {
    const items = [
        {
            key: '1',
            label: 'Products',
            children: <Products />,
        },
        {
            key: '2',
            label: 'Add Product',
            children: <AddProducts />,
        },
        {
            key: '3',
            label: 'Notifications',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '4',
            label: 'Profile',
            children: 'Content of Tab Pane 3',
        }
    ]

  return (
    <Tabs defaultActiveKey="1" items={items} tabPosition='left' />
  )
}

export default Index
