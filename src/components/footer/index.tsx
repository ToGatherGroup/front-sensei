import dayjs from "dayjs";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-w-screen mt-auto p-2 box-border flex flex-col sm:flex-row sm:py-4 sm:gap-2 justify-center items-center bg-winePattern">
      <p className="font-bold text-center text-white">
        Desenvolvido por{" "}
        <Link href="/creditos">
          <span className="underline">Togather Group</span>
        </Link>
      </p>

      <p className="font-bold text-white">
        &copy; {dayjs().format("YYYY")} Todos os direitos reservados.
      </p>
    </footer>
  );
}
