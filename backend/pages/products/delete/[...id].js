import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Delete = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
    
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
 
  return (
    <Layout>
      <h1 className="text-2xl">
        Do you really want to delete  {productInfo?.title} ?
      </h1>

      <div className="flex gap-5 pt-10">
        <button
          className="text-xl px-3 py-2 w-24  rounded-xl bg-green-600 transition-all hover:opacity-50 flex items-center gap-2"
          onClick={deleteProduct}
        >
          <AiOutlineCheck />
          Yes
        </button>
        <button
          className="text-xl px-3 py-2 w-24 rounded-xl bg-red-600 transition-all hover:opacity-50 flex items-center gap-2"
          onClick={goBack}
        >
          <AiOutlineClose />
          No
        </button>
      </div>
    </Layout>
  );
};

export default Delete;
