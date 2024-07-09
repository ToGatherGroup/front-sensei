import dayjs from "dayjs";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-screen mt-auto p-2 box-border flex flex-col sm:flex-row sm:py-4 sm:gap-2 justify-center items-center">
      <p className="font-bold text-center text-winePatternDark">
        Desenvolvido por{" "}
        <Link href="/creditos">
          <span className="underline">Togather Group</span>
        </Link>
      </p>

      <p className="font-bold text-winePatternDark">
        &copy; {dayjs().format("YYYY")} Todos os direitos reservados.
      </p>
    </footer>
  );
}
