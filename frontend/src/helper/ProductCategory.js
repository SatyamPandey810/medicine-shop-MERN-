// const productCategory = [
//     { id: 1, label: "Healthy products", value: "Healthy products" },
//     { id: 2, label: "Cosmatic products", value: "Cosmatic products" },
//     { id: 3, label: "Groceryies", value: "Groceryies" },
//     { id: 4, label: "Child care", value: "child care" },
//     { id: 5, label: "Medicine", value: "Medicine" },
//     { id: 6, label: "Other", value: "Other" },
   
// ]
// export default productCategory
const productCategory = [
    { 
      id: 1, 
      label: "Healthy products", 
      value: "Healthy products", 
      subcategories: [
        { id: 101, label: "Vitamins", value: "Vitamins" },
        { id: 102, label: "Supplements", value: "Supplements" },
      ] 
    },
    { 
      id: 2, 
      label: "Cosmetic products", 
      value: "Cosmetic products", 
      subcategories: [
        { id: 201, label: "Skincare", value: "Skincare" },
        { id: 202, label: "Makeup", value: "Makeup" },
      ] 
    },
    { 
      id: 3, 
      label: "Groceries", 
      value: "Groceries", 
      subcategories: [
        { id: 301, label: "Fruits", value: "Fruits" },
        { id: 302, label: "Vegetables", value: "Vegetables" },
      ] 
    },
    { 
      id: 4, 
      label: "Child care", 
      value: "Child care", 
      subcategories: [
        { id: 401, label: "Diapers", value: "Diapers" },
        { id: 402, label: "Baby food", value: "Baby food" },
      ] 
    },
    { 
      id: 5, 
      label: "Medicine", 
      value: "Medicine", 
      subcategories: [
        { id: 501, label: "Prescription drugs", value: "Prescription drugs" },
        { id: 502, label: "Over-the-counter drugs", value: "Over-the-counter drugs" },
      ] 
    },
   
  ];
  
  export default productCategory;
  