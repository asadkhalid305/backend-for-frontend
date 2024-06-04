import type { Country, Player } from "@repo/types";
import type { Dispatch, SetStateAction } from "react";

type ItemType = Country | Player;

interface ListItemsProps<T extends ItemType> {
  handleClick: Dispatch<SetStateAction<T>>;
  items: T[];
  selectedItem?: ItemType; // Add the missing 'selectedItem' property
}

export default function ListItems<T extends ItemType>({
  handleClick,
  items,
  selectedItem,
}: ListItemsProps<T>): JSX.Element {
  let content;
  if (items.length > 0) {
    content = items.map((item) => (
      <li key={item.id}>
        <button
          onClick={() => {
            handleClick(item);
          }}
          type="button"
        >
          {"name" in item ? item.name : item.fullname}
        </button>
      </li>
    ));
  } else {
    content = <li>{selectedItem?.id ? "No item found" : "Select an item"}</li>;
  }

  return <ul>{content}</ul>;
}
