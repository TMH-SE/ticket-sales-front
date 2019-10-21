import React from 'react'
import { Row, Col, Carousel, Layout } from 'antd'
import Banner from './banner'
import './index.scss'
import SearchRoute from './searchRoute'
import Intruduce from './intruduce'


function index(props) {
  return (
    <Layout>
      <Banner {...props} />
      <SearchRoute />
      {/* <Intruduce {...props} /> */}
    </Layout>
  )
}

export default index
