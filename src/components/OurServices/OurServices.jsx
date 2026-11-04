import OurServicesItem from "./OurServicesItem"
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiShieldCheckLine } from "react-icons/ri";

export default function OurServices() {
    return (
        <div className="flex justify-evenly items-center flex-wrap gap-10">
            <OurServicesItem title={'EXPRESS SECURE SHIPPING'} desc={'Insured transit for all gaming rigs'} Icon={TbTruckDelivery} />
            <OurServicesItem title={'24/7 TECHNICAL SUPPORT'} desc={'Expert help for troubleshooting & overclocking'} Icon={TfiHeadphoneAlt} />
            <OurServicesItem title={'LIFETIME BUILD GUARANTEE'} desc={'We stand by our craftsmanship'} Icon={RiShieldCheckLine} />
        </div>
    )
}
