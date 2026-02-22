import { getUser } from "@/lib/auth/session";

export default async function Home() {
  const user = await getUser();
  return <p>Ola: {user ? user.name : "Não encontrado"}</p>;
}
