import { useGetAllLoginActivitiesQuery } from "../../../Redux/features/produtcs/orderApi";

const ReviewActivities = () => {
  const {
    data: LoginData,
    isError,
    isLoading,
  } = useGetAllLoginActivitiesQuery(undefined);

  const logins = LoginData?.data || [];

  if (isLoading)
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">
          Monitor Transaction
        </h2>
      </div>
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full">
          <thead className="text-black text-lg">
            <tr>
              <th>Email</th>
              <th>LoginAt</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {logins.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center">
                  No categories found
                </td>
              </tr>
            ) : (
              logins.map((login: any) => (
                <tr key={login.loginActivityId} className="hover:bg-gray-300">
                  <td>
                    <div className="font-semibold">{login.email}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{login.loginAt}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{login.device}</div>
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

export default ReviewActivities;
