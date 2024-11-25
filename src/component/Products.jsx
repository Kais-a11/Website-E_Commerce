import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [data, setData] = useState([]); // Stocker les données des produits
    const [filter, setFilter] = useState([]); // Stocker les données filtrées
    const [loading, setLoading] = useState(false); // Gérer l'état de chargement

    useEffect(() => {
        let componentMounted = true; // Gérer l'état du composant (monté ou démonté)

        const getProducts = async () => {
            setLoading(true); // Définir le chargement à `true`
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) throw new Error("Failed to fetch"); // Vérifier les erreurs HTTP

                const products = await response.json();
                if (componentMounted) {
                    setData(products); // Stocker les données
                    setFilter(products); // Initialiser le filtre avec les données complètes
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setLoading(false); // Arrêter le chargement
            }
        };

        getProducts();

        return () => {
            componentMounted = false; // Cleanup pour éviter les erreurs sur les composants démontés
        };
    }, []); // Exécuter uniquement au montage du composant

    const Loading = () => {
        return (
        <>
        <div className="col-md-3">
        <Skeleton height={350}/>
        </div>

        <div className="col-md-3">
        <Skeleton height={350}/>
        </div>

        <div className="col-md-3">
        <Skeleton height={350}/>
        </div>

        <div className="col-md-3">
        <Skeleton height={350}/>
        </div>

        <div className="col-md-3">
        <Skeleton height={350}/>
        </div>
        
        </>
        );
    };

    const filterProduct= (cat) =>{
        const updatedList = data.filter((x)=>x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)} >All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("electronics")}>Electronics</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("Jewelry")}>Jewelry</button>
                </div>
                <div className="row">
                    {filter.map((product) => {
                        return (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card h-100 text-center p4" key={product.id}>
                                    <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.title.substring(0,12)}...</h5>
                                        <p className="card-text lead fw-bold">${product.price}</p>
                                        <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                                            Buy Now
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;
