import db from "../config/db.js";

export const createOrder = async (req, res) => {
  const { user_id, items, total_amount } = req.body;

  try {
    // Insert into orders
    const orderResult = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id",
      [user_id, total_amount]
    );

    const orderId = orderResult.rows[0].id;

    // Insert items
    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES ($1, $2, $3, $4, $5)",
        [orderId, item.id, item.size, item.quantity, item.price]
      );
    }

    res.status(201).json({ success: true, orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
};
