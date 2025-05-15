import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../style/Cart.css';
import { showBox, removeCart1 } from '../features/ecomSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const loginData = useSelector((data) => data.login);
    const dispatch = useDispatch();
    const [favs, setfavs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginData.length > 0) {
            getCarts();
        }
    }, [loginData]);

    const getCarts = async () => {
        const { email } = loginData[0];
        try {
            const response = await axios.post('https://shopx-backend-pffh.onrender.com/user/showcart', { email });
            setfavs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const removeCart = async ({ id }) => {
        try {
            const { email } = loginData[0];
            await axios.post('https://shopx-backend-pffh.onrender.com/user/removecart', { id, email });
            dispatch(removeCart1({ id }));
            await getCarts(); // Refresh cart from backend
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {loginData.length === 0 ? (
                <div className="container1">
                    <h1>No carts are here!</h1>
                </div>
            ) : (
                <>
                    <div className="cart-header">
                        <button onClick={getCarts} className="refresh-button">🔄 Refresh</button>
                    </div>

                    <div className="product1">
                        {favs.length === 0 ? (
                            <p>No items in cart</p>
                        ) : (
                            <p>Items in your cart</p>
                        )}
                    </div>

                    <div className="product">
                        {favs.map((val) => (
                            <div key={val.id}>
                                <img src={val.imageLink} alt={val.name} />
                                <h3>{val.name}</h3>
                                <p>{val.description}</p>
                                <h2 className="price">{val.price} $</h2>
                                <Link to="/showbox">
                                    <button
                                        onClick={() => dispatch(showBox({
                                            id: val.id,
                                            name: val.name,
                                            description: val.description,
                                            imageLink: val.imageLink,
                                            price: val.price
                                        }))}
                                    >
                                        Buy now
                                    </button>
                                </Link>
                                <button
                                    className="removecart"
                                    onClick={() => removeCart({ id: val.id })}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
