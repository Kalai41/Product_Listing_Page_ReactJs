import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Filter from "./Components/Filter";
import BreadCrumb from "./Components/BreadCrumb";
import Products from "./Components/Products";

const App = () => {
	const [productList, setProductList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getData = async () => {
		try {
			setProductList([]);
			const response = await axios.get("http://c132-157-46-108-72.ngrok.io/api/products");
			setProductList(response.data);
			console.log(response);
			return response.data;
		} catch (err) {
			throw err;
		}
	};

	const filterData = async (start, end) => {
		let filterList = [];
		productList.forEach((i) => {
			if (i.price >= start && i.price <= end) {
				filterList.push(i);
			}
		});
		setProductList(filterList);
	};

	const sortData = async (order) => {
		let sortList = productList;
		if (!order) {
			await sortList.sort((a, b) => {
				if (a.price < b.price) {
					return 1;
				}
				if (a.price > b.price) {
					return -1;
				}
			});
		} else {
			await sortList.sort((a, b) => {
				if (a.price < b.price) {
					return -1;
				}
				if (a.price > b.price) {
					return 1;
				}
			});
		}
		await setProductList([]);
		await setProductList(sortList);
		console.log(productList);
	};

	const searchData = async (data) => {
		let searchList = [];
		productList.forEach((i) => {
			if (i.productName.indexOf(data) !== -1) {
				searchList.push(i);
			}
		});
		setProductList(searchList);
	};
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				await getData();
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<div className='Appjs'>
			<Header searchHandler={searchData} />
			<div className='main-page'>
				<div className='row'>
					<BreadCrumb />
				</div>
				<div className='row'>
					<Filter
						filterHandler={filterData}
						sortHandler={sortData}
						getDataHandler={getData}
					/>
					{!isLoading ? <Products list={productList} /> : " "}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default App;
