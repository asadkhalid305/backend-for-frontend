import debounce from "lodash/debounce";
import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";

interface InputSearchProps {
  placeholder: string;
  setSearchValue?: Dispatch<SetStateAction<string>>;
}

export default function InputSearch({
  setSearchValue,
  placeholder,
}: InputSearchProps): JSX.Element {
  const inputHandler = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (setSearchValue) {
          setSearchValue(e.target.value);
        }
      }, 300),
    [setSearchValue]
  );

  return (
    <form className="w-full">
      <div className="flex">
        <div className="relative w-full">
          <input
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:outline-none"
            onChange={inputHandler}
            placeholder={placeholder}
            required
            type="search"
          />
          <button
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            type="submit"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
