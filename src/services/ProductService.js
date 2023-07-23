const {
  Product,
  ProductCategory,
  User,
  CampaignVendor,
  Sequelize
} = require('../models');

const {AclRoles} = require('../utils');

const {userConst} = require('../constants');

const VendorService = require('./VendorService');
const CampaignService = require('./CampaignService');

class ProductService {
  static addCategoryType(categoryType) {
    return ProductCategory.create(categoryType);
  }

  static fetchCategoryTypes(organisation_id) {
    return ProductCategory.findAll({
      where: {organisation_id},
      order: [['createdAt', 'DESC']]
    });
  }

  static findCategoryById(id) {
    return ProductCategory.findByPk(id);
  }
  static findCategoryType(where = {}) {
    return ProductCategory.findOne({
      where
    });
  }

  static addSingleProduct(product) {
    return ProposalRequest.create({});
  }
  static addProduct(product, vendors, CampaignId) {
    return Promise.all(
      vendors.map(async UserId => {
        await CampaignService.approveVendorForCampaign(CampaignId, UserId);
        return (await VendorService.findVendorStore(UserId)).createProduct({
          ...product,
          CampaignId
        });
      })
    );
  }

  static async findProduct(where) {
    return Product.findAll({
      where: {
        ...where
      }
    });
  }

  static findCampaignProducts(CampaignId) {
    return Product.findAll({
      where: {CampaignId},
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: {
            include: userConst.publicAttr
          },
          as: 'ProductVendors'
        }
      ]
    });
  }

  static ProductVendors(CampaignId) {
    return CampaignVendor.findAll({
      where: {CampaignId}
    });
  }

  static findCampaignProduct(CampaignId, productId) {
    return Product.findOne({
      where: {CampaignId, id: productId},
      include: [{model: User, as: 'ProductVendors'}]
    });
  }

  static findProductByVendorId(id, vendorId, extraClause = null) {
    return Product.findOne({
      where: {
        id,
        ...extraClause
      },
      include: [
        {
          model: User,
          as: 'ProductVendors',
          attribute: [],
          where: {
            id: vendorId
          }
        }
      ]
    });
  }
}

module.exports = ProductService;
