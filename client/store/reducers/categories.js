import axios from 'axios';
import history from '../../history';

//Initial state
//const categories = [];
const category = [];

//Action Types
//const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';


//Action Creators
//const getCategories = categories => ({type: GET_CATEGORIES, categories});
const getCategory = category => ({type: GET_CATEGORY, category});


//Thunk creators
export const fetchCategory = () =>
	dispatch =>
		axios.get(`/api/categories/${category.id}`)
			.then(res => {
				consol.log("I am still alive ")
				dispatch(getCategory(res.data ))})
			.catch(err=> console.log(err));

// export const fetchCategories = () =>
// 	dispatch =>
// 		axios.get('/api/categories')
// 			.then(res => {
// 				console.log("main data ", res.data);
// 				dispatch(getCategories(res.data || categories))})
// 			.catch(err=> console.log(err));
	


//Reducer
export default function (state = category, action) {
	switch (action.type) {
		case GET_CATEGORY:
			return action.category;
		// case GET_CATEGORIES:
		// 	return action.categories;
		default:
			return state;
	}
}