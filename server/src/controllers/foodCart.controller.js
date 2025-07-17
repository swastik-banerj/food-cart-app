import { FoodCartItems } from "../models/FoodCartItems.model.js";


// Add food item to cart
export const addItemToCart = async (req, res) => {
    try {

        const user = req.user._id;

        const { item } = req.body;

        if (!user || !item) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        let cart = await FoodCartItems.findOne({ user });

        if (cart) {
            // Check if item with same name exists
            const existingItemIndex = cart.items.findIndex(i => i.name === item.name);

            if (existingItemIndex !== -1) {
                // Item exists - increment quantity
                cart.items[existingItemIndex].quantity += 1;
            } else {
                // Add new item
                cart.items.push(item);
            }

            cart.calculateTotalPrice();

            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated",
                cart
            });
        } else {
            // No cart exists — create new
            const newCart = new FoodCartItems({
                user,
                items: [item],
                totalPrice: item.price * (item.quantity || 1)
            });

            await newCart.save();

            return res.status(201).json({
                success: true,
                message: "Cart created",
                cart: newCart
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// clear cart

export const clearCart = async (req, res) => {
    // delete the entire cart

    try {

        const userId = req.user._id;

        let cart = await FoodCartItems.findOne({ user: userId });

        if (!userId || !cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found or user ID missing"
            });
        }

        else { // delete cart

            await FoodCartItems.deleteOne({ user: userId });

            return res.status(200).json({
                success: true,
                message: "Cart cleared successfully"
            });
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
