import Button from "@/components/button";
import HorizontalDivider from "@/components/horizontal-divider";
import { useAtomValue } from "jotai";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { productState } from "@/state";
import { formatPrice } from "@/utils/format";
import ShareButton from "./share-buttont";
import VariantPicker from "./variant-picker";
import { useEffect, useRef, useState } from "react";
import Collapse from "@/components/collapse";
import RelatedProducts from "./related-products";
import { useAddToCart } from "@/hooks";
import toast from "react-hot-toast";
import { Color, Size } from "@/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useAtomValue(productState(Number(id)))!;
  const [selectedColor, setSelectedColor] = useState<Color>();
  const [selectedSize, setSelectedSize] = useState<Size>();

  useEffect(() => {
    setSelectedColor(product.colors?.[0]);
    setSelectedSize(product.sizes?.[0]);
  }, [id]);

  const { addToCart, setOptions } = useAddToCart(product);

  useEffect(() => {
    setOptions({
      size: selectedSize,
      color: selectedColor?.name,
    });
  }, [selectedSize, selectedColor]);

  return (
    <div className="w-full h-full flex flex-col">
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        <div className="w-full px-4">
          <div className="py-2">
            <img
              key={product.id}
              src={product.images?.thumbnail || product.thumbnail || product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              style={{
                viewTransitionName: `product-image-${product.id}`,
              }}
            />
          </div>
          <div className="text-xl font-medium text-primary">
            {formatPrice(product.price)}
          </div>
          {!!product.original_price && (
            <div className="text-2xs text-subtitle line-through">
              {formatPrice(product.original_price)}
            </div>
          )}
          <div className="text-sm mt-1">{product.name}</div>
          
          {/* Mô tả sản phẩm */}
          {(product.short_description || product.full_description) && (
            <div className="py-3">
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product.full_description || product.short_description || "",
                }}
              />
            </div>
          )}

          <div className="py-2">
            <ShareButton product={product} />
          </div>
          {product.colors && (
            <VariantPicker
              title="Color"
              variants={product.colors}
              value={selectedColor}
              onChange={(color) => setSelectedColor(color)}
              renderVariant={(variant, selected) => (
                <div
                  className={"w-full h-full rounded-full ".concat(
                    selected ? "border-2 border-primary p-0.5" : ""
                  )}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: variant?.hex }}
                  />
                </div>
              )}
            />
          )}
          <HorizontalDivider />
          {product.sizes && (
            <VariantPicker
              title="Size"
              variants={product.sizes}
              value={selectedSize}
              onChange={(size) => setSelectedSize(size)}
              renderVariant={(variant, selected) => (
                <div
                  className={"w-full h-full flex justify-center items-center ".concat(
                    selected ? "bg-primary text-white" : ""
                  )}
                >
                  <div className="truncate">{variant}</div>
                </div>
              )}
            />
          )}
        </div>
        
        {/* Thông tin chi tiết sản phẩm */}
        <div className="bg-section h-2 w-full"></div>
        <div className="px-4 py-4">
          <div className="space-y-4">
            {/* Thông tin cơ bản */}
            {(product.pcb_number || product.barcode || product.weight) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Thông tin sản phẩm</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {product.pcb_number && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số PCB:</span>
                      <span className="font-medium">{product.pcb_number}</span>
                    </div>
                  )}
                  {product.barcode && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã vạch:</span>
                      <span className="font-medium">{product.barcode}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trọng lượng:</span>
                      <span className="font-medium">{product.weight}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Thành phần chi tiết */}
            {product.detailed_ingredients && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Thành phần chi tiết</h3>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.detailed_ingredients}
                </div>
              </div>
            )}

            {/* Hướng dẫn sử dụng */}
            {product.usage_instructions && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Hướng dẫn sử dụng</h3>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.usage_instructions}
                </div>
              </div>
            )}

            {/* Lưu ý */}
            {product.precautions && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Lưu ý</h3>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: product.precautions}}>
                </div>
              </div>
            )}

            {/* Thể chất và bao bì */}
            {(product.material || product.packaging) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Thông tin khác</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {product.material && (
                    <div>
                      <span className="text-gray-600">Thể chất: </span>
                      <span className="text-gray-900">{product.material}</span>
                    </div>
                  )}
                  {product.packaging && (
                    <div>
                      <span className="text-gray-600">Bao bì: </span>
                      <span className="text-gray-900">{product.packaging}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {product.details && (
          <>
            <div className="bg-section h-2 w-full"></div>
            <Collapse items={product.details} />
          </>
        )}
        <div className="bg-section h-2 w-full"></div>
        <div className="font-medium py-2 px-4">
          <div className="pt-2 pb-2.5">Sản phẩm khác</div>
          <HorizontalDivider />
        </div>
        <RelatedProducts currentProductId={product.id} />
      </div>

      <HorizontalDivider />
      <div className="flex-none grid grid-cols-2 gap-2 py-3 px-4">
        <Button
          large
          onClick={() => {
            addToCart(1);
            toast.success("Đã thêm vào giỏ hàng");
          }}
        >
          Thêm vào giỏ
        </Button>
        <Button
          large
          primary
          onClick={() => {
            addToCart(1);
            navigate("/cart");
          }}
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
