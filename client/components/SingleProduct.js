import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/products'
import { addToCart } from "../store/cart";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {isAdmin} = this.props
    const product = this.props.product
    return (

      <div className="single-product">
        <h3> {product.title} </h3>
        {isAdmin && (
          <Link to={`/products/${product.id}/update`}>
            <button type="button">Update product</button>
          </Link>
        )}

        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
        <p>{product.inventoryQty > 0 ? `In stock: ${product.inventoryQty}` : 'Out of Stock' }</p>
        <img src={product.photoUrl} />
        <p>{product.inventoryQty > 0 && <button onClick={() => this.props.addToCart(product)}>Add to Cart</button>}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.singleProduct,
    isAdmin: state.auth.isAdmin,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id))
    },
    loadInitialData() {
      dispatch(me())
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
