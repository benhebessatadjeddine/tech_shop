import OurServicesItem from "./OurServicesItem"
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiShieldCheckLine } from "react-icons/ri";
import { useStore } from "../../context/StoreContext";

export default function OurServices() {
    const { t } = useStore()

    return (
        <div className="flex justify-evenly items-center flex-wrap gap-10">
            <OurServicesItem 
                title={t('services.shippingTitle')} 
                desc={t('services.shippingDesc')} 
                Icon={TbTruckDelivery} 
            />
            <OurServicesItem 
                title={t('services.supportTitle')} 
                desc={t('services.supportDesc')} 
                Icon={TfiHeadphoneAlt} 
            />
            <OurServicesItem 
                title={t('services.warrantyTitle')} 
                desc={t('services.warrantyDesc')} 
                Icon={RiShieldCheckLine} 
            />
        </div>
    )
}
