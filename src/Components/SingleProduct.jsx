import { Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Rating from './Rating'

import { CartState } from '../Context/Context'

// id, name, price, image, inStock, fastDelivery, rating
// inStoke - 4,3,2,4
// fastDelivery - false, true

const SingleProduct = ({prod}) => {

  const {state: {cart}, dispatch} = CartState();
  console.log(cart);
  
  return (
    <div className='products'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={prod.image} />
      <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span>₹{prod.price.split('.')[0]}</span>
          {
            prod.fastDelivery ? (<div>Fast Delivery</div>) : (<div>4 days delivery</div>)
          }

          <Rating rating={prod.ratings}/>
        </Card.Subtitle>

        {
          cart.some((p) => p.id === prod.id) ? 
          (
            <Button 
              variant='danger' 
              onClick={() => dispatch(
                {
                  type: "REMOVE_FROM_CART",
                  payload: prod
                }
              )}
            >
              Remove From Cart
            </Button>
          ) : (
            <Button  
              onClick={() => dispatch(
                {
                  type: "ADD_TO_CART",
                  payload: prod
                }
              )}
              disabled={!prod.inStock}
            >
              {prod.inStock ? "Add To Cart" : "Out Of Stock"}
            </Button>
          )
        }
      </Card.Body>
    </Card>
    </div>
  )
}

SingleProduct.propTypes = {
    prod: PropTypes.object.isRequired,
}

export default SingleProduct


