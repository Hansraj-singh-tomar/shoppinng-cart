import { ListGroup, Button, Row, Col, Image, FormSelect } from "react-bootstrap"
import { CartState } from "../Context/Context"
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";


const Cart = () => {

  const {state: {cart}, dispatch} = CartState();
  const [total, setTotal] = useState(0);
  // console.log(cart[0].inStock); // 7

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    )
  }, [cart])

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {
            cart.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={prod.image} alt={prod.name} fluid rounded/>
                    </Col>
                    <Col md={2}>{prod.name}</Col>
                    <Col md={2}>{prod.price}</Col>
                    <Col md={2}>{prod.ratings}</Col>
                    <Col md={2}>
                    <FormSelect
                      onClick={(e) => 
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: prod.id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {
                        [...Array(prod.inStock)].map((_, i) => (
                          <option value={i+1} key={i+1}>{i+1}</option>
                        ))
                      }
                    </FormSelect>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            )
          }
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart