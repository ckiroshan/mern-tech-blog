const categoryOptions = ["AI", "Cybersecurity", "IoT", "Space Tech", "Ethical Hacking", "Cryptography", "Software Development", "Web Development", "Programming", "Frameworks", "Databases", "Version Control"];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
