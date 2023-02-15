const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    let priceArr = [];
    const cartCharge = JSON.parse(data?.order_details).charge;
    const itemsDetails = JSON.parse(data?.items_details);
    let i = 0;

    while (i < itemsDetails.length) {
      const res = await strapi.query("api::single-item.single-item").findOne({
        where: { id: itemsDetails[i]?.cartId?.split("-")[0] },
        populate: { sizePrice: true },
        select: ["size", "price", "id", "quantity"],
      });

      let item;
      if (itemsDetails[i]?.itemDetailsId) {
        item = res?.sizePrice?.filter(
          (sp) => sp?.id == itemsDetails[i]?.itemDetailsId
        );
        priceArr.push(item[0]?.price * itemsDetails[i]?.quantity);
      } else {
        priceArr.push(itemsDetails[i]?.price * itemsDetails[i]?.quantity);
      }
      i++;
    }

    orderCost = priceArr.reduce((acc, el) => (acc += el), 0);

    console.log(orderCost, cartCharge);

    if (orderCost !== cartCharge) {
      throw new ApplicationError(
        "Looks like there are some changes related to items in your cart. Please, reload the page, review your order again, and confirm if it aligns with your needs."
      );
    }
  },

  async afterCreate(event) {
    const { result } = event;

    const email = JSON.parse(result.order_details).email;
    const charge = JSON.parse(result.order_details).charge;
    const totalItems = JSON.parse(result.order_details).totalItems;
    const name = JSON.parse(result.order_details).name;
    const company = JSON.parse(result.order_details).company;
    const phone = JSON.parse(result.order_details).phone;

    try {
      // email to client/customer
      await strapi.plugins["email"].services.email.send({
        to: email,
        from: "a2z@gmail.com",
        replyTo: "a2z@gmail.com",
        subject: "A2Z-order #123456789",
        text: "Your order received. We will contact you about order details as soon as our representative reviewed it.",
        html: `<div>
            <p>
              Your order received. We will contact you about order details as
              soon as our representative reviewed it.
            </p>

            <h4 style="color: blue">Order details:</h4>
            <p style="margin: 0">Charge: $${charge.toFixed(2)}</p>
            <p style="margin: 0">Tax: $${(charge * 0.08875).toFixed(2)}</p>
            <p style="margin: 0">Items in order: ${totalItems}</p>


            <p style="color: green">Follow the <a href="https://a2z-ui-demo.vercel.app/">link</a> to your account to view all details.</p>

            <hr />

            <p style="margin: 0">Contact us</p>
            <p style="margin: 0">3235356463</p>
            <p style="margin: 0">a2z@gmail.com</p>
          </div>`,
      });

      // email to owner/admin
      await strapi.plugins["email"].services.email.send({
        to: "a2z@gmail.com",
        from: email,
        replyTo: email,
        subject: "A2Z-order #123456789",
        text: "Your order received. We will contact you about order details as soon as our representative reviewed it.",
        html: `<div>
            <h2 style="color: blue">
              You received a new order.
            </h2>

            <hr />

            <h4 style="color: blue">Order details:</h4>
            <p style="margin: 0">Charge: $${charge.toFixed(2)}</p>
            <p style="margin: 0">Tax: $${(charge * 0.08875).toFixed(2)}</p>
            <p style="margin: 0">Items in order: ${totalItems}</p>


            <p style="color: green">Follow the <a href="https://a2z-ui-demo.vercel.app/orders">link</a> to review it.</p>

            <hr  style="color: blue" />
            <h4 style="margin: 10px 0">Client contacts:</h4>
            <p style="margin: 0">${name}</p>
            <p style="margin: 0">${company}</p>
            <p style="margin: 0">${phone}</p>
            <p style="margin: 0">${email}</p>
          </div>`,
      });
    } catch (err) {
      throw new ApplicationError(
        "An unexpected error occurred, please try again"
      );
    }
  },
};
