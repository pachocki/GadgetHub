import CategoryProducts from "./CategoryProducts";

const LaptopSection = ({ categories, products, filterCategories }) => {
  return (
    <div>
      {categories.map((category) => (
        <CategoryProducts
          key={category._id}
          category={category}
          products={products}
          filterCategories={"Laptop"}
        />
      ))}
    </div>
  );
};

export default LaptopSection;
