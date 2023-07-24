import {FaShoppingCart} from 'react-icons/fa'
import {Container, FormControl, Navbar, Nav, Button, Dropdown, Badge} from 'react-bootstrap'
import { AiFillDelete } from "react-icons/ai";
import { Link,  } from 'react-router-dom'

import { CartState } from '../Context/Context'

const Header = () => {
    const {state: {cart}, dispatch, productDispatch} = CartState();
    // console.log(cart.length); // 0
    return (
    <Navbar bg="dark" variant="dark" style={{height: 80}}>
        <Container>
            <Navbar.Brand>
                <Link to="/">Shopping Cart</Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl
                    placeholder='Search here ...'
                    style={{width: 500}}
                    className='m-auto'
                    onChange={(e) => {
                        productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value,
                        });
                    }}
                />
            </Navbar.Text>
            <Nav>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                        <FaShoppingCart color="white" fontSize="25px"/>
                        <Badge>{cart.length}</Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: 370 }}>
                        {cart.length > 0 ? (
                            <>
                                {cart.map((prod) => (
                                    <span className="cartitem" key={prod.id}>
                                    <img
                                        src={prod.image}
                                        className="cartItemImg"
                                        alt={prod.name}
                                    />
                                    <div className="cartItemDetail">
                                        <span>{prod.name}</span>
                                        <span>₹ {prod.price.split(".")[0]}</span>
                                    </div>
                                    <AiFillDelete
                                        fontSize="20px"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: prod,
                                            })
                                        }
                                    />
                                    </span>
                                ))}
                                <Link to="/cart">
                                    <Button style={{ width: "95%", margin: "0 10px" }}>
                                    Go To Cart
                                    </Button>
                                </Link>  
                            </>
                        ): (
                            <span style={{padding: 10}}> Cart is Empty! </span>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header