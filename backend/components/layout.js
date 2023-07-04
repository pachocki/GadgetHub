import { useSession } from "next-auth/react";
import Login from "@/components/login";
import Head from "@/components/head";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Head />
        <main>
          <Login />
        </main>
      </>
    );
  }
  return (
    <div className="bg-zinc-900 min-h-screen h-full  overflow-hidden ">
      <div className=" m-auto relative z-50  overflow-hidden text-white  ">
      <div className="absolute -inset-1 bg-gradient-to-b z-[-1] from-sky-600 to-pink-600  blur-xl opacity-10 "></div>
        <Navbar />
        <div className="flex h-full relative min-h-screen">
        <Sidebar/>
        <div className="bg-zinc-800/40 w-full  rounded-br-xl p-5 relative  overflow-hidden lg:px-2 lg:py-2">
      
        {children}
        </div>
        
        </div>
      </div>
    </div>
  );
}