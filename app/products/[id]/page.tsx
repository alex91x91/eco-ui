import { Grid2, Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: {
    id: string;
  };
}
export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(+params.id);
  return (
    <Grid2 container marginBottom={"2rem"} rowGap={3}>
      {product.imageExists && (
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Image
            src={getProductImage(product.id)}
            width={0}
            height={0}
            className="w-full sm:w-3/4 h-auto"
            sizes="100vw"
            alt="Picture of the product"
          />
        </Grid2>
      )}
      <Grid2 size={{ md: 6, xs: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">${product.price}</Typography>
          <Checkout productId={product.id} />
        </Stack>
      </Grid2>
    </Grid2>
  );
}
