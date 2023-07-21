import Link from "next/link";

export default function Home() {
  return (
    <section className="container">
      <div>
        <Link href="/login">Login</Link>
      </div>
      <div>
        <Link href="/register">Register</Link>
      </div>
    </section>
  )
}
