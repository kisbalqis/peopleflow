import logo from "@/assets/logos/logo.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="PeopleFlow logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={logo}
        fill
        className="hidden dark:block"
        alt="PeopleFlow logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
