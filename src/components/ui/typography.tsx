type Variant = "h1-bold" | "h1-semibold" | "h2" | "h3" | "p";

const Typhography = ({
  className,
  children,
  variant,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  variant: Variant;
}) => {
  switch (variant) {
    case "h1-bold":
      return (
        <h1
          className={`text-[36px] font-bold leading-[140%] -tracking-[1] ${className}`}
          {...props}
        >
          {children}
        </h1>
      );
    case "h1-semibold":
      return (
        <h1
          className={`text-[36px] font-semibold leading-[140%] -tracking-[1] ${className}`}
          {...props}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`text-[30px] font-semibold leading-[140%] -tracking-[1] ${className}`}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`text-[24px] font-semibold leading-[140%] -tracking-[1] ${className}`}
          {...props}
        >
          {children}
        </h3>
      );
    case "p":
      return (
        <p className={`${className}`} {...props}>
          {children}
        </p>
      );
    default:
      return (
        <p className={`${className}`} {...props}>
          {children}
        </p>
      );
  }
};

export default Typhography;
