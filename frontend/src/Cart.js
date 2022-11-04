import axios, * as others from 'axios';

const baseURL = "http://localhost:3000";

function Cart({ cart, products, setError, updateCart }) {
    const decreaseQty = async (id, qty) => {
        if (qty > 1) {
            try {
                await axios.put(`${baseURL}/api/cart/${id}/${qty-1}`);
                updateCart();
            } catch(error) {
                setError("error adding a task: " + error);
                console.log(error)
            }
        } else {
            alert("You cannot decrease the quantity below 1! Try removing this item from the cart.")
        }
    }

    const increaseQty = async (id, qty) => {
        try {
            await axios.put(`${baseURL}/api/cart/${id}/${qty+1}`);
            updateCart();
        } catch(error) {
            setError("error adding a task: " + error);
            console.log(error)
        }
    }

    return (
        <>
        {cart.map(item => (
            <div key={item.id} className="flex">
                <p>{products.find(e => e.id == item.id).name}, {item.quantity}</p>
                <button className='margin-left' onClick={e=>decreaseQty(item.id, item.quantity)}>-</button>
                <button onClick={e=>increaseQty(item.id, item.quantity)}>+</button> 
                <button className='margin-left'>Remove from cart</button> 
            </div> 
        ))}
        </>
    );
}

export default Cart;
