import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import  'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './orders.css';

class Orders extends Component {
  state = {
    orders: []
  }
  componentDidMount() {
    axios.get('http://demo6478261.mockable.io/tasks/orders')
      .then(res => {
        const orders = res.data;
        this.setState({ orders });
      }).catch(err => { console.error(err) })
  }
  render() {
    const { orders } = this.state;
    let  customerName= orders.map(clientName => clientName.name);
    let orderID =orders.map(ID => ID.id);
    let Address=orders.map(address=> address.address)
    let order_price=orders.map(price => price.order_price) ;
    let discount =orders.map(discount => discount.discount);
    let total_price=orders.map(total=>total.total_price)
    let data=[];
      data.push({
        id: orderID[orderID.length],
        name:customerName[customerName.length],
        address:Address[Address.length],
        order_price:order_price[order_price.length],
        Discount:discount[discount.length],
        total_price:total_price[total_price.length]

      })
      let columns = [
        { text: 'ID', dataField: 'id' },
        { text: 'Customer Name', dataField: 'name'  },
        {text: 'Address', dataField:'address'},
        {text: 'Order_Price', dataField:'order_price'},
        {text: 'Discount', dataField: 'discount'},
        {text:'Total_Price',dataField :'total_price'}

      ];
      const options = {
        paginationSize: 2,
        pageStartIndex: 1,
        nextPageText: '>>>',
        prePageText:'<<<',
        sizePerPageList: [{
          text: '20', value: 20
        },{
          text: 'All', value: orders.length
        }]
      };
    return (
      <Container>
        <Row>
          <Col xs="12" md="12">
          <div className="Content">
            <BootstrapTable
             keyField='id'
              data={ orders } 
              columns={ columns } 
              hover
              pagination={ paginationFactory(options) }
              />
            </div>
          </Col>
        </Row>
        </Container>
    );
  }
}
export default Orders;