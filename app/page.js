import FeaturedStudios from "@/components/FeaturedStudios";
import HeroSlider from "@/components/HeroSlider";
import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";
export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeaturedStudios></FeaturedStudios>
      <HowBookingWorks></HowBookingWorks>
      <HostGuarantee></HostGuarantee>
    </div>
  );
}
