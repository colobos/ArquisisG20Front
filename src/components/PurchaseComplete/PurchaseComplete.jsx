import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { handleFetch } from "../../api/fetchHandler";


function PurchaseCompleted() {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["completed-purchase"],
    queryFn: () =>
      commitTransaction({ token: searchParams.get("token_ws") || "" }),
  });

  if (isLoading) {
    return (
      <div className="p-20">
        <h1>Loading...</h1>
      </div>
    );
  }

  async function commitTransaction(token) {
    return handleFetch({
      route: '/transaction/commit',
      method: 'POST',
      body: {
        ws_token: token,
      },
    });
  }

  console.log(data);

  return (
    <div>
      <h1></h1>
      <p>{data.message}</p>
      <Link to="/">
        Volver a inicio
      </Link>
    </div>
  );
}

export default PurchaseCompleted;
