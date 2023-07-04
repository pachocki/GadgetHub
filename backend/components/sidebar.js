import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsFillBoxFill } from "react-icons/bs";
import { MdSpaceDashboard, MdSettings } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { BiCategoryAlt } from "react-icons/bi";

const Sidebar = () => {
  const inactiveLink =
    "flex gap-2 items-center text-2xl hover:opacity-80 cursor-pointer transition-all hover:bg-purple-600/20 px-2 py-2 rounded-l-xl lg:text-xl sm:flex-col sm:rounded-xl ";
  const activeLink =
    inactiveLink + " bg-purple-600/40 rounded-l-xl px-2 py-2  ";
  const router = useRouter();
  const { pathname } = router;

  return (
    <aside className="bg-zinc-700/20 rounded-bl-xl  w-64 sm:fixed sm:bottom-0 sm:w-full  sm:z-[100] sm:bg-zinc-800 sm:rounded-none md:w-44">
      <div className="pt-20 sm:pt-2">
        <div className="flex flex-col gap-10 pl-2 sm:flex sm:flex-row sm:gap-0 sm:px-2 sm:justify-between ">
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inactiveLink}
          >
            <MdSpaceDashboard className="text-green-600" />
            <span className="sm:text-sm">Dashboard</span>
          </Link>
          <Link
            href={"/products"}
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
          >
            <BsFillBoxFill className="text-green-600" />
            <span className="sm:text-sm">Products</span>
          </Link>
          <Link
            href={"/orders"}
            className={pathname.includes("/orders") ? activeLink : inactiveLink}
          >
            <VscListOrdered className="text-green-600" />
            <span className="sm:text-sm">Orders</span>
          </Link>
          <Link
            href={"/categories"}
            className={
              pathname.includes("/categories") ? activeLink : inactiveLink
            }
          >
            <BiCategoryAlt className="text-green-600" />
            <span className="sm:text-sm">Categories</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
