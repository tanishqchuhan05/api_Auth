import axiosInstance from "../utils/axiosInstance";
import URLS from "../utils/urls";

export const processPayment = async ({ 
    userId, selectedMovie, ticketCount, totalAmount, 
    setTransactionId, setPaymentSuccess, setLoading, handleClose 
}) => {
    setLoading(true);

    setTimeout(async () => {
        const fakeTransactionId = `TXN${Math.floor(Math.random() * 1000000)}`;
        setTransactionId(fakeTransactionId);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to be logged in to make a payment.");
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post(
                URLS.USER.CREATE, 
                {
                    userId,
                    movieId: selectedMovie?._id,
                    transactionId: fakeTransactionId,
                    quantity: ticketCount,
                    totalAmount,
                    status: "confirmed",
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 201) {
                setPaymentSuccess(true);
                setTimeout(() => {
                    handleClose();
                    window.location.href = "/orders";
                }, 5000);
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to place order. Try again.");
        }

        setLoading(false);
    }, 2000);
};
