import Image from "next/image";
import type { CatalogItem } from "@/features/catalog/types/catalog.types";
import styles from "./ItemImage.module.css";

interface ItemImageProps {
  item: CatalogItem;
}

export function ItemImage({ item }: ItemImageProps) {
  const highResImage = item.image.replace("w=400&h=300", "w=1200&h=800");

  return (
    <div className={styles.container}>
      <Image
        src={highResImage}
        alt={item.title}
        fill
        className={styles.image}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
        quality={75}
      />
    </div>
  );
}
