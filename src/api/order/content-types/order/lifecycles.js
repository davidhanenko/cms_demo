module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    console.log(JSON.parse(result.order_details).email);
  },
};
