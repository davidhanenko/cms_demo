module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    const price = await data.price;
    const sizePrice = await data.sizePrice;

    if (data.itemTitle) {
      data.itemTitle = await data.itemTitle.trim();
    }

    if (price) {
      data.minPrice = price;
    }
    if (sizePrice && sizePrice.length > 0) {
      sizePrice.sort((a, b) => a.price - b.price);
      data.minPrice = sizePrice[0].price;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    const ctx = await strapi.requestContext.get();
    const ctxBodyData = ctx.request.body;

    const price = await data.price;
    const sizePrice = ctxBodyData.sizePrice;

    if (data.itemTitle) {
      data.itemTitle = await data.itemTitle.trim();
    }

    if (price && sizePrice && sizePrice.length > 0) {
      sizePrice.sort((a, b) => a.price - b.price);
      data.minPrice = sizePrice[0].price > price ? price : sizePrice[0].price;
    }

    if (price && sizePrice.length <= 0) {
      data.minPrice = price;
    }

    if (sizePrice && sizePrice.length > 0 && !price) {
      sizePrice.sort((a, b) => a.price - b.price);
      data.minPrice = sizePrice[0].price;
    }
  },
};
