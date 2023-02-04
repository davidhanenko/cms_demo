module.exports = {
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
      console.log(err);
    }
  },
};
