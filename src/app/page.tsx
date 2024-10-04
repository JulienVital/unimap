import Image from "next/image";
import mysvg from "./image.svg";
export default function Home() {
  return (
    <>
      <main >
        <Image
          src={mysvg}
          alt="Plan"
        />
      </main>
      <footer >
      </footer>
    </>
  );
}
