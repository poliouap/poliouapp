import { redirect } from "next/navigation";

export default function Home() {
  // Redireciona o usuário da página inicial ("/") para o painel ("/dashboard").
  // O route-guard middleware já cuidará de interceptar essa rota e 
  // mandar para o "/login" caso ele não tenha os cookies de sessão!
  redirect("/dashboard");
}
