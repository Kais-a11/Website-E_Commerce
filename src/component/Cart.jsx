import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
    // Obtenir les données du panier depuis Redux
    const cart = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();

    // Fonction pour gérer l'augmentation ou la diminution de la quantité
    const handleButton = (product, action) => {
        if (action === "increase") {
            dispatch({ type: "ADDITEM", payload: product });
        } else if (action === "decrease") {
            dispatch({ type: "DELITEM", payload: product });
        }
    };

    return (
        <div className="container my-5">
            {cart.length === 0 ? (
                <h3 className="text-center mt-5">Your Cart is Empty!</h3>
            ) : (
                <>
                    <h3 className="text-center mb-4">Your Shopping Cart</h3>
                    {cart.map((product) => (
                        <div className="row my-4 border-bottom pb-3" key={product.id}>
                            {/* Image du produit */}
                            <div className="col-md-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    height="200px"
                                    width="180px"
                                />
                            </div>

                            {/* Détails du produit */}
                            <div className="col-md-4">
                                <h3>{product.title}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} X ${product.price.toFixed(2)} = $
                                    {(product.qty * product.price).toFixed(2)}
                                </p>

                                {/* Boutons d'action */}
                                <button
                                    className="btn btn-outline-dark me-4"
                                    onClick={() => handleButton(product, "decrease")}
                                >
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleButton(product, "increase")}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
