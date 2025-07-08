const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden items-center justify-center p-12 md:flex">
      <div className="max-w-md text-center">
        {/* Grid pattern */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, index) => {
            return (
              <div
                key={index}
                className={`aspect-square rounded-2xl bg-gray-700/30 ${index % 2 === 0 ? "animate-pulse" : ""}`}
              />
            );
          })}
        </div>
        <h2 className="mb-4 text-2xl font-bold text-black">{title}</h2>
        <p className="text-gray-700">{subtitle}</p>
      </div>
    </div>
  );
};
export default AuthImagePattern;
