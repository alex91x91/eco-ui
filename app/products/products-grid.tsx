"use client";

import { useEffect } from "react";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { Grid2 } from "@mui/material";
import { io } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    const socket = io(API_URL!);

    socket.on("productUpdated", () => {
      revalidateProducts();
    });

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
