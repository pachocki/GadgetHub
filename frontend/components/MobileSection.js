import CategoryProducts from "./CategoryProducts";

const MobileSection = ({ categories, products, filterCategories }) => {
  return (
    <div>
      {categories.map((category) => (
        <CategoryProducts
          key={category._id}
          category={category}
          products={products}
          filterCategories={["Headphones","Mobile"]}
        />
      ))}
    </div>
  );
};

export default MobileSection;
