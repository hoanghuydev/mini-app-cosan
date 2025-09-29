import Layout from "@/components/layout";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import ProductListPage from "@/pages/catalog/product-list";
import CategoryListPage from "@/pages/catalog/category-list";
import ProductDetailPage from "@/pages/catalog/product-detail";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import SearchPage from "@/pages/search";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import CheckoutSuccessPage from "./pages/checkout-success";
import OrderDetailPage from "./pages/order-detail";
import CheckTransaction from "./pages/check-transaction";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/categories",
          element: <CategoryListPage />,
          handle: {
            title: "Danh mục sản phẩm",
            back: false,
          },
        },
        {
          path: "/cart",
          element: <CartPage />,
          handle: {
            title: "Giỏ hàng",
          },
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
          handle: {
            title: "Thanh toán",
          },
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/products",
          element: <ProductListPage />,
          handle: {
            title: "Danh sách sản phẩm",
          },
        },
        {
          path: "/category/:id",
          element: <ProductListPage />,
          handle: {
            title: ({ categories, params }) =>
              categories.find((c) => c.id === Number(params.id))?.name,
          },
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
          handle: {
            scrollRestoration: 0, // when user selects another product in related products, scroll to the top of the page
          },
        },
        {
          path: "/search",
          element: <SearchPage />,
          handle: {
            title: "Tìm kiếm",
          },
        },
        {
          path: "/order-detail/:id",
          element: <OrderDetailPage />,
          handle: {
            title: "Chi tiết đơn hàng",
          },
        },
        {
          path: "/checkout-success/:id",
          element: <CheckoutSuccessPage />,
          handle: {
            title: "Đặt hàng thành công",
          },
        },
        {
          path: "/check-transaction",
          element: <CheckTransaction />,
          handle: {
            title: "Kiểm tra giao dịch",
          },
        },
      ],
    },
  ],
  { basename: getBasePath() }
);

export default router;
