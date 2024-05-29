import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogData } from "../data/data";

export default function Blogs() {
  // Filter blog data to include only entries with "Artificial Intelligence" or "Hackathon" tags
  const filteredBlogData = blogData.filter(item =>
    item.tags && (item.tags.includes("Art") || item.tags.includes("Contest"))
  );

  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-2xl md:leading-normal text-2xl leading-normal font-semibold">Art News</h3>
          <p className="text-white rounded-xl  bg-black bg-opacity-70">Focused insights on Art to empower your innovations.</p>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
          {filteredBlogData.slice(0, 4).map((item, index) => {
            return (
              <div className="relative bg-white dark:bg-slate-900 p-4 rounded-md shadow dark:shadow-gray-700" key={index}>
                <Image src={item.image} alt={item.title} layout="responsive" width={500} height={300} className="rounded-md shadow dark:shadow-gray-700" />
                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    {item.tags.map((tag, tagIndex) => (
                      <Link key={tagIndex} href={`/tags/${tag}`} className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded h-5">
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link href={`/news/${item.id}`} className="text-lg font-semibold hover:text-amber-400">
                      {item.title}
                    </Link>
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <div className="flex items-center">
                      <Image src={item.client} width={28} height={28} className="rounded-full mr-2" alt={item.author} />
                      {item.author}
                    </div>
                    <div className="flex items-center">
                      {new Date(item.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
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