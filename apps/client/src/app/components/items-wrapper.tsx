import LoadingSkeleton from "./loading-skeleton";

interface ItemsWrapperProps {
  heading: string;
  loading: boolean;
  children: JSX.Element;
}

export default function ItemsWrapper({
  heading,
  loading,
  children,
}: ItemsWrapperProps): JSX.Element {
  return (
    <>
      <h2 className="text-xl font-bold text-center capitalize py-4 bg-gray-100">
        {heading}
      </h2>
      <div className="h-[calc(100%-60px)] py-2 overflow-auto scroll-smooth">
        {loading ? <LoadingSkeleton /> : children}
      </div>
    </>
  );
}
