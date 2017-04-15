import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Login.css";


export function Login( { } ) {
	// const products = featuredProducts.map( product => (
	// 	<FeaturedProduct
	// 		addToCart={ () => addToCart( product.id ) }
	// 		description={ product.description }
	// 		key={ product.id }
	// 		logo={ product.logo }
	// 		name={ product.name }
	// 		onSale={ product.onSale }
	// 		price={ product.price }
	// 	/>
	) );

	return (
		<main className="landing">
			{/* <h1>Featured Products</h1>
			<div className="landing__products-wrapper">
				{ products }
			</div>

			<Link to="/shop"><h1 className="landing__full-shop-link">Take me to the full shop!</h1></Link> */}
		</main>
	);
}

function mapStateToProps( {  } ) {
	return {  };
}

export default connect( mapStateToProps)( Login );
