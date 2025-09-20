"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export default function ProductSilder({images,altContent}:{images:string[] , altContent:string}) {
  return <>
  
  
  
  
  
  
  
   <Carousel  opts={{loop: true,}}    plugins={[Autoplay({
          delay: 2000,
        }),
      ]}>
          <CarouselContent>
            {(images.map ((img,index)=> 
              <CarouselItem key={index}>
                <Image
                  className="w-full object-cover rounded-lg"
                  src={img}
                  alt={altContent}
                  width={400}
                  height={400}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
  
  
  
  
  
  
  
  
  
  
  </>
}
