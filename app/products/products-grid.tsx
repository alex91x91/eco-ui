"use client";

import { useEffect } from "react";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { Grid2 } from "@mui/material";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });

      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);
  return (
    <Grid2 container spacing={2} sx={{ height: "85vh", overflow: "scroll" }}>
      {products.map((product) => (
        <Grid2 key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Product product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
