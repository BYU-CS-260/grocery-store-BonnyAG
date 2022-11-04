import axios, * as others from 'axios';

const baseURL = "http://localhost:3000";

function Product({ product, setError, updateCart }) {
    const addToCart = async (id) => {
        try {
            await axios.post(`${baseURL}/api/cart/${id}`);
            updateCart();
        } catch(error) {
            setError("error adding a task: " + error);
            console.log(error)
        }
    }
    
    return (
        <div className="flex">
            <p>{product.name} - {product.price}</p>
            <button className='margin-left' onClick={e=>addToCart(product.id)}>Add to Cart</button>
        </div>
    );
}

export default Product;
