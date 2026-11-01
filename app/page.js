import FeaturedStudios from "@/components/FeaturedStudios";
import HeroSlider from "@/components/HeroSlider";
import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";
import StudioCategories from "@/components/StudioCategories";
export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeaturedStudios></FeaturedStudios>
      <StudioCategories></StudioCategories>
      <HowBookingWorks></HowBookingWorks>
      <HostGuarantee></HostGuarantee>
    </div>
  );
}
