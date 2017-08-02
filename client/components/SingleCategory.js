// import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter, NavLink } from 'react-router-dom'; 
// import store, {fetchCategory} from '../store';

// function SingleCategory (props) {
// 	console.log("Start")
// 	const {category, path} = props;
// 	//const singleCat = category.filter(cat => {return (Number(cat.id === Number(path.categoryId)))})[0]
// 	console.log("ans",category["name"])
// 	return (
// 	        <div>
		        
// 		          	{category}
		          
// 		      </div>
// 	       )
// }

// const mapStateToProps = function(state, ownProps) {
// 	console.log("I am dead", state.categories)
// 	const ansMain = fetchCategory()
// 	console.log("not actually", ansMain)
// 	return {
// 		category: state.categories,
// 		path: ownProps.match.params,
// 		products: state.products
// 	};
// };

// const mapDispatchToProps = function(dispatch){
// 	return {
// 		somefunction: {
// 			fetchCategory()
// 		}
// 	}
// }

// export default withRouter(connect(mapStateToProps)(SingleCategory));



import React, {Component} from 'react';
import axios from 'axios';
export default class SingleCategory extends Component {
	constructor(){
		super()
		this.state = {
			category: []
		}
	}
	componentDidMount (){
		const categoryId = this.props.match.params.categoryId;
		console.log("id", categoryId)
		axios.get(`/api/categories/${categoryId}`)
		.then(res => res.data)
		.then(category => {
			console.log("hey",category);
			this.setState({
			category
		})});
	}
render(){
	const category = this.state.category
	console.log("category", category)
	const cat = category.map(cate => {return cate.name})
	console.log("cat", cat);
	return (
	        <div>
	        	{
	        		category.map(cat => 
	        		  <div>
	        		  	<ul id={cat.id}>
	        		  		<li><img src={cat.imagePath} width="400" /></li>
	        		  		<li><h3>Product Name : {cat.name}</h3></li>
	        		  		<li><h3>Product Price : {cat.price}</h3></li>
	        		  		<li><h3>Product Description : {cat.description}</h3></li>
	        		  	</ul>
	        		  </div>
	        		  )
	        	}
	        </div>
	        )
}

}