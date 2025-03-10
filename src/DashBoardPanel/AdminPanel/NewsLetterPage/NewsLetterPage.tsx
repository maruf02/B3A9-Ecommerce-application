import { useGetAllEmailQuery } from "../../../Redux/features/vendor/vendorApi";

type TEmail = {
  emailId: string;
  email: string;
};

const NewsLetterPage = () => {
  const { data: categoryData } = useGetAllEmailQuery(undefined);
  const categories = categoryData?.data || [];
  return (
    <div className="container mx-auto">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">
          NewsLetter Email List
        </h2>
      </div>
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full">
          <thead className="text-black text-lg">
            <tr>
              <th>Email List</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center">
                  <p className="text-green-500 text-2xl font-semibold ">
                    Sorry, No Email found!!
                  </p>
                </td>
              </tr>
            ) : (
              categories.map((category: TEmail) => (
                <tr key={category.emailId} className="hover:bg-gray-300">
                  <td>
                    <div className="font-semibold">{category.email}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsLetterPage;
