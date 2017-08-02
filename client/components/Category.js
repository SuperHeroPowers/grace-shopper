import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store from '../store';

function Category (props) {
	const {categories} = props;
	return (
	    <div>
	    {
	    	categories.map(category => {
	    		return(
	    			<li>
	    				<h1>{category.name}</h1>
	    			</li>
	    		)
	    	})
	    }
	    </div>
	    )
}

const mapStateToProps = function(state, ownProps){
		console.log("props",state.categories)
		return {
			categories: state.categories,
		};
	};

	export default withRouter(connect(mapStateToProps)(Category));