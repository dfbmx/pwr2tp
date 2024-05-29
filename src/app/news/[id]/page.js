"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import parse from 'node-html-parser';
import { FaFacebook, FaLinkedin, RiTwitterXLine } from '../../assets/icons/vander';
import { useRouter } from 'next/navigation';

const Navbar = dynamic(() => import('../../components/navbar'));
const Footer = dynamic(() => import('../../components/footer'));
import { blogData } from "../../data/data";

export default function BlogDetails(props) {
  const data = blogData.find((blog) => blog.id === parseInt(props.params.id));
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (typeof window !== 'undefined') {
      const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
      setShareUrl(currentUrl);
    }
  }, [router.asPath]);

  return (
    <>
      <Navbar />
      <section className="relative md:pt-44 pt-36 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-2/3 md:w-4/5">
              {data?.tags.map((tag, index) => (
                <Link key={index} href="" className="bg-amber-400 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded h-5 mr-2">
                  {tag}
                </Link>
              ))}
              <h5 className="md:text-4xl text-3xl font-bold md:tracking-normal tracking-normal md:leading-normal leading-normal mt-3">{data?.title}</h5>

              <div className="flex items-center mt-5">
                <Image src={data?.client} width={24} height={24} className="h-12 w-12 rounded-full" alt="" />

                <div className="ms-2">
                  <h6><Link href="" className="font-small hover:text-amber-400">{data?.author}</Link><Link href="" className="ms-1 text-green-600 font-amall"><i className="mdi mdi-circle-medium"></i>Follow</Link></h6>
                  <span className="text-slate-400 text-xs">{data?.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:pb-24 pb-16 pt-7">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="lg:w-2/3 md:w-4/5">
              <Image src={data?.image} width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} className="rounded-md" alt="" />

              <div dangerouslySetInnerHTML={{ __html: parse(data?.content).toString() }} />

              {/* Display tags */}
              <div className="flex mt-4">
                {data?.tags.map((tag, index) => (
                  <span key={index} className="bg-amber-400/10 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded mr-2">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Display quote */}
              <div className="relative rounded-md border-s-4 border-amber-400 px-6 py-10 mt-4">
                <p className="text-2xl font-medium">{data?.quote.text}</p>
                <p className="text-slate-400 mt-4 text-end">- {data?.quote.author}</p>
                <div className="absolute text-8xl -top-0 start-4 text-amber-500/10 dark:text-amber-500/20 -z-1">
                  <i className="mdi mdi-format-quote-open"></i>
                </div>
              </div>

              <div className="flex justify-between py-4 border-y border-gray-100 dark:border-gray-700 mt-5">
                <ul className="list-none">
                  <li className="inline">
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-slate-400 hover:text-amber-400"
                    >
                      <FaFacebook className="h-4 w-4 mr-1" />
                      Share on Facebook
                    </Link>
                  </li>
                  <li className="inline ml-4">
                    <Link
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-slate-400 hover:text-amber-400"
                    >
                      <RiTwitterXLine className="h-4 w-4 mr-1" />
                      Share on Twitter
                    </Link>
                  </li>
                  <li className="inline ml-4">
                    <Link
                      href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-slate-400 hover:text-amber-400"
                    >
                      <FaLinkedin className="h-4 w-4 mr-1" />
                      Share on LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
