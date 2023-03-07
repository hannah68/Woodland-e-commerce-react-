import { useState, useEffect } from "react";

import FeatureSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";

import "../styles/Home.css";

import { APIEndPoints } from "../utils/config";

const Home = () => {
	const [featuredItems, setFeaturedItems] = useState([]);

	// use effect for fetching featured item from json====================
	useEffect(() => {
		try {
			const fetchFeaturedItems = async () => {
				const res = await fetch(APIEndPoints.shop);
				const data = await res.json();
				const cleanData = data.filter((item) => item.feature === true);
				setFeaturedItems(cleanData);
			};
			fetchFeaturedItems();
		} catch (error) {
			console.log("could not fetch featured items from db file!");
		}
	}, []);

	return (
		<div className="home-section">
			<HeroSection />
			<FeatureSection featuredItems={featuredItems} />
		</div>
	);
};

export default Home;
