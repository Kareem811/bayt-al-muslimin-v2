import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { RandomAyah } from "@/components/home/RandomAyah";
import { PrayerTimesStrip } from "@/components/prayer/PrayerTimesStrip";

export const metadata = {
  title: "الصفحة الرئيسية",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <PrayerTimesStrip />
      <RandomAyah />
    </>
  );
}
