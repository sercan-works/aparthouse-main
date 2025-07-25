import Aparts from "@/components/Aparts";
import BlogCards from "@/components/blog/BlogCards";
import { createMetadata } from "./utils/metadata";

export const metadata = createMetadata({
  title: "Hadi yeni evini bul!",
  description: "Aparthouse platformunda öğrenciler için en uygun kiralık daireler ve apartlar. Tüm şehirlerde üniversite yakını konforlu, güvenli ve uygun fiyatlı daireleri keşfedin.",
  keywords: "kiralık daire, öğrenci evi, apart, kiralık ev, apartlar, üniversite yakını ev, uygun fiyatlı daire",
  path: "/",
});

// SSR olarak çalışacak ana sayfa
export default async function Home() {
  return (
    <div className="flex flex-wrap md:flex-col items-center md:items-start md:justify-start my-4 max-w-screen-xl mx-auto">
      <h1 className="hidden md:block text-2xl text-zinc-900 font-normal mb-5 mx-14">Tüm Apartlar</h1>
      <Aparts />
      
      {/* Blog Kartları - Sadece Desktop'ta görünür */}
      <div className="hidden md:block w-full px-14 mt-16">
        <BlogCards />
      </div>
    </div>
  );
}
