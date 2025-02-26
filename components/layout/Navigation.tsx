import Image from 'next/image'
import Link from 'next/link'
import FavoritesIcon from "@/public/assets/icons/FavoritesIcon.svg";
import UserIcon from "@/public/assets/icons/UserIcon.svg";
export default function Navigation() {
  return (
    <nav className="flex items-center space-x-4">
      <Link href="/" className="text-gray-700 hover:text-gray-900">
        Yardım
      </Link>
      <Link href="/favorites" className="text-gray-700 hover:text-gray-900">
        <Image src={FavoritesIcon} alt="Favorites" width={20} height={20} />
      </Link>
        <Image src={UserIcon} alt="Favorites" width={20} height={20} />
    </nav>
  )
}
