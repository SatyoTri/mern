// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const { authMiddleware } = require('../middleware/auth');

// Get the cart for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        // Collect all productIds from cart items
        const productIds = cart.items.map(item => item.productId);

        // Fetch all products related to the productIds
        const products = await Product.find({ _id: { $in: productIds } });

        // Map products to items in the cart
        const populatedCart = {
            _id: cart._id,
            userId: cart.userId,
            items: cart.items.map(item => {
                // Find the corresponding product for each item
                const product = products.find(prod => prod._id.equals(item.productId));
                return {
                    _id: item._id,
                    productId: product, // Attach the entire product object
                    quantity: item.quantity
                };
            })
        };

        res.send(populatedCart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add an item to the cart
router.post('/', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;;

    // Validasi input
    if (!productId || !quantity) {
        return res.status(400).send({ message: 'ProductId and quantity are required' });
    }

    try {
        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Update the quantity of an item in the cart
router.put('/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.equals(productId));
        if (!item) {
            return res.status(404).send({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Remove an item from the cart
router.delete('/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
