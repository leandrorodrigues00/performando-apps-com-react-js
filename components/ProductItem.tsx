import { memo, useState } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
import dynamic from "next/dynamic";
import lodash from "lodash";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => <span>Carregando</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishList: (id: Number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddToWishList, setIsAddToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddToWishList && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
