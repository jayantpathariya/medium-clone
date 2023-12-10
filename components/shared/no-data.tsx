type NoDataProps = {
  message: string;
};

export const NoData = ({ message }: NoDataProps) => {
  return (
    <div className="mt-4 w-full rounded-full bg-grey/50 p-4 text-center">
      <p>{message}</p>
    </div>
  );
};
