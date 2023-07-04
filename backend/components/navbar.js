import { useSession, signOut } from "next-auth/react";
import { TbPackages } from "react-icons/tb";
import { BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  async function logout() {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      // Handle any error that may occur during sign-out
      console.error(error);
    }
  }

  return (
    <div className="flex justify-between m-auto  bg-zinc-700/20 py-5 px-4 rounded-t-xl ">
      <Link href={"/"} className="flex gap-2 items-center">
        <TbPackages className="text-2xl text-green-600" />
        <span className="text-2xl lg:text-lg">Sending</span>
      </Link>
      <div className="flex items-center w-1/2 lg:w-1/3 sm:hidden">
        <div className="flex  w-full ">
          <input
            type="text"
            className=" w-full px-4 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
          />
          <button className="flex w-14 justify-center items-center text-white bg-teal-600 rounded-full transition-all hover:bg-teal-700 ">
            <BiSearchAlt2 className="text-2xl lg:text-xl " />
          </button>
        </div>
      </div>

      <div className="flex gap-5 items-center">
        {" "}
        <div className="flex gap-2 md:text-sm">
          <span className="xs:hidden">{session.user.name} </span>
          <img
            src={session.user.image}
            alt="profil"
            className="rounded-full w-6 h-6"
          />
        </div>
        <button
          href={"/"}
          className="bg-teal-600 px-2 py-2 rounded-xl transition-all hover:bg-teal-700 md:text-sm"
          onClick={logout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
