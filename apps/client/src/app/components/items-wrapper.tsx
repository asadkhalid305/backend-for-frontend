import type { Country, Player, PlayerCareer } from "@repo/types";
import type { Dispatch, SetStateAction } from "react";
import LoadingSkeleton from "./loading-skeleton";
import ListItems from "./list-items";

type ItemType = Player | Country | PlayerCareer;

interface ItemsWrapperProps<T extends ItemType> {
  heading: string;
  items: T[];
  loading: boolean;
  selectedItem: ItemType;
  setSelectedItem: Dispatch<SetStateAction<T>>;
}

export default function ItemsWrapper<T extends ItemType>({
  heading,
  loading,
  items,
  selectedItem,
  setSelectedItem,
}: ItemsWrapperProps<T>): JSX.Element {
  return (
    <>
      <h2 className="text-xl font-bold text-center capitalize">{heading}</h2>
      <div className="h-[calc(100%-28px)] overflow-auto mt-6 px-4 scroll-smooth">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <ListItems
            handleClick={setSelectedItem}
            items={items}
            selectedItem={selectedItem}
          />
        )}
      </div>
    </>
  );
}
