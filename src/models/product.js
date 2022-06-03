'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Market, { foreignKey: 'MarketId', as: 'Store' });
      Product.belongsTo(models.Campaign, { foreignKey: 'CampaignId', as: 'Campaign' });
      Product.hasMany(models.CampaignVendor, { foreignKey: 'CampaignId', as: 'ProductVendors' })
      //Product.hasMany(models.OrderProduct, { foreignKey: 'ProductId', as: 'Product' });
    }
  };
  Product.init({
    type: DataTypes.ENUM("product", "service"),
    tag: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    product_ref: DataTypes.STRING,
    MarketId: DataTypes.INTEGER,
    CampaignId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};