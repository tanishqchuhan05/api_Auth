const orderService = require("../services/orderServices");
const MESSAGES = require("../utilities/messagesUtils");

const createOrder = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: MESSAGES.ERROR.UNAUTHORIZED_USER });
        }

        const { movieId, transactionId, quantity } = req.body;
        const userId = req.user.id;

        const newOrder = await orderService.createOrder(userId, movieId, transactionId, quantity);

        res.status(201).json({ message: MESSAGES.SUCCESS.ORDER_CREATED, order: newOrder });

    } catch (error) {
        res.status(500).json({ message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR, error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders(req.user.id);
        res.status(200).json({ message: MESSAGES.SUCCESS.ORDERS_FETCHED, orders });

    } catch (error) {
        res.status(500).json({ message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR });
    }
};

const getTotalRevenue = async (req, res) => {
    try {
        const totalRevenue = await orderService.getTotalRevenue();
        res.status(200).json({ message: MESSAGES.SUCCESS.TOTAL_REVENUE_FETCHED, totalRevenue });

    } catch (error) {
        res.status(500).json({ message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR });
    }
};

module.exports = { createOrder, getOrders, getTotalRevenue };
