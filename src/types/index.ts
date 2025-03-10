export type TUser = {
  userId: string;
  name: string;
  shopName: string;
  email: string;
  image?: string;
  role: Role;
  isBlock: string;
  isDeleted: boolean;
  password: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Role = {
  ADMIN: string;
  VENDOR: string;
  USER: string;
};

export type TShopName = {
  vendorId: string;
  shopName: string;
  email: string;
  image?: string;
  isBlock: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: Date;
  userId: string;
  productCount: number;
};

export type TProduct = {
  productId: string;
  shopNameM: string;
  shopName: string;
  product: {
    name: string;
    description: string;
    mimage: string;
    category: string;
  };
  requiredQty: number;
  ratings: number;
  rating: number;
  email: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  mimage: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  discount: string;
  totalPrice: number;
  discountPrice: number;
  isFlashSale: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  vendorId: string;
};

export type TCategory = {
  categoryId: string;
  categoryName: string;
  categoryImage: string;
  image: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TCoupon = {
  couponId: string;
  vendorId: string;
  couponCode: string;
  discountAmount: number;
  startedDate: string;
  endDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TLoginActivity = {
  loginActivityId: string;
  email: string;
  loginAt: string;
  device: string;
};

export type TOrder = {
  orderId: string;
  userId: string;
  userEmail: string;
  vendorId: string;
  vendorEmail: string;
  shopName: string;
  totalItems: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  transactionId?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type TOrderItem = {
  orderItemId: string;
  orderId: string;
  userEmail: string;
  vendorEmail: string;
  productId: string;
  name: string;
  requiredQty: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TComment = {
  commentId: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  vendorId: string;
  comment: string;
  rating: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TReplyComment = {
  replyCommentId: string;
  commentId: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  vendorId: string;
  vendorEmail: string;
  shopName: string;
  repliesComment: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  replyCommentIdl: string;
  shopNamel: string;
};

export type TFollowShop = {
  followId: string;
  userId: string;
  vendorId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    image: string;
  };
};
export type ApiError = {
  data?: {
    message: string;
  };
};
