import React from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const login = () => {
  const { session } = useSession();
  return (
    <div>
      <div className="bg-zinc-800/40 flex  justify-center items-center w-full  h-screen relative bg-zinc-900 overflow-hidden">
      <div className="absolute -inset-1 bg-gradient-to-b  from-sky-600 to-pink-600  blur-xl opacity-10 "></div>
        <div className="w-1/5 h-1/2 xl:w-1/3 lg:w-1/2 sm:w-5/6">
          <div className="relative">
            
            <div className="w-full h-72 rounded-xl flex flex-col justify-center items-center relative  bg-zinc-900/60 ">
              <div className="absolute top-5">
                <h1 className="items-start text-bold text-2xl pt-5 text-white xs:text-xl">
                  Login to the Dashboard
                </h1>
              </div>
              <div>
                <button
                  className="flex items-center gap-2 bg-zinc-700 text-white p-2 rounded-xl transition-all hover:bg-zinc-600"
                  onClick={() => signIn("google")}
                >
                  <FcGoogle className="text-2xl" /> Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
