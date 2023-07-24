import Filter from "./Filter"
import SingleProduct from "./SingleProduct"

import './style.css'

import { CartState } from "../Context/Context"

const Home = () => {
  const {
    state: {products},
    productState: {sort, byStock, byFastDelivery, byRating, searchQuery}
  } = CartState();
  console.log("products",products);
  console.log("products",{sort, byStock, byFastDelivery, byRating});

  const transformProducts = () => {
    let sortedProducts = products;

    if(sort) {
      sortedProducts = sortedProducts.sort((a,b) => 
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if(!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings === byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;

  }

  return (
    <div className="home">
      <Filter className="filter"/>
      <div className="productContainer">
        {
          transformProducts().map((prod) => {
            return <SingleProduct key={prod.id} prod={prod}/>
          })
        }
      </div>
    </div>
  )
}

export default Home