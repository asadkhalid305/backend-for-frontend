import type { Country, Player } from "@repo/types";
import type { Dispatch, SetStateAction } from "react";

type ItemType = Country | Player;

interface ListItemsProps<T extends ItemType> {
  handleClick: Dispatch<SetStateAction<T>>;
  items: T[];
  selectedItem?: ItemType;
  message: {
    required?: string;
    empty?: string;
  };
}

export default function ListItems<T extends ItemType>({
  handleClick,
  items,
  selectedItem,
  message,
}: ListItemsProps<T>): JSX.Element {
  let content;
  if (items.length > 0) {
    content = items.map((item) => (
      <li key={item.id}>
        <button
          className="text-left w-full p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
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
    content = (
      <li className="text-center">
        {selectedItem?.id ? message.empty : message.required}
      </li>
    );
  }

  return <ul>{content}</ul>;
}
