import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogData } from "../data/data";

import { FiClock, FiCalendar } from '../assets/icons/vander';

export default function Blogs() {
  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-4xl md:leading-normal text-2xl leading-normal font-semibold">News</h3>

          <p className="text-slate-400 max-w-xl mx-auto">Education is power, read the latest news and articles to start your journey</p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 mt-6 gap-6">
          {blogData.slice(0, 4).map((item, index) => {
            return (
              <div className="relative bg-white dark:bg-slate-900 p-4 rounded-md shadow dark:shadow-gray-700" key={index}>
                <Image src={item.image} width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} className="rounded-md shadow dark:shadow-gray-700" alt="" />
                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <div className="space-x-1">
                      {item.tags && item.tags.map((tag, tagIndex) => (
                        <Link
                          key={tagIndex}
                          href=""
                          className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded h-5"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>

                    {item.readingTime && (
                      <span className="flex items-center">
                        <FiClock className="h-4 w-4" />
                        <span className="ms-1 text-slate-400">{item.readingTime}</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <Link href={`/news/${item.id}`} className="text-lg font-semibold hover:text-amber-400">
                      {item.title}
                    </Link>
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <span className="flex items-center">
                      <Image src={item.client} width={28} height={28} className="h-7 w-7 rounded-full" alt="" />
                      <Link href="" className="ms-1 text-slate-400 hover:text-amber-400 text-xs">
                        {item.author}
                      </Link>
                    </span>

                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
