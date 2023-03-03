import { APIBaseURL } from "../Environment/Environment"

const API_URL = {

  ADMIN_LOGIN: APIBaseURL + 'admin/signIn',

  // DASHBOARD
  DASHBOARD_COUNT: APIBaseURL + "admin/dashboardcount",


  //PROFILE
  ADMIN_DETAIL: APIBaseURL + "admin/userdetail",
  ADMIN_UPDATE: APIBaseURL + 'admin/userupdate',
  CHANGE_PASSWORD: APIBaseURL + 'admin/changepassword',

  // USER

  GET_ALL_USER: APIBaseURL + 'admin/listOfusers',
  GET_USER_BY_ID: APIBaseURL + 'admin/detailofuser',
  DELETE_USER: APIBaseURL + 'admin/deleteofuser',
  CHANGE_USER_STATUS: APIBaseURL + 'admin/statusofuser',
  UPDATE_USER: APIBaseURL + 'admin/updateofuser',
  USER_PRODUCT_LIST: APIBaseURL + "admin/productlistOfusers",


  // Category section
  GET_CATEGORY_LIST: APIBaseURL + 'admin/categoriesList',
  ADD_CATEGORY: APIBaseURL + 'admin/createcategories',
  EDIT_CATEGORY: APIBaseURL + 'admin/categoriesUpdate',
  DELETE_CATEGORY: APIBaseURL + 'admin/categoriesDelete',
  CHANGE_CATEGORY_STATUS: APIBaseURL + 'admin/categoriesStatus',
  CATEGORY_LIST_WITHOUT_PAGINATION: APIBaseURL + 'admin/cat-List-without-pagination',


  // Sub-Category section
  GET_SUB_CATEGORY_LIST: APIBaseURL + 'admin/SubcategoriesList',
  CHANGE_SUB_CATEGORY_STATUS: APIBaseURL + 'admin/SubcategoriesStatus',
  DELETE_Sub_CATEGORY: APIBaseURL + 'admin/SubcategoriesDelete',
  ADD_SUB_CATEGORY: APIBaseURL + 'admin/createSubcategories',
  EDIT_SUB_CATEGORY: APIBaseURL + 'admin/SubcategoriesUpdate',
  SUB_CATEGORY_LIST_OF_CATEGORY: APIBaseURL + 'admin/sub-cat-list-of-cat',

  //products section
  GET_PRODUCT_LIST: APIBaseURL + 'admin/prodlist',
  CHANGE_PRODUCT_STATUS: APIBaseURL + 'admin/prodstatus',
  GET_PRODUCT_DETAILS: APIBaseURL + 'admin/proddetail',
  UPDATE_PRODUCT: APIBaseURL + 'admin/produpdate',
  DELETE_PRODUCT: APIBaseURL + 'admin/prodDelete',

  //commission section
  GET_COMMISSION_LIST: APIBaseURL + 'admin/listCommission',
  EDIT_COMMISSION_LIST: APIBaseURL + 'admin/editCommission',

  // Order Section
  GET_ORDER_LIST: APIBaseURL + 'admin/orderList',
  GET_ORDER_DETAILS: APIBaseURL + 'admin/orderDetail',

  // Transaction Section
  GET_TRANSACTION_LIST: APIBaseURL + 'admin/transactionList',
  GET_TRANSACTION_DETAIL: APIBaseURL + 'admin/transaction-detail',

  // Refund Section
  GET_REFUND_LIST: APIBaseURL + 'admin/listDispute',

  //Disputes Section 
  GET_DISPUTE_LIST: APIBaseURL + 'admin/listDispute',
  GET_DISPUTE_DETAIL: APIBaseURL + 'admin/detail-dispute',

  // Content Section
  GET_CONTENT_LIST: APIBaseURL + 'admin/list-content',
  CHANGE_CONTENT_STATUS: APIBaseURL + 'admin/status-update-content',
  EDIT_CONTENT: APIBaseURL + 'admin/update-content',





}

export { API_URL }