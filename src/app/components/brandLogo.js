import React from "react";
import Image from "next/image";

export default function BrandLogo(){
    const brandLogo = [   ]
    return(
        <div className="container relative">
            <div className="grid md:grid-cols-6 grid-cols-2 justify-center gap-6">
                {brandLogo.map((item,index) => {
                   return(
                        <div className="mx-auto py-4" key={index}>
                            <Image width={72} height={24} src={item} className="h-6" alt=""/>
                        </div>
                   )
                })}
            </div>
        </div>
    )
}