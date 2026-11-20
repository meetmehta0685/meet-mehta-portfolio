import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-head">
      <h1 className="page-title">Page not found</h1>
      <p className="page-desc">
        That page doesn&apos;t exist. <Link href="/">see the work instead.</Link>
      </p>
    </header>
  );
}
