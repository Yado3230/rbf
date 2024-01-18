import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center w-28">
        <Image src="/images/coop-logo.png" width={80} height={40} alt="img" />
      </Link>
    </div>
  );
};

export default Logo;
