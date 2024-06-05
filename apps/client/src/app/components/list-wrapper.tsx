import type { Dispatch, SetStateAction } from "react";
import LoadingSkeleton from "./loading-skeleton";
import InputSearch from "./search-input";

interface ListWrapperProps {
  heading: string;
  loading: boolean;
  resource?: string;
  setSearchValue?: Dispatch<SetStateAction<string>>;
  children: JSX.Element;
}

export default function ListWrapper({
  heading,
  loading,
  resource,
  setSearchValue,
  children,
}: ListWrapperProps): JSX.Element {
  return (
    <>
      <h2 className="text-xl font-bold text-center capitalize py-4 bg-gray-100">
        {heading}
      </h2>
      {Boolean(resource) && (
        <InputSearch
          placeholder={resource ? `Search ${resource}...` : ""}
          setSearchValue={setSearchValue}
        />
      )}
      <div
        className="py-2 overflow-auto scroll-smooth"
        style={{
          height: `calc(100% - ${resource ? "102px" : "60px"})`,
        }}
      >
        {loading ? <LoadingSkeleton /> : children}
      </div>
    </>
  );
}
