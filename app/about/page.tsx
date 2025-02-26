
import RegisterButton from '@/components/helpers/RegisterButton'
import React from 'react'
import Image from 'next/image'
import AboutImage from '@/public/assets/images/about-image.png'
import Logo from '@/public/assets/logo.png'

const About = () => {
  return (
    <div className='flex flex-row mx-auto max-w-[1250px] my-10'>
        <div className='flex flex-col'>
      <div className=' flex flex-col '>
        <h1 className='text-2xl font-normal text-start  bg-clip-text'>Öğrenci yolculuğunu anlıyoruz, çünkü biz de bu süreci yaşadık...</h1>
        <p className='my-10'>
      Aparthouse.com.tr, uluslararası veya yerel öğrenci konutları için yardımcı olur. 2024 yılında kurulduğundan beri, tecrübeli ekibimiz ile binlerce öğrencinin evini bulmasına yardımcı olmaktayız.<br/><br/> Öğrenciler için özel olarak inşa edilmiş ve yönetilen en geniş ve özenle seçilmiş apart yelpazesine sahibiz. Bu, farklı üniversite yakınlarında çeşitli apartları keşfetmenizi ve karşılaştırmanızı sağlar, böylece doğru seçimi yapabilirsiniz.<br/><br/> Doğru apartı seçmek, güvenli ve ilham verici bir temel sağlar. Büyümenize ve yolculuğunuzdan en iyi şekilde yararlanmanıza yardımcı olur.
      </p>
      </div>
      <RegisterButton />

</div>
        <div className='flex flex-col justify-center items-center gap-4'>
        <Image src={Logo} alt='logo' width={200} height={100} />
        <Image src={AboutImage} alt='about' width={700} height={700} />
      </div>
    </div>
  )
}

export default About
