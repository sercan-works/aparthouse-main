import Navigation from "./Navigation";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import HeaderBanner from "./HeaderBanner";
import FilterButton from "../filter-modal/FilterButton";
import SearchBar from "../SearchBar";
import CategoryBar from "../CategoryBar";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Header() {
  const pathname = usePathname();

  // Kategorilerin görüneceği sayfalar
  const noCategoryPaths = ["/"]; 

  const shouldShowCategory = noCategoryPaths.includes(pathname);

  return (
    <header className=" mt-20 md:mt-0 md:bg-white md:shadow">
      {/* Anons Bar */}
      {/* TODO: Anons bar yapılacak */}

      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* LOGO */}
          <Link className="flex items-center cursor-pointer" href="/">
              <Image src={Logo} alt="Logo" width={150} height={100} />
          </Link>

          {/* ARAMA BARI */}
          <div className="flex items-center gap-4">
          <SearchBar placeholder="Arama Yap" />
          {pathname === "/filter" && (
            <FilterButton />
          )}
          </div>
          {/* NAVIGATION */}
          <Navigation />
        </div>
      </div>
      <div className="hidden md:block">
        <HeaderBanner />
      </div>

      {/* MOBILE HEADER ARAMA VE FİLTRE ÇUBUĞU*/}
      <div className="block md:hidden overflow-hidden">
        <div className="flex items-center justify-between gap-4 mx-4 max-w-full">
          <div className="w-3/4">
          <SearchBar placeholder="Şehir, Apart Adı ile ara" />

          </div>
          <div className="w-1/4">
          <FilterButton />
          </div>
        </div>

        
      </div>

      {/* KATEGORİLER */}
      {shouldShowCategory && <CategoryBar />}

    </header>
  )
}