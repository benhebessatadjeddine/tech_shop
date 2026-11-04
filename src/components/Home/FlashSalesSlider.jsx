import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import ProductBox from "./ProductBox"
import { PRODUCTS } from "../../data/products"

// Products that have a discount — show as flash sales
const flashProducts = PRODUCTS.filter(p => p.offPercent).slice(0, 6)

export default function FlashSalesSlider() {
  return (
    <div className="px-1 py-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        loop
        breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
        autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={700}
        className="pb-8 pt-2"
      >
        {flashProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductBox product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
