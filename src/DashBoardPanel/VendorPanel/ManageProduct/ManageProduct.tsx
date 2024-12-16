import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

import { FaCopy, FaEdit, FaSearch, FaSortNumericDown } from "react-icons/fa";
import { MdDeleteForever, MdManageSearch, MdPriceCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useGetAllCategoryQuery,
  useGetProductByShopNamePaginateQuery,
  useUpdateProductMutation,
} from "../../../Redux/features/produtcs/productsApi";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useGetVendorByEmailQuery } from "../../../Redux/features/vendor/vendorApi";
import { IoMdClose } from "react-icons/io";
import { TCategory, TProduct, TUser } from "../../../types";

const ManageProduct = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedPriceAscDesc, setSelectedPriceAscDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState<TProduct[]>([]);
  console.log(searchText, selectedPriceAscDesc);
  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as TUser) || null;

  const [selectedproductId, setSelectedproductId] = useState<string | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedIsFlashSale, setSelectedIsFlashSale] = useState("");
  const email = userDataToken?.email;
  const { data: vendorData } = useGetVendorByEmailQuery(email);
  // const { data: productData, refetch: productsRefech } =
  //   useGetProductByShopNameQuery(userDataToken.email);
  const vendorId = vendorData?.data?.vendorId;
  // console.log("vendorData", vendorData);
  const {
    data: productData,
    isLoading,
    refetch: productsRefech,
  } = useGetProductByShopNamePaginateQuery({ vendorId, page, limit });

  // const { data: users } = useGetAllUserQuery(undefined);
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const [addProductItem] = useCreateProductMutation();
  const [duplicateProductItem] = useDuplicateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const produtcs = productData?.data || [];
  // const productsData = produtcs?.result || 0;
  // const displayedProductsData = displayedProducts?.result || 0;
  const total = productData?.meta?.total;
  console.log("total", total);
  const categories = categoryData?.data || [];
  const vendor = vendorData?.data || [];
  console.log("displayedProductsData", displayedProducts, displayedProducts);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    // Extract form data
    const form = event.target as HTMLFormElement;
    const shopNameM = vendor.shopName;
    const email = userDataToken.email;
    const name = form.nameT.value;
    const price = parseFloat(form.price.value);
    const category = selectedCategory;
    const description = form.description.value;
    const quantity = parseInt(form.quantity.value);
    const mimage = form.Mimage.files[0];
    const image2 = form.image2.files[0];
    const image3 = form.image3.files[0];
    const image4 = form.image4.files[0];
    const image5 = form.image5.files[0];
    const discount = selectedDiscount;
    const discountPrice = parseFloat(form.discountPrice.value);
    const isFlashSale = selectedIsFlashSale;

    // ***************************************************************************
    // ***************************************************************************

    // Mimage upload portion
    let mimageUrl; // Use existing image URL if no new image is uploaded

    if (mimage) {
      const formData = new FormData();
      formData.append("file", mimage);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        mimageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage upload portion
    // Mimage2upload portion
    let imageUrl2; // Use existing image URL if no new image is uploaded

    if (image2) {
      const formData = new FormData();
      formData.append("file", image2);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl2 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage2 upload portion
    // Mimage3 upload portion
    let imageUrl3; // Use existing image URL if no new image is uploaded

    if (image3) {
      const formData = new FormData();
      formData.append("file", image3);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl3 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage3 upload portion
    // Mimage4 upload portion
    let imageUrl4; // Use existing image URL if no new image is uploaded

    if (image4) {
      const formData = new FormData();
      formData.append("file", image4);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl4 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage4 upload portion
    // Mimage5 upload portion
    let imageUrl5; // Use existing image URL if no new image is uploaded

    if (image5) {
      const formData = new FormData();
      formData.append("file", image5);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl5 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // image3 upload portion

    // ***************************************************************************
    // ***************************************************************************

    const productData = {
      shopNameM,
      email,
      name,
      price,
      category,
      mimage: mimageUrl,
      image2: imageUrl2,
      image3: imageUrl3,
      image4: imageUrl4,
      image5: imageUrl5,
      quantity,
      description,
      discount,
      discountPrice,
      isFlashSale,
      vendorId: vendor.vendorId,
    };
    console.log("productData", productData);

    try {
      await addProductItem(productData).unwrap();
      // console.log("Product added:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      const modal = document.getElementById(
        "AddProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      productsRefech();
    } catch (error) {
      // console.error("Failed to add product:", error);
    }
  };

  const handleCopyProduct = (productId: string) => {
    setSelectedproductId(productId);
    const modal = document.getElementById(
      "duplicateProductModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
    const product = produtcs.find((p: TProduct) => p.productId === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedCategory(product.category);
      setSelectedDiscount(product.discount);
      setSelectedIsFlashSale(product.isFlashSale);
    }
  };

  const handleDuplicateFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const price = parseFloat(form.price.value);
    const category = selectedCategory;
    const quantity = parseInt(form.quantity.value);
    const mimage = form.Mimage.files[0];
    const image2 = form.image2.files[0];
    const image3 = form.image3.files[0];
    const image4 = form.image4.files[0];
    const image5 = form.image5.files[0];
    const discount = selectedDiscount || selectedProduct?.discount;
    const discountPrice = parseFloat(form.discountPrice.value);
    const isFlashSale = selectedIsFlashSale || selectedProduct?.isFlashSale;

    const description = form.description.value;

    // Mimage upload portion
    let mimageUrl; // Use existing image URL if no new image is uploaded

    if (mimage) {
      const formData = new FormData();
      formData.append("file", mimage);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        mimageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage upload portion
    // Mimage2upload portion
    let imageUrl2; // Use existing image URL if no new image is uploaded

    if (image2) {
      const formData = new FormData();
      formData.append("file", image2);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl2 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage2 upload portion
    // Mimage3 upload portion
    let imageUrl3; // Use existing image URL if no new image is uploaded

    if (image3) {
      const formData = new FormData();
      formData.append("file", image3);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl3 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage3 upload portion
    // Mimage4 upload portion
    let imageUrl4; // Use existing image URL if no new image is uploaded

    if (image4) {
      const formData = new FormData();
      formData.append("file", image4);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl4 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage4 upload portion
    // Mimage5 upload portion
    let imageUrl5; // Use existing image URL if no new image is uploaded

    if (image5) {
      const formData = new FormData();
      formData.append("file", image5);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl5 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // image3 upload portion

    // ***************************************************************************
    // ***************************************************************************

    const productDuplicateData = {
      shopNameM: selectedProduct?.shopNameM,
      email: userDataToken.email,
      name,
      price,
      category,
      mimage: mimageUrl || selectedProduct?.mimage,
      image2: imageUrl2 || selectedProduct?.image2,
      image3: imageUrl3 || selectedProduct?.image3,
      image4: imageUrl4 || selectedProduct?.image4,
      image5: imageUrl5 || selectedProduct?.image5,
      quantity,
      description,
      discount,
      discountPrice,
      isFlashSale,
      vendorId: vendor.vendorId,
    };
    console.log("productModifyData", productDuplicateData);
    try {
      await duplicateProductItem(productDuplicateData).unwrap();
      // console.log("Product added:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your duplicate work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      // Optionally close the modal after a successful update
      const modal = document.getElementById(
        "duplicateProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      productsRefech();
    } catch (error) {
      // console.error("Failed to update product:", error);
    }
  };

  const handleEditProduct = (productId: string) => {
    setSelectedproductId(productId);
    const modal = document.getElementById(
      "editProductModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
    const product = produtcs.find((p: TProduct) => p.productId === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedCategory(product.category);
      setSelectedDiscount(product.discount);
      setSelectedIsFlashSale(product.isFlashSale);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const price = parseFloat(form.price.value);
    const category = selectedCategory;

    const quantity = parseInt(form.quantity.value);
    const mimage = form.Mimage.files[0];
    const image2 = form.image2.files[0];
    const image3 = form.image3.files[0];
    const image4 = form.image4.files[0];
    const image5 = form.image5.files[0];
    const discount = selectedDiscount || selectedProduct?.discount;
    const discountPrice = parseFloat(form.discountPrice.value);
    const isFlashSale = selectedIsFlashSale || selectedProduct?.isFlashSale;

    const description = form.description.value;

    // Mimage upload portion
    let mimageUrl; // Use existing image URL if no new image is uploaded

    if (mimage) {
      const formData = new FormData();
      formData.append("file", mimage);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        mimageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage upload portion
    // Mimage2upload portion
    let imageUrl2; // Use existing image URL if no new image is uploaded

    if (image2) {
      const formData = new FormData();
      formData.append("file", image2);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl2 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage2 upload portion
    // Mimage3 upload portion
    let imageUrl3; // Use existing image URL if no new image is uploaded

    if (image3) {
      const formData = new FormData();
      formData.append("file", image3);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl3 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage3 upload portion
    // Mimage4 upload portion
    let imageUrl4; // Use existing image URL if no new image is uploaded

    if (image4) {
      const formData = new FormData();
      formData.append("file", image4);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl4 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage4 upload portion
    // Mimage5 upload portion
    let imageUrl5; // Use existing image URL if no new image is uploaded

    if (image5) {
      const formData = new FormData();
      formData.append("file", image5);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl5 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // image3 upload portion

    // ***************************************************************************
    // ***************************************************************************

    const productModifyData = {
      name,
      price,
      category,
      quantity,
      mimage: mimageUrl || selectedProduct?.mimage,
      image2: imageUrl2 || selectedProduct?.image2,
      image3: imageUrl3 || selectedProduct?.image3,
      image4: imageUrl4 || selectedProduct?.image4,
      image5: imageUrl5 || selectedProduct?.image5,
      description,
      discount,
      discountPrice,
      isFlashSale,
    };
    console.log("productModifyData", productModifyData);
    try {
      await updateProduct({
        productId: selectedproductId,
        productsModifyData: productModifyData,
      });
      // console.log("Product updated:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Updated Product info",
        showConfirmButton: false,
        timer: 1500,
      });

      // Optionally close the modal after a successful update
      const modal = document.getElementById(
        "editProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      productsRefech();
    } catch (error) {
      // console.error("Failed to update product:", error);
    }
  };
  const handleSelectChangeCategory = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedCategory(selectedValue);
  };
  const handleSelectChangeDiscount = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedDiscount(selectedValue);
  };
  const handleSelectChangeIsFlashSale = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedIsFlashSale(selectedValue);
  };

  // console.log(selectedproductId);

  const handleDeleteProducts = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId).unwrap();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          productsRefech();
        } catch (error) {
          // console.error("Failed to delete product:", error);
          Swal.fire(
            "Error!",
            "There was an issue deleting the product.",
            "error"
          );
        }
      }
    });
  };

  // pagination***************************************************
  // pagination***************************************************

  useEffect(() => {
    if (productData?.data) {
      setProducts(productData?.data);
      setDisplayedProducts(productData?.data);
    }
  }, [productData]);

  if (isLoading)
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  // if (isError) return <div>Error loading products</div>;

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    if (pageSize && pageSize !== limit) {
      setLimit(pageSize);
    }
  };
  // pagination***************************************************
  // pagination***************************************************
  // ******************************************************************
  //  *****************search function**************************
  //    *****************search function**************************
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchText = form.SearchText.value.toLowerCase();
    setSearchText(searchText);
    console.log("searchText", searchText);
    event.preventDefault();
    const filteredProducts = products.filter(
      (product: TProduct) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSortByPriceRange = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const minPrice = parseFloat(form.MinPrice.value) || 0;
    const maxPrice = parseFloat(form.MaxPrice.value) || Infinity;

    const filteredProducts = products.filter(
      (product: TProduct) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (!selectedCategory || product.category === selectedCategory)
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangeCategoryFilter = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedCategory(selectedValue);

    const filteredProducts = products.filter(
      (product: TProduct) => product.category === selectedValue
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangePriceAscDesc = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedPriceAscDesc(selectedValue);

    const sortedProducts = [...displayedProducts].sort((a, b) =>
      selectedValue === "asc" ? a.price - b.price : b.price - a.price
    );
    setDisplayedProducts(sortedProducts);
  };

  const handleReset = () => {
    setSearchText("");
    setSelectedCategory("");
    setSelectedPriceAscDesc("");
    setDisplayedProducts(products);
  };
  //  *****************search function**************************
  //    *****************search function**************************
  return (
    <div className="container mx-auto ">
      <div>
        <h1 className="text-center py-5 underline">Search your product</h1>
      </div>
      {/* *****************search function************************** */}
      {/* *****************search function************************** */}
      <div className="w-full flex flex-row gap-5 container mx-auto py-2">
        <form onSubmit={handleSearch}>
          <div className="dropdown dropdown-bottom text-white dropdown-hover lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn  btn-sm bg-[#1A4870]"
            >
              <FaSearch className=" text-xl text-[#F9DBBA]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-auto p-2 shadow"
            >
              <input
                type="text"
                name="SearchText"
                placeholder="Search By Name/Category"
                className="input input-bordered input-primary w-72 max-w-md bg-inherit text-white"
              />
              <button className="btn btn-sm bg-[#1A4870] text-white mt-2 ">
                Search
              </button>
            </ul>
          </div>
        </form>
        {/* ********************* */}
        <form onSubmit={handleSearch}>
          <div className="hidden lg:block">
            <label className="input flex items-center gap-2 bg-[#1A4870] w-auto h-auto">
              <FaSearch className=" text-xl text-[#F9DBBA]" />
              <input
                type="text"
                name="SearchText"
                className="input input-sm input-bordered input-[#1A4870] w-60 max-w-md   text-white"
                placeholder="Search By Name/Category"
              />
              <button className="btn btn-sm bg-[#1A4870] text-white ">
                Search
              </button>
            </label>
          </div>
        </form>
        {/* ********************************** */}

        {/******************  search *******************/}

        {/* //////// filter by price range /////// */}
        <form onSubmit={handleSortByPriceRange}>
          <div className="dropdown md:dropdown-end  text-white dropdown-hover ">
            <div tabIndex={0} role="button" className="btn btn-sm bg-[#1A4870]">
              <span className="hidden lg:block text-white">
                Filter By Price Range
              </span>
              <MdPriceCheck className=" text-3xl text-[#F9DBBA]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu  border-2 border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-auto p-2 shadow"
            >
              <div className="flex    items-baseline ">
                <label className="pr-5 text-md">MinPrice:</label>
                <input
                  type="number"
                  name="MinPrice"
                  placeholder="Type here"
                  className="input input-bordered input-primary  input-sm w-24 max-w-xs text-white bg-inherit"
                />
              </div>
              <div className="flex items-baseline mt-2 ">
                <label className="pr-5 text-md">MaxPrice:</label>
                <input
                  type="number"
                  name="MaxPrice"
                  placeholder="Type here"
                  className="input input-bordered input-primary  input-sm w-24 max-w-xs text-white bg-inherit"
                />
              </div>
              <button className="btn btn-sm bg-[#1A4870] text-white  h-2 mt-2">
                <span className=" text-white">Apply</span>
              </button>
            </ul>
          </div>
        </form>
        {/* ////////////////////// */}
        {/* *******filter by category******** */}
        <div className="dropdown dropdown-bottom dropdown-end text-white dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-sm bg-[#1A4870]">
            <span className="hidden lg:block text-white">
              Filter By Category
            </span>
            <MdManageSearch className=" text-3xl text-[#F9DBBA]" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-52 p-2 shadow"
          >
            <select
              onChange={handleSelectChangeCategoryFilter}
              className="select select-bordered w-full  bg-[#1A4870] "
            >
              <option disabled selected>
                Select Category
              </option>
              {categories.map((category: TCategory) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </ul>
        </div>
        {/* *******filter by category******** */}
        {/* *******filter by price sort low to hight******** */}
        <div className="dropdown dropdown-bottom dropdown-end text-white dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-sm  bg-[#1A4870]">
            <span className="hidden lg:block text-white">Sort By Price</span>
            <FaSortNumericDown className=" text-2xl text-[#F9DBBA]" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-52 p-2 shadow"
          >
            <select
              onChange={handleSelectChangePriceAscDesc}
              className="select select-bordered w-full bg-[#1A4870]"
            >
              <option disabled selected>
                Select Option
              </option>
              <option value="asc">Price Low to High</option>
              <option value="desc">Price High to Low</option>
            </select>
          </ul>
        </div>
        {/* *******filter by category******** */}
        {/* reset button */}
        <button
          onClick={handleReset}
          className="btn btn-sm bg-[#1A4870] text-white "
        >
          <span className="hidden lg:block text-white">Reset</span>
          <IoMdClose className=" text-2xl text-[#F9DBBA]" />
        </button>
        {/* reset button */}
      </div>
      {/* *****************search function************************** */}
      {/* *****************search function************************** */}
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">
          Product Management
        </h2>
        {/* **************add product modal********************************* */}
        <button
          onClick={() => {
            const modal = document.getElementById(
              "AddProductModal"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="flex text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between  "
        >
          <span>
            <IoAddCircleOutline className="w-6 h-7" />
          </span>
          <span>Add Product</span>
        </button>
        <dialog id="AddProductModal" className="modal  ">
          <div className="modal-box bg-[#1A4870]  ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* add car form */}
            <form onSubmit={handleAddProduct}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">Add New Product</h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="pr-12 text-white">Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    defaultValue={vendor.shopName}
                    readOnly
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Price:</label>
                  <input
                    type="number"
                    name="price"
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-1:</label>
                  <input
                    type="file"
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-2:</label>
                  <input
                    type="file"
                    name="image2"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-3:</label>
                  <input
                    type="file"
                    name="image3"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-4:</label>
                  <input
                    type="file"
                    name="image4"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-5:</label>
                  <input
                    type="file"
                    name="image5"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>

                <div>
                  <label className="pr-9 text-white">Category:</label>
                  <select
                    onChange={(e) => setSelectedCategory(e.target.value)} // Update state with the selected value
                    value={selectedCategory || ""} // Ensure the selected value reflects the state
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white "
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category: TCategory, index: number) => (
                      <option key={index} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-9 text-white">Product discount:</label>
                  <select
                    onChange={(e) => setSelectedDiscount(e.target.value)} // Update state with the selected value
                    value={selectedDiscount || ""} // Ensure the selected value reflects the state
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white "
                  >
                    <option value="" disabled selected>
                      Select Discount status
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {selectedDiscount === "Yes" ? (
                  <div>
                    <label className="pr-12 text-white">Discount Price:</label>
                    <input
                      type="number"
                      name="discountPrice"
                      min={1}
                      placeholder="Enter Product name"
                      className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="pr-12 text-white">Discount Price:</label>
                    <input
                      type="number"
                      name="discountPrice"
                      min={0}
                      defaultValue={0}
                      readOnly
                      placeholder="Enter Product name"
                      className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="pr-9 text-white">IsFlash Sale:</label>
                  <select
                    onChange={(e) => setSelectedIsFlashSale(e.target.value)} // Update state with the selected value
                    value={selectedIsFlashSale || ""} // Ensure the selected value reflects the state
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white "
                  >
                    <option value="" disabled>
                      Select Flash sale
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-8  text-white">Description:</label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered w-full max-w-sm bg-[#1A4870] text-white"
                    placeholder="Bio"
                  ></textarea>
                </div>
                <div className="flex justify-center my-5  ">
                  <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                    Save
                  </button>
                </div>
              </div>
            </form>
            {/* add car form */}
          </div>
        </dialog>

        {/* **************add product modal********************************* */}
        {/* **************edit product modal********************************* */}
        {/* edit modal */}
        <dialog id="editProductModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleEditFormSubmit}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">
                  {selectedproductId ? "Edit Product" : "Add New Product"}
                </h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                {selectedproductId && (
                  <div className="text-white text-center mb-4">
                    <p>product ID: {selectedproductId}</p>
                  </div>
                )}
                <div>
                  <label className="pr-12 text-white">Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    defaultValue={vendor.shopName}
                    readOnly
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    defaultValue={selectedProduct?.name}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Price:</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedProduct?.price}
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={selectedProduct?.quantity}
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-3 text-white">Main Image-1:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.mimage}
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-2:</label>
                  <input
                    type="file"
                    name="image2"
                    defaultValue={selectedProduct?.image2}
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-3:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image3}
                    name="image3"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-4:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image4}
                    name="image4"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-5:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image5}
                    name="image5"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-9 text-white">Category:</label>
                  <select
                    onChange={handleSelectChangeCategory}
                    value={selectedCategory || selectedProduct?.category || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category: TCategory, index: number) => (
                      <option key={index} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-9 text-white"> Discount:</label>
                  <select
                    onChange={handleSelectChangeDiscount}
                    value={selectedDiscount || selectedProduct?.discount || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Discount status
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="pr-9 text-white"> Discount Price:</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={selectedProduct?.discountPrice || 0}
                    min={0}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-9 text-white">IsFlash Sale:</label>
                  <select
                    onChange={handleSelectChangeIsFlashSale}
                    value={
                      selectedIsFlashSale || selectedProduct?.isFlashSale || ""
                    }
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Flash sale
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-8  text-white">Description:</label>
                  <textarea
                    name="description"
                    defaultValue={selectedProduct?.description}
                    className="textarea textarea-bordered w-full max-w-sm bg-[#1A4870] text-white"
                    placeholder="Bio"
                  ></textarea>
                </div>
                <div className="flex justify-center my-5  ">
                  <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
        {/* edit modal */}
        {/* **************edit product modal********************************* */}
        {/* **************duplicate product modal********************************* */}
        {/* duplicate modal */}
        <dialog id="duplicateProductModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleDuplicateFormSubmit}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">
                  {selectedproductId ? "Edit Product" : "Add New Product"}
                </h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                {selectedproductId && (
                  <div className="text-white text-center mb-4">
                    <p>product ID: {selectedproductId}</p>
                  </div>
                )}
                <div>
                  <label className="pr-12 text-white">Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    defaultValue={vendor.shopName}
                    readOnly
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    defaultValue={selectedProduct?.name}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Price:</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedProduct?.price}
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={selectedProduct?.quantity}
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-3 text-white">Main Image-1:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.mimage}
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-2:</label>
                  <input
                    type="file"
                    name="image2"
                    defaultValue={selectedProduct?.image2}
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-3:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image3}
                    name="image3"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-4:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image4}
                    name="image4"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-5:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image5}
                    name="image5"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-9 text-white">Category:</label>
                  <select
                    onChange={handleSelectChangeCategory}
                    value={selectedCategory || selectedProduct?.category || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category: TCategory, index: number) => (
                      <option key={index} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-9 text-white"> Discount:</label>
                  <select
                    onChange={handleSelectChangeDiscount}
                    value={selectedDiscount || selectedProduct?.discount || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Discount status
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="pr-9 text-white"> Discount Price:</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={selectedProduct?.discountPrice || 0}
                    min={0}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-9 text-white">IsFlash Sale:</label>
                  <select
                    onChange={handleSelectChangeIsFlashSale}
                    value={
                      selectedIsFlashSale || selectedProduct?.isFlashSale || ""
                    }
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Flash sale
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-8  text-white">Description:</label>
                  <textarea
                    name="description"
                    defaultValue={selectedProduct?.description}
                    className="textarea textarea-bordered w-full max-w-sm bg-[#1A4870] text-white"
                    placeholder="Bio"
                  ></textarea>
                </div>
                <div className="flex justify-center my-5  ">
                  <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                    Duplicate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
        {/* duplicate modal */}
        {/* **************duplicate product modal********************************* */}
      </div>
      {/* table view */}
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full ">
          {/* head */}
          <thead className="text-black text-lg">
            <tr>
              <th>Name</th>
              <th>category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>disPr</th>
              <th>FlashS</th>

              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {displayedProducts.length === 0 ? (
              <div>sorry</div>
            ) : (
              displayedProducts.map((product: TProduct, index: number) => (
                <>
                  <tr key={index} className="hover:bg-gray-300">
                    <td>
                      <div className="flex items-center gap-3 ">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product.mimage}
                              alt="Avatar Tailwind CSS Component"
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{product.category}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">${product.price}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{product.quantity}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">
                          ${product.discountPrice || 0}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">
                          {product.isFlashSale}
                        </div>
                      </div>
                    </td>
                    <th>
                      <div className="space-x-0">
                        <button
                          onClick={() => handleEditProduct(product.productId)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <FaEdit className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() => handleCopyProduct(product.productId)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <FaCopy className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteProducts(product.productId)
                          }
                          className="btn btn-ghost btn-sm"
                        >
                          <MdDeleteForever className="w-6 h-6 text-red-700 " />
                        </button>
                      </div>
                    </th>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
        {displayedProducts.length === 0 && (
          <div className="w-full text-center">
            <p className="text-green-500 text-2xl font-semibold ">
              Sorry, No Product found!! Please Add some product to your Shop
            </p>
          </div>
        )}
      </div>
      {/* table view */}

      {/* Pagination */}
      <div className="container mx-auto w-full flex   justify-center  my-10">
        {/* Pagination */}
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={true}
          pageSizeOptions={["1", "2", "3", "5", "10", "20"]}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
